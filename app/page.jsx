
"use client";

import { useState, useEffect } from "react";
import client from "@/lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useUser } from "@clerk/nextjs";


export default function Page() {
  const [users, setUsers] = useState([]);
  const [pets, setPets] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user, isLoaded } = useUser();

  useEffect(() => {
    async function fetchData() {
      try {
        const userRes = await client.getEntries({ content_type: "user" });
        const fetchedUsers = userRes.items.map((item) => item.fields);

        const petRes = await client.getEntries({ content_type: "pet" });
        const fetchedPets = petRes.items.map((item) => item.fields);

        const postRes = await client.getEntries({ content_type: "post", include: 2 });
        const fetchedPosts = postRes.items.map((item) => item.fields);

        const commentRes = await client.getEntries({ content_type: "comment", include: 2 });
        const fetchedComments = commentRes.items.map((item) => item.fields);

        setUsers(fetchedUsers);
        setPets(fetchedPets);
        setPosts(fetchedPosts);
        setComments(fetchedComments);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);





  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-pink-100 to-blue-100 min-h-screen rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-center text-gray-800 pb-4">🐾 Pet Forum Dashboard 🐾</h1>

      <div className="flex flex-col items-center justify-center">
      {user ? (
        <h1 className="text-2xl font-bold text-center text-purple-700">Welcome, {user.firstName}!</h1>
      ) : (
        <h1 className="hidden"></h1>
      )}
    </div>

      {loading ? (
        <p className="text-gray-500 text-center mt-5">Loading data...</p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-6">
            {/* 用户部分 User Section */}
            <div>
              <h2 className="mt-10 text-3xl font-semibold text-gray-700 border-b-2 border-gray-300 pb-2">Users</h2>
              <div className="space-y-4 mt-4">
                {users.map((user, index) => (
                  <div key={index} className="flex items-center space-x-4 p-5 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl">
                    {user.avatar?.fields?.file?.url && (
                      <img
                        src={`https:${user.avatar.fields.file.url}`}
                        alt={`${user.username}'s Avatar`}
                        className="w-16 h-16 rounded-full border-4 border-pink-300"
                      />
                    )}
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{user.username}</h3>
                      <p className="text-gray-500 text-sm">🐶 Pet Type: {user.pet_type || "Unknown"}</p>
                      <div className="text-gray-600 text-sm italic">
                        {user.bio && user.bio.nodeType === "document"
                          ? documentToReactComponents(user.bio)
                          : user.bio || "No bio available"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 宠物部分 Pet Section */}
            <div>
              <h2 className="mt-10 text-3xl font-semibold text-gray-700 border-b-2 border-gray-300 pb-2">Pets</h2>
              <div className="space-y-4 mt-4">
                {pets.map((pet, index) => (
                  <div key={index} className="flex flex-col items-center p-5 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl">
                    {pet.petavatar?.fields?.file?.url && (
                      <img
                        src={`https:${pet.petavatar.fields.file.url}`}
                        alt={pet.petname || "Pet"}
                        className="w-16 h-16 rounded-lg border-2 border-blue-300 shadow-sm"
                      />
                    )}
                    <p className="text-sm font-semibold text-gray-700 mt-2">{pet.petname}</p>
                    <div className="text-xs text-gray-500 italic text-center">
                      {pet.petintro && pet.petintro.nodeType === "document"
                        ? documentToReactComponents(pet.petintro)
                        : pet.petintro || "No description available"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 帖子部分 Post Section */}
          <h2 className="mt-10 text-3xl font-semibold text-gray-700 border-b-2 border-gray-300 pb-2">Recent Posts</h2>
          <ul className="mt-4 space-y-4">
            {posts.map((post, index) => (
              <li key={index} className="p-6 bg-white border rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
                <h3 className="text-xl font-bold text-gray-800">{post.title}</h3>
                <div className="text-gray-500 text-sm mt-2">
                  {post.content?.nodeType === "document"
                    ? documentToReactComponents(post.content)
                    : "No content available"}
                </div>
              </li>
            ))}
          </ul>

          {/* 评论部分 Comment Section */}
          <h2 className="mt-10 text-3xl font-semibold text-gray-700 border-b-2 border-gray-300 pb-2">Latest Comments</h2>
          <ul className="mt-4 space-y-4">
            {comments.map((comment, index) => (
              <li key={index} className="p-6 bg-white border rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
                <div className="text-gray-500 text-sm">
                  {comment.content?.nodeType === "document"
                    ? documentToReactComponents(comment.content)
                    : "No content available"}
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
