"use client";
import { SignUp } from "@clerk/nextjs";

function Signup() {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <h1 className="my-6">Sign Up Page</h1>
      <SignUp routing="hash" />
    </div>
  );
}

export default Signup;
