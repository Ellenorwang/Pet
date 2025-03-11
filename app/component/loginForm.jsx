"use client";
import '../globals.css';
import { useState } from 'react';
import { useSignIn } from '@clerk/nextjs';
import Logo from './logo';


function LoginForm() {
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
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); 

    if (!validateForm()) return;

    setLoading(true);
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        window.location.href = '/';


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
    <div className='w-full h-full flex flex-col items-center'>
    <form onSubmit={handleSubmit} className="m-4 p-10 border-1 border-gray-100 rounded-md shadow-lg max-w-sm">
      
      <Logo />
      
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

export default LoginForm;
