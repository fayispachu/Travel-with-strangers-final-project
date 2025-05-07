import { createContext, useState } from "react";
import axios from "axios";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [postPopup, setPostPopup] = useState(false);

  const [postImage, setPostImage] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const handleAddImagePost = async (e) => {
    try {
      const image = e.target.files[0];
      if (!image) return console.log("poi image settkk");
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "Trip_plan_imges");
      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/dtcjm5qss/image/upload",
        formData
      );
      console.log(data.secure_url);
      console.log("image successs");

      setPostImage(data.secure_url);
    } catch (error) {
      console.log(error, "Error from adding image trip front");
    }
  };

  const handleCreatePost = async () => {
    if (!postImage || !postDescription) {
      console.log("All fields are required");
      return;
    }
    const createdpost = {
      image: postImage,

      postDescription,
    };
    const token = localStorage.getItem("token");
    try {
      // "http://192.168.29.195:4000/api/trip/createpost",

      const { data } = await axios.post(
        "http://localhost:4000/api/trip/createpost",
        createdpost,
        {
          headers: { Authorization: `Bearer ${token}` },
          "Content-Type": "application/json",
        }
      );
      console.log(data.newPost);
      setPostImage("");
      setPostDescription("");
      closePostPopup();
    } catch (error) {
      console.log(error, "Error from Creating post front");
    }
  };

  const openPostPopup = () => {
    console.log("its open working ");

    setPostPopup(true);
  };
  const closePostPopup = () => {
    console.log("its close working ");

    setPostPopup(false);
  };

  return (
    <PostContext.Provider
      value={{
        setPostImage,
        setPostDescription,
        openPostPopup,
        closePostPopup,
        handleAddImagePost,
        handleCreatePost,
        postPopup,
        postDescription,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
