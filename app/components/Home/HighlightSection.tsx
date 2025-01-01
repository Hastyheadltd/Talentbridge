import React from "react";
import { FaPlay } from "react-icons/fa";
import { RiDoubleQuotesL } from "react-icons/ri";
const HighlightSection = () => {
  return (
    <div
      className="relative w-full my-11  h-[400px] flex items-center justify-center text-white">
        <div className="h-[400px] absolute inset-0 overflow-hidden w-full bg-fixed ">
        <img src="/banner.png" alt=" w-full h-[400px] " />
        </div>
      <div className="absolute inset-0 bg-black/60 bg-fixed">
  
      </div> 
      <div className="relative z-10 text-center max-w-3xl">
          <div className="text-blue-500 text-5xl mb-3">
                          <RiDoubleQuotesL/>
                        </div>
        <div className="text-3xl font-semibold mb-4 text-gray-200">
       
          We&#39;re known as a high-skilled marketplace, and we see an acute pain
          point within that area.
        </div>
        <div className="flex items-center justify-center space-x-3 mt-4">
         
        </div>
        <div className="flex items-center justify-center mt-6">
          <button className="flex items-center space-x-2 px-5 py-2 bg-primary text-white rounded-full hover:bg-blue-600 transition duration-300">
            <FaPlay className="text-sm" />
            <span>Watch the video</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HighlightSection;
