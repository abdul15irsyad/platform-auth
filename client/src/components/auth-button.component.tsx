'use client';

import Image from 'next/image';

import googleLogo from '/public/image/google.png';
import githubLogo from '/public/image/github.png';
import { MouseEventHandler } from 'react';
import { signIn } from 'next-auth/react';
import { NEXT_PUBLIC_GOOGLE_CALLBACK_URL } from '@/configs/auth.config';

const GoogleAuthButton = () => {
  const handleClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    const signInResponse = await signIn('google', {
      callbackUrl: NEXT_PUBLIC_GOOGLE_CALLBACK_URL,
    });
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-full flex items-center font-medium justify-center px-5 py-2.5 transition-colors duration-300 bg-white text-gray-700 rounded-lg focus:shadow-outline hover:bg-gray-300"
    >
      <Image src={googleLogo} alt="Google Logo" width={20} height={20} />
      <span className="ml-3">Continue with Google</span>
    </button>
  );
};

const GithubAuthButton = () => {
  const handleClick = () => {
    console.log('github auth clicked');
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-full flex items-center font-medium justify-center px-5 py-2.5 transition-colors duration-300 bg-white text-gray-700 rounded-lg focus:shadow-outline hover:bg-gray-300"
    >
      <Image src={githubLogo} alt="Github Logo" width={20} height={20} />
      <span className="ml-3">Continue with Github</span>
    </button>
  );
};

export { GoogleAuthButton, GithubAuthButton };
