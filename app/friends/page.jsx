"use client";
import { useAuth, useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import client from "@/lib/contentful";
import React from "react";
import { useRouter } from "next/navigation";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

const Users = () => {
  const { userId, isSignedIn } = useAuth(); 
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/redirectedSignup");
    }

    async function fetchData() {
      try {
      
        const friendsRes = await client.getEntries({
          content_type: "friends",
        });
        const fetchedFriends = friendsRes.items.map((item) => item.fields);
        setFriends(fetchedFriends);
      } catch (error) {
        console.error("Error fetching friends:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [isSignedIn, router]);

  if (!isSignedIn) {
    return <p>Redirecting...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-pink-100 to-blue-100 min-h-screen rounded-lg shadow-lg">
      {/* User Info */}
      {user && (
        <div className="flex flex-col items-center justify-center mb-6">
          <h2 className="text-2xl font-bold text-center text-purple-700">
            Welcome, {user.firstName}!
          </h2>
          {user.imageUrl && (
            <img
              src={user.imageUrl}
              alt="User Avatar"
              className="w-32 h-32 rounded-full border-4 border-blue-300 shadow-md mt-4 object-cover"
            />
          )}
        </div>
      )}

      {/* Title */}
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        🐾 Friends Page 🐾
      </h1>

      {loading ? (
        <p className="text-gray-500 text-center mt-5">Loading friends...</p>
      ) : (
        <>
          {/* Friends Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            {friends.map((friend, index) => (
              <div
                key={index}
                className="group bg-white p-4 border rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105"
              >
                {/* Friend Avatar */}
                {friend.friends?.fields?.file?.url && (
                  <img
                    src={`https:${friend.friends.fields.file.url}`}
                    alt={friend.friendsname}
                    className="w-full object-cover rounded-full shadow-md"
                  />
                )}

                {/* Friend Name */}
                <h3 className="text-lg font-bold mt-2 text-gray-800">
                  {friend.friendsname}
                </h3>

                {/* Friend Bio */}
                <div className="text-gray-500 text-sm mt-1">
                  {friend.friendsbio?.nodeType === "document"
                    ? documentToReactComponents(friend.friendsbio)
                    : friend.friendsbio || "No bio available"}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Users;
