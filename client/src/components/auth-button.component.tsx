import Image from "next/image";

import googleLogo from "/public/image/google.png";

const GoogleAuthButton = () => {
  const handleClick = () => {
    console.log("google auth clicked");
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

export { GoogleAuthButton };
