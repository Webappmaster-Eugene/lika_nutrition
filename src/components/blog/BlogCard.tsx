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
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow block"
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
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-3 text-gray-900 hover:text-primary-600 transition-colors">
          {post.title}
        </h2>
        {post.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
        )}
        <div className="flex items-center gap-4 text-sm text-gray-500">
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
