"use client";
import { useAuth } from "@clerk/nextjs";
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

const Dashboard = () => {
  const { userId, isSignedIn } = useAuth();
  const router = useRouter();




//   // This code is converted from the code in the auth() document
//   useEffect(() => {
//     if (!isSignedIn) {
//       router.push("/redirectedSignup");
//       // Redirect to sign-in page
//     }
//   }, [isSignedIn, router]);

//   if (!isSignedIn) {
//     return <p>Redirecting...</p>;
//     // Tells the user is redirecting to a new page
//   }

const { user, isLoaded } = useUser();

if (!isLoaded || !user) {
  return <p>Loading...</p>;
}




  return (
    <div>
     
          <h1 className="text-2xl font-bold text-center text-purple-700">
            {user.firstName}'s User Dashboard
          </h1>


      <div className="flex">
          <div className="w-1/4 border-1 border-amber-800 flex flex-col items-start p-4 gap-4">
          <button>Profile</button>
          <button>Pets</button>
          <button>Notifications</button>
          <button>Privacy</button>
          <button>Settings</button>
          </div>
          
          <div className="w-3/4 border-1 border-amber-800 flex flex-col justify-center items-center p-4">
            <h1>HEY</h1>
          </div>
      </div>


    </div>
  );
};

export default Dashboard;
