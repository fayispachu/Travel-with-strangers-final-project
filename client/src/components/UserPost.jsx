import React, { useContext } from "react";
import plusicon from "../assets/plusicon.png";
import PostCreatePopup from "./PostCreatePopup";
import { PostContext } from "../context/UserPostContext";
function UserPost() {
  const { openPostPopup } = useContext(PostContext);

  return (
    <>
      <div className="md:flex hidden  bg-white h-[60vh]   justify-center gap-7  w-[100%] py-20 ">
        <PostCreatePopup />
        <div className=" w-[20%] bg-white h-[40vh]  rounded-md drop-shadow-xl gap-3 flex flex-col p-2  ">
          <div className="w-[100%] h-[100vh] bg-gray-300 flex items-center justify-center">
            <img
              onClick={openPostPopup}
              className=" relative "
              src={plusicon}
              alt=""
            />
          </div>
        </div>
      </div>{" "}
    </>
  );
}

export default UserPost;
