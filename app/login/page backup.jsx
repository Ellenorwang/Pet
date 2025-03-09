"use client"; // This makes the component a Client Component

import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/router"; // Ensure you import useRouter here
import { useState } from "react";

const Login = () => {
  const router = useRouter();  // Access the useRouter hook here
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await signIn({ emailAddress: email, password });
      setActive({ session: signIn.createdSession });
      router.push("/home"); // Use the router here to navigate after login
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  if (!isLoaded) return <p>Loading...</p>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
