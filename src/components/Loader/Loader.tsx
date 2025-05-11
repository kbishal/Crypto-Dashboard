const Loader = () => {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="h-6 w-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <span className="ml-3 text-sm text-gray-600 dark:text-gray-300">Loading...</span>
    </div>
  );
};

export default Loader;
