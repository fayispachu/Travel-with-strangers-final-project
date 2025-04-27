import { createContext, useState, useEffect } from "react";

import axios from "axios";
export const AgencyContext = createContext();

export const AgencyDetailsProvider = ({ children }) => {
  const [profile, setProfile] = useState("");
  const [agency, setAgency] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filteredAgency, setFilteredAgency] = useState([]);
  const [searchAgency, setSearchAgency] = useState("");

  const token = localStorage.getItem("token");

  const getAgencies = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/agency?name=${searchAgency}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setFilteredAgency(data.agency);
      console.log(data.agency, "Fetched agencies");
    } catch (error) {
      console.log(error, "Error fetching agencies");
      setFilteredAgency([]);
    }
  };

  const checkAgency = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/agency/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (data.agency) {
        setAgency(data.agency);
      }
      console.log(data.agency, "Agency profile fetched");
    } catch (error) {
      console.log(error, "errror from user check faild");
      setAgency(null);
    } finally {
      setLoading(false);
    }
  };

  const setProfilepic = async (e) => {
    const image = e.target.files[0];
    if (!image) return alert("Please select an image.");

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "Trip_plan_imges");

    try {
      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/dtcjm5qss/image/upload",
        formData
      );

      if (!data.secure_url) {
        alert("Image upload failed, no URL received");
        return;
      }

      const imageUrl = data.secure_url;
      setProfile(imageUrl);

      const token = localStorage.getItem("token");

      const res = await axios.put(
        "http://localhost:4000/api/agency/update/profile",
        { profilepic: imageUrl },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.data.success) {
        alert("Profile update failed");
        return;
      }

      await checkAgency();
      alert("Profile updated successfully");
    } catch (error) {
      alert("Profile upload failed");
      console.log(error, "Error uploading profile");
    }
  };

  useEffect(() => {
    checkAgency();
    getAgencies();
  }, []);

  return (
    <AgencyContext.Provider
      value={{
        agency,
        setAgency,
        profile,
        setProfilepic,
        setProfile,
        loading,
        searchAgency,
        setSearchAgency,
        filteredAgency,
        checkAgency,
      }}
    >
      {children}
    </AgencyContext.Provider>
  );
};
