import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '@/components/Loader';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase will handle the OAuth callback automatically
    // After successful auth, redirect to profile
    const timer = setTimeout(() => {
      navigate('/profile');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative bg-darkBlue text-foreground min-h-screen flex items-center justify-center">
      <Loader />
      <div className="absolute bottom-[18%] text-center px-4">
        <h1 className="text-2xl font-bold mb-2">
          <span className="dex-span">Dex</span>
          <span className="lanka-span">Lanka</span>
        </h1>
        <p className="text-gray-300 text-base">Completing authentication...</p>
      </div>
    </div>
  );
};

export default AuthCallback;

