"use client";

import { formatDistanceToNow } from 'date-fns';
import { type BlogPost } from '@/lib/markdown';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

interface BlogPostClientProps {
    post: BlogPost;
}

interface Heading {
    id: string;
    text: string;
    level: number;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
    const [headings, setHeadings] = useState<Heading[]>([]);
    const [activeHeading, setActiveHeading] = useState<string>('');
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Generate a clean, consistent ID from text
    const generateId = (text: string, index: number): string => {
        const cleanText = text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '') // Remove special characters except word chars, spaces, and hyphens
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
            .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens

        return `heading-${cleanText}-${index}`;
    };

    // Extract headings from the rendered content
    useEffect(() => {
        const extractHeadings = () => {
            if (!contentRef.current) {
                console.log('Content ref not ready, retrying...');
                setTimeout(extractHeadings, 200);
                return;
            }

            const headingElements = contentRef.current.querySelectorAll('h1, h2, h3, h4, h5, h6');
            console.log('Found heading elements:', headingElements.length);

            if (headingElements.length === 0) {
                console.log('No headings found, retrying...');
                setTimeout(extractHeadings, 300);
                return;
            }

            const extractedHeadings: Heading[] = Array.from(headingElements).map((heading, index) => {
                const level = parseInt(heading.tagName.charAt(1));
                const text = heading.textContent?.trim() || '';
                const id = generateId(text, index);

                // Ensure the heading has this ID
                heading.id = id;

                console.log(`Heading ${index}: "${text}" -> ID: "${id}"`);

                return { id, text, level };
            });

            setHeadings(extractedHeadings);
            console.log('Successfully extracted headings:', extractedHeadings);
        };

        // Wait for content to be rendered before extracting headings
        const timer = setTimeout(extractHeadings, 500);
        return () => clearTimeout(timer);
    }, [post.content]);

    // Track active heading while scrolling
    useEffect(() => {
        if (headings.length === 0) return;

        const scrollContainer = scrollContainerRef.current;
        if (!scrollContainer) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveHeading(entry.target.id);
                    }
                });
            },
            {
                root: scrollContainer,
                rootMargin: '-100px 0px -60% 0px',
                threshold: 0.1
            }
        );

        // Observe all headings with retry mechanism
        const observeHeadings = () => {
            headings.forEach(({ id }) => {
                const element = document.getElementById(id);
                if (element) {
                    observer.observe(element);
                    console.log(`Observing heading: ${id}`);
                } else {
                    console.warn(`Cannot observe element with ID ${id} - element not found`);
                }
            });
        };

        // Retry observing after a short delay to ensure elements exist
        setTimeout(observeHeadings, 100);

        return () => observer.disconnect();
    }, [headings]);

    const scrollToHeading = (id: string) => {
        console.log(`Attempting to scroll to: ${id}`);

        const element = document.getElementById(id);
        const scrollContainer = scrollContainerRef.current;

        if (!element) {
            console.error(`Element with ID ${id} not found`);
            // Try to find the element by its text content as fallback
            const heading = headings.find(h => h.id === id);
            if (heading) {
                const fallbackElement = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
                    .find(el => el.textContent?.trim() === heading.text);
                if (fallbackElement) {
                    console.log('Found heading by text content, updating ID');
                    fallbackElement.id = id;
                    scrollToHeading(id);
                    return;
                }
            }
            return;
        }

        if (!scrollContainer) {
            console.error('Scroll container not found');
            return;
        }

        try {
            // Get the element's position relative to the scroll container
            const containerRect = scrollContainer.getBoundingClientRect();
            const elementRect = element.getBoundingClientRect();
            const scrollTop = scrollContainer.scrollTop;

            // Calculate the scroll position
            const targetScrollTop = scrollTop + elementRect.top - containerRect.top - 100;

            console.log(`Scrolling to position: ${targetScrollTop}`);

            scrollContainer.scrollTo({
                top: Math.max(0, targetScrollTop),
                behavior: 'smooth'
            });

            // Update active heading
            setActiveHeading(id);
        } catch (error) {
            console.error('Error scrolling to heading:', error);
        }
    };

    return (
        <div className="min-h-screen bg-background relative">
            <div className="mx-auto max-w-[1400px] px-4 min-h-screen relative">
                <div className="grid grid-cols-5 gap-5 h-[calc(100vh-3rem)]">
                    {/* Main content column (80%) */}
                    <div
                        ref={scrollContainerRef}
                        className="pt-4 col-span-4 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                    >
                        <div className="border border-black bg-white dark:bg-gray-800">
                            <div className="max-w-4xl mx-auto px-4 py-8">
                                {/* Article Header */}
                                <header className="mb-12">
                                    <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
                                        {post.title}
                                    </h1>

                                    <div className="flex items-center text-gray-500 dark:text-gray-400 mb-6 space-x-4">
                                        <time dateTime={post.date}>
                                            {formatDistanceToNow(new Date(post.date), { addSuffix: true })}
                                        </time>
                                        {post.readingTime && (
                                            <span>{post.readingTime} min read</span>
                                        )}
                                    </div>

                                    {post.tags && post.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2">
                                            {post.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </header>

                                {/* Article Content */}
                                <article className="prose prose-lg max-w-none dark:prose-invert">
                                    <div
                                        ref={contentRef}
                                        dangerouslySetInnerHTML={{ __html: post.content }}
                                        className="markdown-content"
                                    />
                                </article>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar column (20%) */}
                    <div className="pt-4 col-span-1">
                        <div className="sticky top-4">
                            <div className="min-h-[calc(100vh-2rem)] border border-black bg-white dark:bg-gray-800 flex flex-col justify-between">
                                <div>
                                    <div className="p-4">
                                        <Link href="/">
                                            <h2 className="text-3xl font-bold cursor-pointer hover:opacity-80 transition-opacity">Y</h2>
                                        </Link>
                                    </div>
                                    <div className="p-2 border-t border-black dark:border-white">
                                        {headings.length > 0 ? (
                                            <div className="space-y-1">
                                                {headings.map(({ id, text, level }) => (
                                                    <button
                                                        key={id}
                                                        className={`w-full text-left cursor-pointer text-xs flex items-center transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded hover:text-gray-600
                                                            }`}
                                                        style={{
                                                            paddingLeft: `${8 + (level - 1) * 8}px`,
                                                            fontSize: level === 1 ? '0.75rem' : '0.7rem'
                                                        }}
                                                        onClick={() => scrollToHeading(id)}
                                                        title={text}
                                                    >
                                                        <span className="truncate">{text}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="uppercase cursor-pointer flex items-center font-bold text-xs">
                                                <span className="inline-block w-2 h-2 bg-black dark:bg-white rounded-full mr-2"></span>
                                                reading
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-auto">
                                    <div className="grid grid-cols-5 border-t border-b border-black dark:border-white">
                                        <div className="p-2 col-span-2">
                                            <p className="capitalize">
                                                resume
                                            </p>
                                        </div>
                                        <div className="col-span-3 border-l border-black dark:border-white p-2">
                                            <p className="cursor-pointer capitalize underline" onClick={() => window.open('https://drive.google.com/file/d/10q2T8kgIAC5397SIIBOhuMIdSu4etpT1/view?usp=drive_link', '_blank')}>
                                                download
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-5">
                                        <div className="p-2 col-span-2">
                                            <p className="capitalize">
                                                presence
                                            </p>
                                        </div>
                                        <div className="col-span-3 border-l border-black dark:border-white p-2">
                                            <p className="capitalize underline cursor-pointer" onClick={() => window.open('https://linkedin.com', '_blank')}>
                                                LinkedIn
                                            </p>
                                            <p className="capitalize underline cursor-pointer" onClick={() => window.open('https://github.com', '_blank')}>
                                                github
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 