import React from "react";
import { IoMdPlay } from "react-icons/io";
const HighlightSection = () => {
  return (
    <div
      className="relative w-full my-12  h-[435px] flex items-center  justify-center text-white">
        <div className="h-[435px] absolute inset-0 overflow-hidden rounded-[30px] w-full bg-fixed ">
        <img src="/images/banner.png" alt="img" className="w-full h-full object-cover" />
        </div>
      <div className="absolute inset-0 bg-black/60 bg-fixed rounded-[30px]">
  
      </div> 
      <div className="relative z-10 text-center ">
        
       
        <h1 className="text-[47px] text-center font-semibold">Watch our Demo to see how FlixRecruit works:</h1>
        
        <div className="flex items-center justify-center space-x-3 mt-4  h-[100px] mx-auto w-[100px] rounded-full bg-primary">
        <IoMdPlay className="text-4xl" />
        </div>
        <div className="flex items-center justify-center mt-6">
          <button className="flex items-center space-x-2 px-7 py-3 text-[18px] bg-primary text-white rounded-full hover:bg-blue-600 transition duration-300">
          
            <span>Watch The Video</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HighlightSection;
