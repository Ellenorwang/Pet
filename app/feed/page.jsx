"use client";

import { useState, useEffect } from "react";
import client from "@/lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React from "react";

export default function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const postRes = await client.getEntries({
          content_type: "post",
          include: 2,
        });
        const fetchedPosts = postRes.items.map((item) => item.fields);

        const commentRes = await client.getEntries({
          content_type: "comment",
          include: 2,
        });
        const fetchedComments = commentRes.items.map((item) => item.fields);

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

  const handlePostClick = (slug) => {
    router.push(`/post/${slug}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-pink-100 to-blue-100 min-h-screen rounded-lg shadow-lg">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center text-gray-800 pb-4">
        🐾 Feed Page 🐾
      </h1>

      {/* User Info */}
      {user && (
        <div className="flex flex-col items-center justify-center mb-6">
          <h2 className="text-2xl font-bold text-center text-purple-700">
            Welcome, {user.firstName}!
          </h2>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <p className="text-gray-500 text-center mt-5">Loading feed...</p>
      ) : (
        <>
          {/* Recent Posts */}
          <h2 className="mt-10 text-3xl font-semibold text-gray-700 border-b-2 border-gray-300 pb-2">
            Recent Posts
          </h2>
          <ul className="mt-4 space-y-6">
            {posts.map((post, index) => (
              <li
                key={index}
                className="p-6 bg-white border rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 cursor-pointer"
                onClick={() => handlePostClick(post.slug)}
              >
                {/* Post Title */}
                <h3 className="text-xl font-bold text-gray-800">
                  {post.title}
                </h3>

                {/* Post Content */}
                <div className="text-gray-500 text-sm mt-2">
                  {post.content?.nodeType === "document"
                    ? documentToReactComponents(post.content)
                    : "No content available"}
                </div>

                {/* Post Author */}
                {post.author?.fields && (
                  <div className="flex items-center mt-4 space-x-4">
                    {post.author.fields.avatar?.fields?.file?.url && (
                      <img
                        src={`https:${post.author.fields.avatar.fields.file.url}`}
                        alt="Author Avatar"
                        className="w-10 h-10 rounded-full border-2 border-blue-300 shadow-sm"
                      />
                    )}
                    <div>
                      <p className="font-semibold text-gray-800">
                        {post.author.fields.username}
                      </p>
                      <p className="text-gray-500 text-sm">
                        🐾 Pet: {post.author.fields.pet_type || "Unknown"}
                      </p>
                    </div>
                  </div>
                )}

                {/* Comments Section */}
                <div className="mt-4 border-t pt-4 space-y-3">
                  <h4 className="text-lg font-semibold text-gray-700">
                    Comments
                  </h4>
                  {comments
                    .filter(
                      (comment) =>
                        comment.post?.fields?.title === post.title
                    )
                    .map((comment, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-gray-50 border rounded-lg"
                      >
                        {/* Comment Content */}
                        <div className="text-gray-600">
                          {comment.content?.nodeType === "document"
                            ? documentToReactComponents(comment.content)
                            : comment.content || "No content available"}
                        </div>

                        {/* Comment Author */}
                        {comment.author?.fields && (
                          <div className="flex items-center mt-2 space-x-4">
                            {comment.author.fields.avatar?.fields?.file?.url && (
                              <img
                                src={`https:${comment.author.fields.avatar.fields.file.url}`}
                                alt="Comment Author Avatar"
                                className="w-8 h-8 rounded-full border-2 border-pink-300 shadow-sm"
                              />
                            )}
                            <div>
                              <p className="font-semibold text-gray-800">
                                {comment.author.fields.username}
                              </p>
                              <p className="text-gray-500 text-sm">
                                🐾 Pet:{" "}
                                {comment.author.fields.pet_type || "Unknown"}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </li>
            ))}
          </ul>

          {/* Explore Other Posts */}
          <h2 className="mt-10 text-3xl font-semibold text-gray-700 border-b-2 border-gray-300 pb-2">
            Explore Other Posts
          </h2>
          <div className="grid grid-cols-3 gap-4 mt-6">
            {posts.map((post, index) => (
              <div
                key={index}
                className="relative group cursor-pointer w-full h-48 bg-cover bg-center rounded-lg shadow-md transition-transform duration-200 transform group-hover:scale-105"
                style={{
                  backgroundImage: post.thumbnail?.fields?.file?.url
                    ? `url('https:${post.thumbnail.fields.file.url}')`
                    : `url('/assets/img_6893.jpg')`, 
                }}
                onClick={() => handlePostClick(post.slug)}
              >
             
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-lg"></div>

              
                <p className="absolute bottom-2 left-2 text-white text-sm font-semibold">
                  {post.title}
                </p>
              </div>
            ))}

            <div className="relative group cursor-pointer w-full h-48 bg-blue-200 rounded-lg shadow-md transition-transform duration-200 transform group-hover:scale-105 flex items-center justify-center">
              <p className="text-gray-800 text-lg font-semibold">More Fun Posts</p>
            </div>
            <div className="relative group cursor-pointer w-full h-48 bg-pink-200 rounded-lg shadow-md transition-transform duration-200 transform group-hover:scale-105 flex items-center justify-center">
              <p className="text-gray-800 text-lg font-semibold">Discover New Friends</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

