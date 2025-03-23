"use client";
import { useAuth } from "@clerk/nextjs";
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const users = () => {
  const { userId, isSignedIn } = useAuth();
  const router = useRouter();

  // This code is converted from the code in the auth() document
  useEffect(() => {
    if (!isSignedIn) {
      router.push("/redirectedSignup");
      // Redirect to sign-in page
    }
  }, [isSignedIn, router]);

  if (!isSignedIn) {
    return <p>Redirecting...</p>;
    // Tells the user is redirecting to a new page
  }

  return (
    <div>
      <h1>Content for Friends page will go here, such as Users and their Pets.</h1>
    </div>
  );
};

export default users;
