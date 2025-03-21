"use client";
import { SignUp } from "@clerk/nextjs";

function redirectedSignup() {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <h1 className="my-6">Must be logged in to view this</h1>
      <SignUp routing="hash" />
    </div>
  );
}

export default redirectedSignup;
