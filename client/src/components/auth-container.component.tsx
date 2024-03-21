const AuthContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-white rounded-3xl shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-3 md:space-y-4 sm:p-8">{children}</div>
      </div>
    </div>
  );
};

export default AuthContainer;
