"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { type BlogPost } from "@/lib/markdown";

interface HomeClientProps {
    blogPosts: BlogPost[];
}

const experiences = [
    {
        companyLogo: "/paper-id_logo.png",
        companyName: "Paper.id",
        duration: {
            start: "Aug 2024",
            end: "Present",
        },
        totalDuration: "1 year 5 months",
        description: "Paper.id is a SaaS fintech platform that helps businesses digitize and automate their financial operations, including invoicing, payment processing, and document management. The platform help enhance business workflows and financial processes through digital transformation.",
        responsibilities: [
            "Develop and maintain the core platform and its features",
            "Collaborate with cross-functional teams to implement new features and improve the platform",
            "Optimize the platform for performance and scalability",
        ],
    },
    {
        companyLogo: "/koinworks-logo.png",
        companyName: "KoinWorks",
        duration: {
            start: "Aug 2024",
            end: "Present",
        },
        totalDuration: "1 year 5 months",
        description: "KoinWorks is a leading Indonesian fintech company that provides peer-to-peer lending and investment platform. The platform connects investors with SMEs and individuals seeking financial solutions, offering various investment products and business financing options to drive financial inclusion in Indonesia",
        responsibilities: [
            "Develop and maintain the core platform and its features",
            "Collaborate with cross-functional teams to implement new features and improve the platform",
            "Optimize the platform for performance and scalability",
        ],
    },
    {
        companyLogo: "/freight-hub_logo.svg",
        companyName: "Freight-hub",
        duration: {
            start: "Aug 2024",
            end: "Present",
        },
        totalDuration: "1 year 5 months",
        description: "Freight-hub is a technology company revolutionizing the logistics industry through smart solutions. The platform provides comprehensive logistics management tools including ERP for logistics, transport management systems, and container relocation monitoring, empowering businesses with data-driven insights and AI-powered optimization.",
        responsibilities: [
            "Developed and maintained B2B platform for seamless order management and shipment monitoring",
            "Implemented AI-powered route optimization and load balancing algorithms",
            "Built real-time container tracking and monitoring systems",
            "Integrated GPS tracking and cashless operation features",
            "Collaborated on business intelligence tools for data-driven logistics insights"
        ],
    },
]

export default function HomeClient({ blogPosts }: HomeClientProps) {
    const [activeSection, setActiveSection] = useState('home');

    // Function to scroll to a section when clicked in the menu
    const scrollToSection = (section: string) => {
        const element = document.getElementById(section);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setActiveSection(section);
    };

    // Add useEffect to track scroll position and update active section
    useEffect(() => {
        const sectionIds = ['home', 'projects', 'experiences', 'posts'];

        // Create Intersection Observer to detect which section is most visible
        const observerOptions = {
            root: null, // viewport
            rootMargin: '0px',
            threshold: 0.6, // At least 60% of section must be visible
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Observe all sections
        sectionIds.forEach(id => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        // Cleanup observer on component unmount
        return () => {
            sectionIds.forEach(id => {
                const element = document.getElementById(id);
                if (element) observer.unobserve(element);
            });
        };
    }, []);

    return (
        <div className="min-h-screen bg-background relative">
            <div className="mx-auto max-w-[1400px] px-4 min-h-screen relative">
                <div className="grid grid-cols-5 gap-5 h-[calc(100vh-3rem)]">
                    {/* Main content column (80%) */}
                    <div className="pt-4 col-span-4 h-full flex flex-col gap-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        <div id="home" className="min-h-[calc(100vh-7rem)] flex flex-col justify-between border border-black bg-white dark:bg-gray-800">
                            <h1 className="mx-4 mt-4 text-4xl font-bold">Hi! I'm Royyan, <br /> a software developer passionate crafting high-performance solutions with engineering excellence.</h1>

                            <div className="border-t border-black dark:border-white flex flex-row">
                                <div className="flex flex-row w-1/2 justify-between p-2">
                                    <p className="uppercase">experience</p>
                                    <p>3.1421 Years</p>
                                </div>
                                <div className="flex flex-row p-2 gap-2 w-1/2 border-l border-black dark:border-white justify-between">
                                    <p className="uppercase">location</p>
                                    <p>Bekasi, Indonesia</p>
                                </div>
                            </div>


                        </div>

                        <div id="projects" className="p-4 flex flex-col justify-between border border-black bg-white dark:bg-gray-800">
                            <h2 className="text-[64px] uppercase">projects</h2>

                            <div className="border-t border-black dark:border-white flex flex-col mt-16">
                                {/* Project row header */}
                                <div className="grid grid-cols-6 border-b border-black dark:border-white p-2">
                                    <p className="text-muted-foreground uppercase font-medium col-span-2">Name</p>
                                    <p className="text-muted-foreground uppercase font-medium col-span-3">Client</p>
                                    <p className="text-muted-foreground uppercase font-medium col-span-1">Date</p>
                                </div>

                                {/* Project row example */}
                                <div
                                    className="grid grid-cols-6 border-b border-gray-200 dark:border-gray-700 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                                    onClick={() => window.open('https://taksi.puprckditki.dev/login', '_blank')}
                                >
                                    <p className="text-muted-foreground col-span-2">TAKSI</p>
                                    <p className="text-muted-foreground col-span-3">Ministry of Housing and Public Works Indonesia</p>
                                    <p className="text-muted-foreground col-span-1">2024</p>
                                </div>

                                <div
                                    className="grid grid-cols-6 border-b border-gray-200 dark:border-gray-700 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                                    onClick={() => window.open('https://lead.jakartamrt.co.id/login', '_blank')}
                                >
                                    <p className="text-muted-foreground col-span-2">Learning and Development Dashboard</p>
                                    <p className="text-muted-foreground col-span-3">Jakarta MRT</p>
                                    <p className="text-muted-foreground col-span-1">2023</p>
                                </div>

                                <div
                                    className="grid grid-cols-6 border-b border-gray-200 dark:border-gray-700 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                                    onClick={() => window.open('https://bisnis.jakartamrt.co.id/', '_blank')}
                                >
                                    <p className="text-muted-foreground col-span-2">Business Platform of Jakarta MRT</p>
                                    <p className="text-muted-foreground col-span-3">Jakarta MRT</p>
                                    <p className="text-muted-foreground col-span-1">2023</p>
                                </div>
                            </div>
                        </div>


                        <div id="experiences" className="p-4 flex flex-col justify-between border border-black bg-white dark:bg-gray-800">
                            <h2 className="text-[64px] uppercase">experiences</h2>

                            <div className="border-t border-black dark:border-white flex flex-col pt-2 mt-16">

                                <div className="flex flex-row gap-2 justify-between items-baseline">
                                    <h3 className="text-[32px]">Freight-hub</h3>
                                    <p className="text-sm" >Aug 2023 - Mar 2025</p>
                                </div>
                                <div className="w-full xl:w-[55%] mt-4">
                                    <p>
                                        Freight-hub is a technology company revolutionizing the logistics industry through smart solutions. The platform provides comprehensive logistics management tools including ERP for logistics, transport management systems, and container relocation monitoring, empowering businesses with data-driven insights and AI-powered optimization.
                                    </p>
                                </div>
                                {/* TODO: Add responsibilities and technologies */}
                                {/* <div className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <section className="md:col-span-2">
                      <p className="capitalize">responsibilities :</p>
                      <ul className="list-disc list-inside text-sm pl-2">
                        <li>Developed and maintained B2B platform for seamless order management and shipment monitoring</li>
                        <li>Implemented AI-powered route optimization and load balancing algorithms</li>
                        <li>Built real-time container tracking and monitoring systems</li>
                        <li>Integrated GPS tracking and cashless operation features</li>
                        <li>Collaborated on business intelligence tools for data-driven logistics insights</li>
                      </ul>
                    </section>
                    <section>
                      <p className="capitalize">technologies :</p>
                      <ul className="list-disc list-inside text-sm pl-4">
                        <li>React</li>
                        <li>Tailwind CSS</li>
                        <li>TypeScript</li>
                        <li>Node.js</li>
                        <li>Express</li>
                        <li>MongoDB</li>
                      </ul>
                    </section>
                  </div>
                </div> */}
                            </div>

                            <div className="border-t border-black dark:border-white flex flex-col pt-2 mt-16">

                                <div className="flex flex-row gap-2 justify-between items-baseline">
                                    <h3 className="text-[32px]">KoinWorks</h3>
                                    <p className="text-sm" >Apr 2022 - Jul 2023</p>
                                </div>
                                <div className="w-full xl:w-[55%] mt-4">
                                    <p>
                                        KoinWorks is a leading Indonesian fintech company that provides peer-to-peer lending and investment platform. The platform connects investors with SMEs and individuals seeking financial solutions, offering various investment products and business financing options to drive financial inclusion in Indonesia
                                    </p>
                                </div>

                            </div>

                            <div className="border-t border-black dark:border-white flex flex-col pt-2 mt-16">

                                <div className="flex flex-row gap-2 justify-between items-baseline">
                                    <h3 className="text-[32px]">Paper.id</h3>
                                    <p className="text-sm" >Jan 2021 - Mar 2022</p>
                                </div>
                                <div className="w-full xl:w-[55%] mt-4">
                                    <p>
                                        Paper.id is a SaaS fintech platform that helps businesses digitize and automate their financial operations, including invoicing, payment processing, and document management. The platform help enhance business workflows and financial processes through digital transformation
                                    </p>
                                </div>

                            </div>
                        </div>

                        <div id="posts" className="p-4 flex flex-col justify-between border border-black bg-white dark:bg-gray-800">
                            <h2 className="text-[64px] uppercase">Posts</h2>
                            <div className="border-t border-black dark:border-white flex flex-col mt-16">
                                {/* Project row header */}
                                <div className="grid grid-cols-5 border-b border-black dark:border-white p-2">
                                    <p className="uppercase col-span-4">title</p>
                                    <p className="uppercase col-span-1">date</p>
                                </div>

                                {/* Blog posts from markdown */}
                                {blogPosts.length > 0 ? (
                                    blogPosts.map((post) => (
                                        <Link
                                            key={post.slug}
                                            href={`/blog/${post.slug}`}
                                            className="grid grid-cols-5 border-b border-gray-200 dark:border-gray-700 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                                        >
                                            <p className="col-span-4">{post.title}</p>
                                            <p className="col-span-1">{new Date(post.date).toLocaleDateString()}</p>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="grid grid-cols-5 border-b border-gray-200 dark:border-gray-700 p-2">
                                        <p className="col-span-4 text-muted-foreground">No blog posts yet. Add markdown files to content/blog/</p>
                                        <p className="col-span-1"></p>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                    {/* Sidebar column (20%) */}
                    <div className="pt-4 col-span-1">
                        <div className="sticky top-4">
                            <div className="min-h-[calc(100vh-2rem)] border border-black bg-white dark:bg-gray-800 flex flex-col justify-between">
                                <div>
                                    <div className="p-4">
                                        <h2 className="text-3xl font-bold">Y</h2>
                                    </div>
                                    <div className="p-2 border-t border-black dark:border-white">
                                        {['home', 'projects', 'experiences', 'posts'].map((section) => (
                                            <p
                                                key={section}
                                                className={`uppercase cursor-pointer flex items-center ${activeSection === section ? 'font-bold' : ''}`}
                                                onClick={() => scrollToSection(section)}
                                            >
                                                {activeSection === section &&
                                                    <span className="inline-block w-2 h-2 bg-black dark:bg-white rounded-full mr-2"></span>
                                                }
                                                {section}
                                            </p>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-auto">
                                    <div className="grid grid-cols-5 border-t border-b border-black dark:border-white">
                                        <div className="p-2 col-span-2">
                                            <p className="capitalize ">
                                                resume
                                            </p>
                                        </div>
                                        <div className="col-span-3  border-l  border-black dark:border-white p-2">
                                            <p className="cursor-pointer capitalize underline" onClick={() => window.open('https://drive.google.com/file/d/10q2T8kgIAC5397SIIBOhuMIdSu4etpT1/view?usp=drive_link', '_blank')}>
                                                download
                                            </p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-5">
                                        <div className="p-2 col-span-2">
                                            <p className="capitalize ">
                                                presence
                                            </p>
                                        </div>
                                        <div className="col-span-3  border-l  border-black dark:border-white p-2">
                                            <p className=" capitalize underline">
                                                LinkedIn
                                            </p>
                                            <p className=" capitalize underline">
                                                github
                                            </p>
                                        </div>
                                    </div>
                                    {/* <div className="grid grid-cols-5 border-t border-black">
                    <div className="p-2 col-span-2">
                      <p className="capitalize ">
                        presence
                      </p>
                    </div>
                    <div className="col-span-3 p-2">
                      <p className=" capitalize underline">
                        LinkedIn
                      </p>
                      <p className=" capitalize underline">
                        github
                      </p>
                    </div>
                  </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 