"use client";

import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
interface Post {
  id: string;
  name: string;
  email: string;
}
const Posts = async (): Promise<Post[]> => {
  try {
    const respone = await axios.get("http://localhost:3000/Posts");
    const posts = respone.data;
    return posts;
  } catch (error) {
    console.error("error in fetching posts", error);
    return [];
  }
};

const addUser = async (newUser: Post) => {
  try {
    const response = await axios.post("http://localhost:3000/Posts", newUser);
    return response.data;
  } catch (error) {
    console.error("error in adding user", error);
  }
};

export default function Mutations() {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [useremail, setUserEmail] = useState("");

 const queryClient = new QueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: Posts,
    refetchInterval: 5000,
  });

  const { mutateAsync: addUserMutation } = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
       
      })
    }
  });

  const handleAdduser = async () => {
    try {
      await addUserMutation({
        id: userId,
        name: userName,
        email: useremail,
      });
      setUserId("");
      setUserName("");
      setUserEmail("");
      console.log("user added successfully");
    } catch (error) {
      console.log("error adding user", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching posts</div>;

  return (
    <main className="flex  flex-col items-center justify-between p-24">
      <input
        type="text"
        placeholder="Enter id"
        className="border-2 border-gray-200 p-2 rounded-[12px] my-3"
        onChange={(e) => {
          setUserId(e.target.value);
          console.log(userId);
        }}
      />
      <input
        type="text"
        placeholder="Enter name"
        className="border-2 border-gray-200 p-2 rounded-[12px] my-3"
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Enter email"
        className="border-2 border-gray-200 p-2 rounded-[12px] my-3"
        onChange={(e) => {
          setUserEmail(e.target.value);
        }}
      />
      <button
        className="bg-green-500 px-4 py-2 rounded-[12px] my-3"
        onClick={handleAdduser}
      >
        Add User
      </button>
      <h1 className="text-center font-semibold text-3xl">Mutations</h1>
      {data?.map((item, index) => {
        return (
          <div
            key={index}
            className="border-2 border-gray-200 p-4 my-4 w-[400px] rounded-[20px]"
          >
            <h2 className="text-center font-semibold">User Id:{item.id}</h2>
            <p className="text-center">Email: {item.email}</p>
          </div>
        );
      })}
    </main>
  );
}
