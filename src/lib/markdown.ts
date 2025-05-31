import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeShiki from '@shikijs/rehype';
import rehypeStringify from 'rehype-stringify';

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    excerpt?: string;
    tags?: string[];
    author?: string;
    content: string;
    readingTime?: number;
}

const postsDirectory = path.join(process.cwd(), 'content/blog');

export function getAllPostSlugs(): string[] {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
        .filter((name) => name.endsWith('.md'))
        .map((name) => name.replace(/\.md$/, ''));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
        const fullPath = path.join(postsDirectory, `${slug}.md`);

        if (!fs.existsSync(fullPath)) {
            return null;
        }

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        // Process markdown to HTML with GitHub Flavored Markdown support and Shiki syntax highlighting
        const processedContent = await remark()
            .use(remarkGfm)
            .use(remarkRehype)
            .use(rehypeShiki, {
                themes: {
                    light: 'github-light',
                    dark: 'github-dark'
                }
            })
            .use(rehypeStringify)
            .process(content);

        // Calculate reading time (rough estimate: 200 words per minute)
        const wordCount = content.split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200);

        return {
            slug,
            title: data.title || slug,
            date: data.date || new Date().toISOString(),
            excerpt: data.excerpt || '',
            tags: data.tags || [],
            author: data.author || '',
            content: processedContent.toString(),
            readingTime,
        };
    } catch (error) {
        console.error(`Error processing post ${slug}:`, error);
        return null;
    }
}

export async function getAllPosts(): Promise<BlogPost[]> {
    const slugs = getAllPostSlugs();
    const posts = await Promise.all(
        slugs.map((slug) => getPostBySlug(slug))
    );

    return posts
        .filter((post): post is BlogPost => post !== null)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostsByTag(tag: string): Promise<BlogPost[]> {
    return getAllPosts().then((posts) =>
        posts.filter((post) => post.tags?.includes(tag))
    );
} 