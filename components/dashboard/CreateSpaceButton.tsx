import React from "react";

const CreateSpaceButton = () => {
  return (
    <button className="relative flex items-center justify-center w-full h-56 rounded-xl border border-slate-800 overflow-hidden bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-4 font-bold text-2xl sm:text-3xl md:text-4xl text-slate-400 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 shimmer-on-hover">
      <span className="relative z-10">Create Space</span>
    </button>
  );
};

export default CreateSpaceButton;
