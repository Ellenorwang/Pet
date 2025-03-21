"use client";
import '../globals.css';
import { useState } from 'react';
import { useSignIn } from '@clerk/nextjs';
import Logo from '../component/logo';
import LoginForm from '../component/loginForm';


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

        // router.push('/home'); // You can redirect the user if needed

        // can't seem to get the route/redirect to homepage to work after user logs in

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
        <h1 className='my-6'>Login Page</h1>
        <LoginForm />
    </div>
  );
}

export default Login;
