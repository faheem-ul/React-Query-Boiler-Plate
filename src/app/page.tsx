"use client"

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
    
{data?.slice(0,10).map((item, index)=>{
  return (
    <div key={index} className="border-2 border-gray-200 p-4 my-4">
      <h2>{item.id}</h2>
      <p>{item.title}</p>
    </div>
  )
  
})}
    </main>
  );
}
