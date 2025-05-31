import { getAllPosts } from "@/lib/markdown";
import HomeClient from "@/components/HomeClient";

// Server component that fetches blog posts at build time
export default async function Home() {
  const blogPosts = await getAllPosts();

  return <HomeClient blogPosts={blogPosts} />;
}
