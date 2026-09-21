#!/usr/bin/env node
import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync, mkdirSync, readdirSync, lstatSync, readlinkSync, symlinkSync, unlinkSync, realpathSync } from "node:fs";
import { dirname, resolve, relative, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import { homedir } from "node:os";

export const repo = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
export const workspace = existsSync(join(repo, "../CLAUDE.md")) ? dirname(repo) : repo;
const read = (path) => readFileSync(path, "utf8");
const hash = (value) => createHash("sha256").update(value).digest("hex");
const q = (value) => JSON.stringify(value);
const shellQuote = (value) => "'" + value.replaceAll("'", "'\\''") + "'";
const state = join(repo, ".codex/state");

function readPrivateJson(path) {
  try { return JSON.parse(read(path)); }
  catch { throw new Error(`Cannot read MCP configuration as JSON: ${path}`); }
}

export function run(command, args, cwd = repo, options = {}) {
  return spawnSync(command, args, { cwd, encoding: "utf8", ...options });
}

// npm ships with Node; the project has a package-lock.json and no pnpm workspace.
export function packageManager() {
  if (run("npm", ["--version"], repo).status === 0) return { command: "npm", prefix: [] };
  return null;
}

function write(path, value) {
  mkdirSync(dirname(path), { recursive: true });
  if (!existsSync(path) || read(path) !== value) writeFileSync(path, value);
}

function link(path, target) {
  if (existsSync(path) || (() => { try { return lstatSync(path).isSymbolicLink(); } catch { return false; } })()) {
    if (!lstatSync(path).isSymbolicLink() || readlinkSync(path) !== target) throw new Error(`Refusing to replace existing path: ${path}`);
    return;
  }
  mkdirSync(dirname(path), { recursive: true });
  symlinkSync(target, path);
}

export function sources() {
  const paths = [".claude/settings.json", ".claude/settings.local.json"];
  const walk = (dir) => {
    if (!existsSync(join(repo, dir))) return;
    for (const entry of readdirSync(join(repo, dir), { withFileTypes: true })) {
      const path = `${dir}/${entry.name}`;
      if (entry.isDirectory()) walk(path);
      else paths.push(path);
    }
  };
  walk("scripts/codex");
  walk(".claude/skills");
  if (workspace !== repo) {
    paths.push("../CLAUDE.md", "../.claude/settings.json", "../.claude/settings.local.json");
    walk("../expert_info/lika");
  }
  return Object.fromEntries(paths.filter(p => existsSync(join(repo, p))).sort().map(p => [p, hash(read(join(repo, p)))]));
}

export function projectSkills() {
  return [...new Set([...readdirSync(join(repo, ".claude/skills")), "frontend-design", "project-harness"])].sort();
}

export function configuredServers() {
  const result = {};
  const claudeConfig = join(homedir(), ".claude.json");
  if (existsSync(claudeConfig)) {
    const webstorm = readPrivateJson(claudeConfig).mcpServers?.webstorm;
    if (webstorm) result.webstorm = { ...webstorm, source: claudeConfig };
  }
  for (const path of new Set([join(workspace, ".mcp.json"), join(repo, ".mcp.json"), join(repo, ".codex/mcp.local.json")])) {
    if (!existsSync(path)) continue;
    for (const [name, definition] of Object.entries(readPrivateJson(path).mcpServers ?? {})) {
      result[name] = { ...definition, source: path };
    }
  }
  return result;
}

export function configText() {
  let config = read(join(repo, "scripts/codex/config.template.toml"));
  config += `\n[permissions.lika.workspace_roots]\n${q(workspace)} = true\n`;
  // npm/npx keep their caches inside the authorized workspace.
  config += `\n[shell_environment_policy.set]\nnpm_config_cache = ${q(join(state, "npm-cache"))}\n`;
  for (const [name, server] of Object.entries(configuredServers())) {
    config += `\n[mcp_servers.${q(name)}]\nenabled = true\nstartup_timeout_sec = 60\ntool_timeout_sec = 120\ndefault_tools_approval_mode = "approve"\n`;
    if (server.type === "http" || server.type === "sse" || server.url) {
      config += `url = ${q(server.url)}\n`;
      if (server.headers && Object.keys(server.headers).length) {
        config += `http_headers_helper = ${q([process.execPath, join(repo, "scripts/codex/mcp.mjs"), "headers", name].map(shellQuote).join(" "))}\n`;
      }
    } else {
      config += `command = ${q(process.execPath)}\nargs = ${q([join(repo, "scripts/codex/mcp.mjs"), "serve", name])}\ncwd = ${q(repo)}\n`;
    }
  }
  // Native SessionStart also runs after compaction. One source per config layer.
  for (const event of ["SessionStart", "Stop"]) {
    config += `\n[[hooks.${event}]]\n[[hooks.${event}.hooks]]\ntype = "command"\ncommand = ${q([process.execPath, join(repo, "scripts/codex/hooks.mjs")].map(shellQuote).join(" "))}\ntimeout = 30\n`;
  }
  return config;
}

// Roles live as Claude subagent definitions; the committed copy is the fallback
// when the external expert_info directory is absent in a standalone checkout.
export function agentSpecs() {
  const agents = {};
  for (const dir of [join(repo, ".codex/context/lika/agents"), join(workspace, "expert_info/lika/agents")]) {
    if (!existsSync(dir)) continue;
    for (const file of readdirSync(dir).filter(name => name.endsWith(".md"))) {
      const text = read(join(dir, file));
      const front = text.match(/^---\n([\s\S]*?)\n---\s*/);
      if (!front) throw new Error(`Role definition without frontmatter: ${file}`);
      const field = (key) => front[1].match(new RegExp(`^${key}: (.+)$`, "m"))?.[1]?.trim();
      const name = field("name") ?? file.replace(/\.md$/, "");
      const description = field("description");
      if (!description) throw new Error(`Role definition without description: ${file}`);
      agents[name] = {
        description,
        tools: (field("tools") ?? "Read, Grep, Glob").split(",").map(tool => tool.trim()).filter(Boolean),
        prompt: text.slice(front[0].length),
      };
    }
  }
  if (!Object.keys(agents).length) throw new Error("No role definitions found in expert_info/lika/agents or .codex/context/lika/agents");
  return agents;
}

const adaptations = {
  "deploy-check": "Команды выполняй через npm из корня репозитория app: npm run smoke — это lint, typecheck и build. npm run codex:verify дополнительно проверяет сам harness. Сборка статическая (output: 'export'), секретов не требует, но NEXT_PUBLIC_SITE_URL влияет на sitemap, robots и canonical: при пустом значении применяется дефолт https://likanutrition.ru — отметь это явно. Docker build выполняй при изменениях Dockerfile/nginx.conf/docker-compose.yml и доступном daemon. Push в main запускает выкат Dokploy.",
  "prod-check": "SSH-доступ бери из существующего окружения пользователя; файл expert_info/ssh_access.txt может отсутствовать — тогда используй уже настроенный ключ и не проси пароль. Имя контейнера и compose-каталог находи динамически: в имени Dokploy есть меняющийся хеш. Не копируй пароли и содержимое .env в память, отчёты и новые файлы. Любое изменение прода — только с подтверждением пользователя.",
  "self-review": "Полные правила проекта — .codex/context/CLAUDE.md (копия ../CLAUDE.md). Проверки запускай как npm run lint, npm run typecheck, npm run build. Автотестов в проекте нет: изменённое поведение проверяй сборкой и ручным прогоном страницы, а не ссылкой на несуществующий тест. Не выдумывай улучшения ради числа: исправляй подтверждённые дефекты, остальное перечисли как наблюдения.",
};

export function sync() {
  const previousManifest = join(repo, ".codex/generated.json");
  const previous = existsSync(previousManifest) ? JSON.parse(read(previousManifest)) : {};
  const generated = [];
  const generate = (path, value) => { write(join(repo, path), value); generated.push(path); };
  if (workspace !== repo) {
    generate(".codex/context/CLAUDE.md", read(join(workspace, "CLAUDE.md")));
    for (const path of Object.keys(sources()).filter(p => p.startsWith("../expert_info/lika/") && p.endsWith(".md"))) {
      generate(join(".codex/context/lika", path.slice("../expert_info/lika/".length)), read(join(repo, path)));
    }
  }
  // A standalone checkout uses the committed context when external originals
  // are absent. Keep checking those copies after every sync as well.
  const collectContext = (dir) => {
    for (const entry of readdirSync(join(repo, dir), { withFileTypes: true })) {
      const path = `${dir}/${entry.name}`;
      if (entry.isDirectory()) collectContext(path);
      else if (!generated.includes(path)) generated.push(path);
    }
  };
  collectContext(".codex/context");
  for (const name of readdirSync(join(repo, ".claude/skills"))) {
    const original = read(join(repo, `.claude/skills/${name}/SKILL.md`));
    const description = original.match(/^description: (.+)$/m)?.[1];
    if (!description) throw new Error(`Missing skill description: ${name}`);
    generate(`.agents/skills/${name}/SKILL.md`, `---\nname: ${name}\ndescription: ${q(description.replaceAll("claude-in-chrome", "Chrome DevTools MCP"))}\n---\n\nПрочитай [оригинальный workflow](../../../.claude/skills/${name}/SKILL.md) целиком и выполни его с адаптацией ниже. Пути src/, public/ и команды npm/git относятся к корню репозитория app. $ARGUMENTS означает запрос пользователя, не shell-переменную.\n\n${adaptations[name] ?? "Соблюдай AGENTS.md и используй доступные инструменты Codex."}\n`);
  }
  for (const [name, spec] of Object.entries(agentSpecs())) {
    const readOnly = !spec.tools.includes("Bash");
    const instructions = `${spec.prompt}\n\nПроектные правила: AGENTS.md и .codex/context/CLAUDE.md. Команды выполнять из репозитория app через npm. ${readOnly ? "Только исследование: не редактируй файлы и не вызывай изменяющие MCP-инструменты." : "Запускай только согласованные проверки, не редактируй исходники."}`;
    generate(`.codex/agents/${name}.toml`, `name = ${q(name)}\ndescription = ${q(spec.description)}\ndeveloper_instructions = ${q(instructions)}\n${readOnly ? 'default_permissions = "lika-review"\n' : ""}`);
  }
  // Retire only files that this generator owns and that nobody edited locally.
  // Custom roles/skills and fallback context must remain untouched.
  const retired = Object.entries(previous).filter(([path]) => !generated.includes(path)
    && /^(?:\.codex\/agents\/[a-z][a-z0-9-]*\.toml|\.agents\/skills\/[a-z][a-z0-9-]*\/SKILL\.md)$/.test(path));
  for (const [path, digest] of retired) {
    const file = join(repo, path);
    if (!existsSync(file)) continue;
    const parent = relative(realpathSync(repo), realpathSync(dirname(file)));
    if (parent.startsWith("..") || lstatSync(file).isSymbolicLink() || hash(read(file)) !== digest) {
      throw new Error(`Retired generated file has local changes; preserve or relocate it before sync: ${path}`);
    }
  }
  for (const [path] of retired) if (existsSync(join(repo, path))) unlinkSync(join(repo, path));
  write(join(repo, ".codex/config.toml"), configText());
  if (workspace !== repo) {
    write(join(workspace, ".codex/config.toml"), configText());
    link(join(workspace, "AGENTS.md"), "app/AGENTS.md");
    link(join(workspace, ".agents/skills"), "../app/.agents/skills");
    link(join(workspace, ".codex/agents"), "../app/.codex/agents");
    link(join(workspace, ".codex/memory"), "../app/.codex/memory");
    link(join(workspace, ".codex/context"), "../app/.codex/context");
  }
  write(join(repo, ".codex/sources.json"), JSON.stringify(sources(), null, 2) + "\n");
  write(join(repo, ".codex/generated.json"), JSON.stringify(Object.fromEntries(generated.sort().map(path => [path, hash(read(join(repo, path)))])), null, 2) + "\n");
  console.log("Codex project configuration, skills, roles and context synchronized.");
}

export function doctor() {
  const failures = [];
  const check = (ok, label) => { if (!ok) failures.push(label); };
  const manifest = join(repo, ".codex/sources.json");
  check(existsSync(manifest) && read(manifest) === JSON.stringify(sources(), null, 2) + "\n", "Claude sources changed: run npm run codex:sync");
  const generated = join(repo, ".codex/generated.json");
  check(existsSync(generated), "Generated manifest missing: run npm run codex:sync");
  if (existsSync(generated)) for (const [path, digest] of Object.entries(JSON.parse(read(generated)))) check(existsSync(join(repo, path)) && hash(read(join(repo, path))) === digest, `Generated file drift: ${path}`);
  for (const root of new Set([repo, workspace])) check(existsSync(join(root, ".codex/config.toml")) && read(join(root, ".codex/config.toml")) === configText(), `Config drift: ${root}`);
  for (const name of projectSkills()) {
    const path = join(repo, `.agents/skills/${name}/SKILL.md`);
    check(existsSync(path), `Missing skill: ${name}`);
    if (!existsSync(path)) continue;
    for (const match of read(path).matchAll(/\]\(([^\s)#]+)(?:#[^\s)]*)?\)/g)) {
      if (/^[a-z][a-z\d+.-]*:/i.test(match[1])) continue;
      check(existsSync(resolve(dirname(path), match[1])), `Broken skill reference: ${name}: ${match[1]}`);
    }
  }
  if (workspace !== repo) {
    for (const [path, target] of Object.entries({ "AGENTS.md": "app/AGENTS.md", ".agents/skills": "../app/.agents/skills", ".codex/agents": "../app/.codex/agents", ".codex/memory": "../app/.codex/memory", ".codex/context": "../app/.codex/context" })) {
      const full = join(workspace, path);
      check(existsSync(full) && lstatSync(full).isSymbolicLink() && readlinkSync(full) === target, `Workspace link drift: ${path}`);
    }
  }
  for (const name of Object.keys(agentSpecs())) check(existsSync(join(repo, `.codex/agents/${name}.toml`)), `Missing agent: ${name}`);
  for (const path of ["AGENTS.md", ".codex/memory/MEMORY.md", ".codex/context/CLAUDE.md"]) check(existsSync(join(repo, path)), `Missing ${path}`);
  check(existsSync(join(repo, "node_modules")), "Install dependencies: npm install");
  check(packageManager() !== null, "npm is unavailable: install Node.js with npm");
  check(Number(process.versions.node.split(".")[0]) >= 20, "Node >= 20 required");
  return failures;
}

// The site is a single npm package; the static export is the only build artifact.
export function verificationPlan() {
  return [
    { cwd: ".", manager: "npm", script: "codex:test" },
    { cwd: ".", manager: "npm", script: "lint" },
    { cwd: ".", manager: "npm", script: "typecheck" },
    { cwd: ".", manager: "npm", script: "build" },
  ];
}

function verify() {
  const failures = doctor();
  if (failures.length) throw new Error(failures.join("\n"));
  const report = { timestamp: new Date().toISOString(), checks: [] };
  mkdirSync(state, { recursive: true });
  for (const { cwd, script } of verificationPlan()) {
    console.log(`Checking ${cwd}: npm run ${script}`);
    const result = run("npm", ["run", script], join(repo, cwd), { maxBuffer: 20 * 1024 * 1024 });
    const logfile = join(state, `${cwd === "." ? "app" : cwd}-${script.replaceAll(":", "-")}.log`);
    write(logfile, (result.stdout ?? "") + (result.stderr ?? ""));
    report.checks.push({ cwd, script, status: result.status, log: relative(repo, logfile) });
    write(join(state, "verification.json"), JSON.stringify(report, null, 2) + "\n");
    if (result.status !== 0) { console.error(`FAILED: ${relative(repo, logfile)}`); process.exitCode = 1; return; }
    console.log("PASS");
  }
}

function launch(args) {
  const failures = doctor();
  if (failures.length) throw new Error(failures.join("\n"));
  const result = run("codex", ["-C", workspace, ...args], workspace, { stdio: "inherit" });
  process.exitCode = result.status ?? 1;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const [command, ...args] = process.argv.slice(2);
    if (command === "sync") sync();
    else if (command === "doctor") {
      const failures = doctor();
      console.log(failures.length ? failures.join("\n") : `PASS: project context, ${projectSkills().length} skills, ${Object.keys(agentSpecs()).length} roles, hooks, dependencies and ${Object.keys(configuredServers()).length} MCP definitions`);
      process.exitCode = failures.length ? 1 : 0;
    } else if (command === "verify") verify();
    else if (command === "launch") launch(args);
    else throw new Error("Usage: harness.mjs sync|doctor|verify|launch [codex arguments]");
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
