import SingleBlog from "@/components/SingleBlog";

import { useEffect, useState } from "react";

interface Blog {
  userId: number;
  id: number;
  image?: string;
  title: string;
  body: string;
}

const fetchPost = async (): Promise<Blog[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};

const HomePage = () => {
  const [posts, setPosts] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPost = async () => {
      try {
        const data = await fetchPost();
        setPosts(data);
      } catch (error) {
        setError("Failed to load posts");
        console.log(error);
      }
    };
    getPost();
  }, []);
  return (
    <div className="max-w-6xl mx-auto">
      {/* blogs */}

      <div className="my-4">
       {error && <div className="text-red-500">{error}</div>}

       {posts.map((blog) => (
          <SingleBlog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
