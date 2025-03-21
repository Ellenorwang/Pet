"use client";
import { useAuth } from "@clerk/nextjs";
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const users = () => {
  const { userId, isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/redirectedSignup"); // Redirect to sign-in page
    }
  }, [isSignedIn, router]);

  if (!isSignedIn) {
    return <p>Redirecting...</p>; // Show a message while redirecting
  }

  return (
    <div>
      <h1>Hello, </h1>
    </div>
  );
};

export default users;
