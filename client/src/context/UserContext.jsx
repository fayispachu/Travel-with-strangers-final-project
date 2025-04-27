import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();
export const UsersDetailsProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [profile, setProfile] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filteredUser, setFilteredUser] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const token = localStorage.getItem("token");

  const getUser = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/user/users?name=${searchUser}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers(data.users);
      setFilteredUser(data.users);
      console.log(data.users, "Get user axios log");
    } catch (error) {
      console.log(error, "errror from users dataaas check faild");
      setUsers([]);
    }
  };

  useEffect(() => {
    getUser();
  }, [searchUser]);

  function toggleSidebar() {
    setSidebarOpen((prev) => !prev);
    console.log("Sidebar is open");
  }

  const checkUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/user/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.doc) {
        setUser(data.doc);
      }
      console.log(data.doc, "check profile fetched");
    } catch (error) {
      console.log(error, "errror from user check faild");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const setProfilepic = async (e) => {
    const image = e.target.files[0];
    if (!image) return alert("poi image profile settkk");
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "Trip_plan_imges");
    try {
      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/dtcjm5qss/image/upload",
        formData
      );

      if (!data || !data.secure_url) {
        alert("Image upload faaaild .no url");
        return;
      }
      const imageUrl = data.secure_url;
      setProfile(imageUrl);
      if (!data) return alert("Data illada ponilla profile");
      console.log(data.secure_url);

      const token = localStorage.getItem("token");

      const res = await axios.put(
        `http://localhost:4000/api/user/update/profile`,
        { profilepic: imageUrl },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.data.success) {
        alert("Profile update faild");
        return;
      }

      setUser(res.data.data);

      await checkUser();
      alert("Profile updated");
    } catch (error) {
      alert("faild profile upload");
      console.log(error, "error from profilesetup frontend");
    }
  };

  useEffect(() => {
    checkUser();

    getUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        sidebarOpen,
        toggleSidebar,
        users,
        profile,
        setProfilepic,
        user,

        setUser,
        loading,
        checkUser,
        setSearchUser,
        filteredUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
