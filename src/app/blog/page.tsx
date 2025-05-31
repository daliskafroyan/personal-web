import Link from 'next/link';
import { getAllPosts } from '@/lib/markdown';
import { formatDistanceToNow } from 'date-fns';

export default async function BlogPage() {
    const posts = await getAllPosts();

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
                <p className="text-lg text-gray-600">
                    Thoughts, tutorials, and insights about technology and development.
                </p>
            </div>

            {posts.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No blog posts yet.</p>
                    <p className="text-gray-400 mt-2">
                        Add your first markdown file to the <code className="bg-gray-100 px-2 py-1 rounded">content/blog</code> directory.
                    </p>
                </div>
            ) : (
                <div className="space-y-8">
                    {posts.map((post) => (
                        <article key={post.slug} className="border-b border-gray-200 pb-8 last:border-b-0">
                            <div className="mb-4">
                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
                                >
                                    {post.title}
                                </Link>
                            </div>

                            <div className="flex items-center text-sm text-gray-500 mb-4 space-x-4">
                                <time dateTime={post.date}>
                                    {formatDistanceToNow(new Date(post.date), { addSuffix: true })}
                                </time>
                                {post.readingTime && (
                                    <span>{post.readingTime} min read</span>
                                )}
                            </div>

                            {post.excerpt && (
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    {post.excerpt}
                                </p>
                            )}

                            {post.tags && post.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {post.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <Link
                                href={`/blog/${post.slug}`}
                                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                            >
                                Read more →
                            </Link>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
} 