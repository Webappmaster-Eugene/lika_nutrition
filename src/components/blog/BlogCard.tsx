import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Tag } from 'lucide-react'
import { BlogPost } from '@/types/blog'

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="bg-white rounded-2xl border border-sage-200/50 shadow-sm overflow-hidden hover:shadow-lg transition-shadow block"
    >
      {post.image && (
        <div className="relative w-full h-48">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="p-5 xs:p-6">
        <h2 className="font-serif text-lg xs:text-xl font-bold mb-2 text-sage-900 leading-snug">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-sage-600 mb-4 text-sm xs:text-base line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-3 text-xs xs:text-sm text-sage-500">
          {post.date && (
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('ru-RU', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </time>
            </div>
          )}
          {post.tags.length > 0 && (
            <div className="flex items-center gap-1">
              <Tag size={14} />
              <span>{post.tags[0]}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
