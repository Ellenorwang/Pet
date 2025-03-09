"use client";
import '../globals.css';
import { useState } from 'react';
import { useSignIn } from '@clerk/nextjs';
import Link from "next/link";

function Login() {
  const { signIn, setActive } = useSignIn();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Client-side form validation
  const validateForm = () => {
    if (!email || !password) {
      setError('Email and password are required.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset any previous error

    if (!validateForm()) return;

    setLoading(true);
    try {
      // Attempt to sign in using Clerk's signInWithEmailPassword method
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        
        // Optionally redirect or update your UI after successful login
        // router.push('/home'); // You can redirect the user if needed
      } else {
        setError('Invalid credentials or server error. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Invalid credentials or server error. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div>
    <form onSubmit={handleSubmit} className="m-4 p-10 border-1 border-gray-100 rounded-md shadow-lg max-w-sm">
      <img src="https://images.unsplash.com/photo-1591160690555-5debfba289f0?q=80&w=3928&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="PET logo" className='max-w-30 m-auto mb-10'/>
      <div className='flex flex-col'>
        <label className='font-medium'>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-100 p-2 rounded-md mb-4 mt-1"
          placeholder="Enter your email"
        />
      </div>
      <div className='flex flex-col'>
        <label className='font-medium'>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-gray-100 p-2 rounded-md mb-4 mt-1"
          placeholder="Enter your password"
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <button type="submit" disabled={loading} className="w-full mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:shadow-lg cursor-pointer font-semibold">
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
    </div>
  );
}

export default Login;
