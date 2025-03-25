"use client";

import Carousel from "@/components/photo-carousel";
import Stack from "@/components/photo-stack";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";
import { Mail, FileText, Lock, User } from "lucide-react";
import Image from "next/image";

interface BorderedBoxProps {
  children: React.ReactNode;
  className?: string;
}

function BorderedBox({ children, className = "" }: BorderedBoxProps) {
  return (
    <div className={`border border-gray-200 dark:border-gray-800 relative ${className}`}>
      {/* Corner decorators */}
      <div className="absolute -top-[8.5px] -left-[8.5px] w-[8px] h-[8px] bg-background before:absolute before:left-[100%] before:-translate-x-1/2 before:w-[1px] before:h-[9px] before:bg-gray-200 before:dark:bg-gray-800 after:absolute after:top-[100%] after:-translate-y-1/2 after:h-[1px] after:w-[9px] after:bg-gray-200 after:dark:bg-gray-800" />
      <div className="absolute -top-[8.5px] -right-[8.5px] w-[8px] h-[8px] bg-background before:absolute before:left-0 before:-translate-x-1/2 before:w-[1px] before:h-[9px] before:bg-gray-200 before:dark:bg-gray-800 after:absolute after:top-[100%] after:-translate-y-1/2 after:h-[1px] after:w-[9px] after:bg-gray-200 after:dark:bg-gray-800" />
      <div className="absolute -bottom-[8.5px] -left-[8.5px] w-[8px] h-[8px] bg-background before:absolute before:left-[100%] before:-translate-x-1/2 before:w-[1px] before:h-[9px] before:bg-gray-200 before:dark:bg-gray-800 after:absolute after:top-0 after:-translate-y-1/2 after:h-[1px] after:w-[9px] after:bg-gray-200 after:dark:bg-gray-800" />
      <div className="absolute -bottom-[8.5px] -right-[8.5px] w-[8px] h-[8px] bg-background before:absolute before:left-0 before:-translate-x-1/2 before:w-[1px] before:h-[9px] before:bg-gray-200 before:dark:bg-gray-800 after:absolute after:top-0 after:-translate-y-1/2 after:h-[1px] after:w-[9px] after:bg-gray-200 after:dark:bg-gray-800" />
      {children}
    </div>
  );
}

function MenuBar() {
  return (
    <BorderedBox className="mb-5">
      <div className="flex justify-between">
        {/* Existing menu items */}
        <div className="flex">
          <div className="p-2 border-r border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
            <p className="text-muted-foreground">Home</p>
          </div>
          <div className="p-2 border-r border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
            <p className="text-muted-foreground">Projects</p>
          </div>
          <div className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
            <p className="text-muted-foreground">Work Experiences</p>
          </div>
        </div>

        {/* New language and theme options */}
        <div className="flex border-l border-gray-200 dark:border-gray-800">
          <div className="px-4 py-2 border-r border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
            <div className="flex items-center gap-1">
              <p className="text-muted-foreground">EN</p>
              <span className="text-muted-foreground text-xs">▼</span>
            </div>
          </div>
          <div className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
            <div className="flex items-center gap-1">
              <p className="text-muted-foreground">Light</p>
              <span className="text-muted-foreground text-xs">▼</span>
            </div>
          </div>
        </div>
      </div>
    </BorderedBox>
  );
}

function TitleBar({ title, subtitle }: { title: string, subtitle?: string }) {
  return (
    <div className="px-2 border-b border-gray-200 dark:border-gray-800 flex">
      <div className="bg-background pr-4">
        <p className="text-muted-foreground text-xs italic">{title}</p>
      </div>
      <div className="flex-1 bg-[repeating-linear-gradient(45deg,rgb(229,231,235,0.5)_0px,rgb(229,231,235,0.5)_10px,transparent_10px,transparent_20px)] dark:bg-[repeating-linear-gradient(45deg,rgb(31,41,55,0.5)_0px,rgb(31,41,55,0.5)_10px,transparent_10px,transparent_20px)]" />
      {
        subtitle ? (
          <div className="bg-background pl-4">
            <p className="text-muted-foreground text-xs italic">{subtitle}</p>
          </div>
        ) : null
      }
    </div>
  );
}

function ProfileHeader() {
  return (
    <BorderedBox className="flex flex-col justify-between">
      <TitleBar title="1. Home" />

      {/* Added ASCII Computer Architecture diagram */}
      <div className="overflow-auto hidden lg:block">
        <div className="text-xs h-[30vh] flex justify-center bg-[radial-gradient(circle,rgb(229,231,235)_1px,transparent_1px)] dark:bg-[radial-gradient(circle,rgb(31,41,55)_1px,transparent_1px)] bg-[size:16px_16px]" />
      </div>

      <div className="px-2">
        <p className="text-[clamp(2rem,5vw,4rem)] leading-tight">
          Hi!, I'm <span className="font-bold bg-[#cccccc] px-1">Firsta Royan</span>
          <br />
          A software engineer building quality digital products
          based in Bekasi, Indonesia.
        </p>
      </div>

      <div className="flex flex-row justify-between border-t border-gray-200 dark:border-gray-800">
        <div className="flex flex-row gap-2">
          <div className="flex p-2 flex-col gap-1 border-r border-gray-200 dark:border-gray-800">
            <p className="text-muted-foreground text-xs">Experience</p>
            {/* <div className="flex flex-row gap-1"> */}
            <p className="text-muted-foreground text-sm">4 Years</p>
            {/* </div> */}
          </div>
          <div className="flex p-2 flex-col gap-1 border-r border-gray-200 dark:border-gray-800">
            <p className="text-muted-foreground text-xs">Language</p>
            {/* <div className="flex flex-row gap-1"> */}
            <p className="text-muted-foreground text-sm">ID/US/CN/JP</p>
            {/* </div> */}
          </div>
          <div className="flex p-2 flex-col gap-1 border-r border-gray-200 dark:border-gray-800">
            <p className="text-muted-foreground text-xs">Occupation</p>
            {/* <div className="flex flex-row gap-1"> */}
            <p className="text-muted-foreground text-sm">Software Engineer</p>
            {/* </div> */}
          </div>
          <div className="flex p-2 flex-col gap-1 border-r border-gray-200 dark:border-gray-800">
            <p className="text-muted-foreground text-xs">Focus</p>
            {/* <div className="flex flex-row gap-1"> */}
            <p className="text-muted-foreground text-sm">Web Platform</p>
            {/* </div> */}
          </div>

        </div>
      </div>

    </BorderedBox>
  );
}

function NotableProjects() {
  return (
    <BorderedBox className="flex flex-col justify-between mt-10">
      <TitleBar title="2. Projects" subtitle="Total: 6" />
      <div className="overflow-auto hidden lg:block">
        <div className="text-xs gap-7 flex flex-col justify-center bg-[radial-gradient(circle,rgb(229,231,235)_1px,transparent_1px)] dark:bg-[radial-gradient(circle,rgb(31,41,55)_1px,transparent_1px)] bg-[size:16px_16px] p-4">
          <BorderedBox className="flex flex-col justify-between w-full bg-white dark:bg-gray-800">
            {/* <div className="relative w-full h-[400px]"> */}
            <Carousel
              baseWidth="100%"
              loop={true}
              round={false}
            />
            {/* </div> */}
            {/* <div className="flex flex-col border border-gray-200 dark:border-gray-800"> */}
            <div className="flex flex-col gap-1 border-b border-t border-gray-200 dark:border-gray-800">
              <div className="p-4 flex flex-col gap-1 border-b border-gray-200 dark:border-gray-800 pb-2">
                <p className="text-muted-foreground text-xs">Project Title</p>
                <p className="text-[38px] leading-tight font-bold">Taksi</p>
              </div>
              <div className="p-4 flex flex-col gap-1 border-b border-gray-200 dark:border-gray-800">
                <p className="text-muted-foreground text-xs">Description</p>
                <p className="text-lg font-bold">
                  Dynamic reporting system for the Ministry of Housing. Build a seamless, interactive user experience, enhanced data visualization and reporting capabilities for critical in-house projects
                </p>
              </div>
              <div className="p-4 flex flex-col gap-1">
                <p className="text-muted-foreground text-xs">Tech Stack</p>
                <p className="text-muted-foreground text-lg font-bold">
                  React, TypeScript, Mantine UI, Tanstack Query, Legend State
                </p>
              </div>
            </div>
            <div className="flex flex-row justify-end">
              <div className="p-2 border-l border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                <p className="text-muted-foreground text-[16px] cursor-pointer">Read Case Study ↗</p>
              </div>
            </div>
          </BorderedBox>
          <BorderedBox className="flex flex-col justify-between w-full bg-white dark:bg-gray-800">
            {/* <div className="relative w-full h-[400px]"> */}
            <Carousel
              baseWidth="100%"
              loop={true}
              round={false}
            />
            {/* </div> */}
            {/* <div className="flex flex-col border border-gray-200 dark:border-gray-800"> */}
            <div className="flex flex-col gap-1 border-b border-t border-gray-200 dark:border-gray-800">
              <div className="p-4 flex flex-col gap-1 border-b border-gray-200 dark:border-gray-800 pb-2">
                <p className="text-muted-foreground text-xs">Project Title</p>
                <p className="text-[38px] leading-tight font-bold">Taksi</p>
              </div>
              <div className="p-4 flex flex-col gap-1 border-b border-gray-200 dark:border-gray-800">
                <p className="text-muted-foreground text-xs">Description</p>
                <p className="text-lg font-bold">
                  Dynamic reporting system for the Ministry of Housing. Build a seamless, interactive user experience, enhanced data visualization and reporting capabilities for critical in-house projects
                </p>
              </div>
              <div className="p-4 flex flex-col gap-1">
                <p className="text-muted-foreground text-xs">Tech Stack</p>
                <p className="text-muted-foreground text-lg font-bold">
                  React, TypeScript, Mantine UI, Tanstack Query, Legend State
                </p>
              </div>
            </div>
            <div className="flex flex-row justify-end">
              <div className="p-2 border-l border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">

                {/* <div className="p-2 border-l border-gray-200 dark:border-gray-800"> */}
                <p className="text-muted-foreground text-[16px] cursor-pointer">Read Case Study ↗</p>
                {/* </div> */}



              </div>
            </div>
          </BorderedBox>

        </div>
      </div>
    </BorderedBox>
  );
}

interface InfoRowProps {
  label: string;
  value: string;
}

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <>
      <div className="px-2 border-b border-gray-200 dark:border-gray-800">
        <p className="text-muted-foreground text-xs">{label}</p>
      </div>
      <div className="px-2 border-b border-gray-200 dark:border-gray-800">
        <p className="text-muted-foreground text-md">{value}</p>
      </div>
    </>
  );
}

function ProfileInfo() {
  return (
    <div className="flex-1">
      <InfoRow label="Name" value="Firsta Royan Daliska" />
      <InfoRow label="Occupation" value="Software Engineer" />
      <InfoRow label="Location" value="Bekasi, Indonesia" />
      <div className="px-2 border-t border-gray-200 dark:border-gray-800">
        <p className="text-muted-foreground text-xs text-right">More &gt;</p>
      </div>
    </div>
  );
}

function ProfileImage() {
  return (
    <div className="p-2 flex-1 border-r border-gray-200 dark:border-gray-800">
      <div className="w-full h-full bg-background bg-[linear-gradient(to_right,rgb(229,231,235)_1px,transparent_1px),linear-gradient(to_bottom,rgb(229,231,235)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgb(31,41,55)_1px,transparent_1px),linear-gradient(to_bottom,rgb(31,41,55)_1px,transparent_1px)] bg-[size:20px_20px] [background-position:1px_1px] relative flex items-center justify-center">
        <div className="transform rotate-[10deg] p-10">
          <Image
            src="/IMG_1005.jpg"
            alt="Profile Photo"
            width={200}
            height={200}
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}

interface WorkExperienceItem {
  companyLogo: string;
  companyName: string;
  duration: {
    start: string;
    end: string;
  };
  totalDuration: string;
  description: string;
  responsibilities: string[];
}

function WorkExperienceCard({ experience }: { experience: WorkExperienceItem }) {
  return (
    <BorderedBox className="flex flex-col justify-between w-full bg-white dark:bg-gray-800">
      <div className="flex flex-row gap-2">
        <div className="flex p-2 justify-center items-center flex-col gap-1 border-r border-gray-200 dark:border-gray-800">
          <Image
            src={experience.companyLogo}
            alt={`${experience.companyName} Logo`}
            width={100}
            height={40}
            className="object-contain"
          />
        </div>
        <div className="flex p-4 flex-col justify-between">
          <p className="text-muted-foreground text-xs">Company Name</p>
          <p className="text-[38px] leading-tight font-bold">{experience.companyName}</p>
        </div>
      </div>

      <div className="flex flex-row gap-2 border-t border-gray-200 dark:border-gray-800">
        <div className="p-4 flex flex-col gap-1">
          <p className="text-muted-foreground text-xs">Duration</p>
          <p className="text-lg font-bold">
            {experience.duration.start} - {experience.duration.end}
          </p>
        </div>

        <div className="p-4 flex flex-col gap-1 border-l border-gray-200 dark:border-gray-800">
          <p className="text-muted-foreground text-xs">Total Duration</p>
          <p className="text-lg font-bold">{experience.totalDuration}</p>
        </div>
      </div>

      <div className="flex flex-row gap-2 border-t border-gray-200 dark:border-gray-800">
        <div className="p-4 flex flex-col gap-2">
          <p className="text-muted-foreground text-xs">Description</p>
          <p className="text-lg font-bold">{experience.description}</p>
        </div>
      </div>

      <div className="flex flex-row gap-2 border-t border-gray-200 dark:border-gray-800">
        <div className="p-4 flex flex-col gap-2">
          <p className="text-muted-foreground text-xs">Responsibilities</p>
          {experience.responsibilities.map((responsibility, index) => (
            <p key={index} className="text-lg font-bold">
              ► {responsibility}
            </p>
          ))}
        </div>
      </div>
    </BorderedBox>
  );
}

function WorkExperience() {
  const experiences: WorkExperienceItem[] = [
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
  ];

  return (
    <BorderedBox className="flex flex-col justify-between mt-10">
      <TitleBar title="3. Work Experiences" subtitle={`Total: ${experiences.length}`} />
      <div className="overflow-auto hidden lg:block">
        <div className="text-xs gap-7 flex flex-col justify-center bg-[radial-gradient(circle,rgb(229,231,235)_1px,transparent_1px)] dark:bg-[radial-gradient(circle,rgb(31,41,55)_1px,transparent_1px)] bg-[size:16px_16px] p-4">
          {experiences.map((experience, index) => (
            <WorkExperienceCard key={index} experience={experience} />
          ))}
        </div>
      </div>
    </BorderedBox>
  );
}

interface WritingItemProps {
  title: string;
  date: string;
  onClick?: () => void;
}

function WritingItem({ title, date, onClick }: WritingItemProps) {
  return (
    <div
      className="p-4 flex flex-row gap-2 items-center justify-between cursor-pointer hover:animate-bg-blink"
      onClick={onClick}
    >
      <p className="text-lg font-bold">{title}</p>
      <p className="text-muted-foreground text-xs">{date}</p>
    </div>
  );
}

function Writing() {
  const articles = [
    {
      title: "Optimizing Frontend Performance with TanStack Query",
      date: "12/12/2024"
    },
    {
      title: "Building Responsive UIs with Tailwind CSS",
      date: "10/15/2024"
    },
    {
      title: "State Management Patterns in React Applications",
      date: "09/22/2024"
    }
    // Add more articles as needed
  ];

  return (
    <BorderedBox className="flex flex-col justify-between mt-10">
      <TitleBar title="4. Writing" subtitle={`Total: ${articles.length}`} />
      {articles.map((article, index) => (
        <WritingItem
          key={index}
          title={article.title}
          date={article.date}
          onClick={() => console.log(`Clicked on article: ${article.title}`)}
        />
      ))}
       <div className="flex flex-row justify-end border-t border-gray-200 dark:border-gray-800">
              <div className="p-2 border-l border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
                <p className="text-muted-foreground text-[16px] cursor-pointer">Read More ↗</p>
              </div>
            </div>
    </BorderedBox>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative">
      <div className="pt-12 mx-auto max-w-[1400px] px-6 sm:px-8 md:px-12 lg:px-16 min-h-screen relative">
        <MenuBar />
        <ProfileHeader />
        <NotableProjects />
        <WorkExperience />
        <Writing />
        {/* <ProfileHeader /> */}

        {/* <BorderedBox className="mt-5 flex flex-col justify-between">
          <div className="px-2 border-b border-gray-200 dark:border-gray-800">
            <p className="text-muted-foreground text-xl">Introduction</p>
          </div>

          <div className="flex flex-1">
            <ProfileImage />
            <ProfileInfo />
          </div>
        </BorderedBox> */}
      </div>
    </div>
  );
}
