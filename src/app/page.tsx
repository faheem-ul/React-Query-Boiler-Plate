"use client"

import Link from "next/link";

import { useQuery } from "@tanstack/react-query";

import axios from "axios";

interface Post{
  userId: number;
  id: number;
  title: string;
  body: string;
}
const Posts = async ():Promise<Post[]> => {
  try {
   const respone = await axios.get("https://jsonplaceholder.typicode.com/posts")
   const posts = respone.data
   return posts;
  
  } catch (error) {
    console.error("error in fetching posts",error)
    return[]
  }
}

export default function Home() {
  const {data, isLoading, error} = useQuery({
    queryKey: ["posts"],
    queryFn: Posts
  })

// console.log(data);

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error fetching posts</div>;
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/Mutations">Navigate to Mutations Page</Link>
        <h1 className="text-3xl font-bold" >Data fetched with the help of query from json placeholder</h1>
{data?.slice(0,10).map((item, index)=>{
  return (
    <div key={index} className="border-2 border-gray-200 p-4 my-4 w-[600px]">
      <h2 className="text-center font-semibold text-2xl">{item.id}</h2>
      <p className="text-center ">{item.title}</p>
    </div>
  )
  
})}
    </main>
  );
}
