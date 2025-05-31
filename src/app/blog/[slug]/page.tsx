import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPostSlugs } from '@/lib/markdown';
import BlogPostClient from '@/components/BlogPostClient';

interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const slugs = getAllPostSlugs();
    return slugs.map((slug) => ({
        slug,
    }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return <BlogPostClient post={post} />;
} 