import { useEffect } from "react";

const Loader = () => {
  useEffect(() => {
    // Add cursor-wait class when the loader is mounted
    document.body.classList.add("cursor-wait");

    // Clean up by removing the class when the loader is unmounted
    return () => {
      document.body.classList.remove("cursor-wait");
    };
  }, []);

  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent "></div>
    </div>
  );
};

export default Loader;
