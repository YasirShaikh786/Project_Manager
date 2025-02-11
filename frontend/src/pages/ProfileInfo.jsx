import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProfileStore } from "../../services/api.js";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { updateProfile, fetchProfile,isLoading } = useProfileStore();
  const [profileData, setProfileData] = useState({
    username: "",
    collegeName: "",
    designation: "",
    phoneNo: "",
    gender: "",
    nationality: "",
  });

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const response = await fetchProfile();
        if (response.data) {
          setProfileData({
            username: response.data.username || "",
            collegeName: response.data.collegeName || "",
            designation: response.data.designation || "",
            phoneNo: response.data.phoneNo || "",
            gender: response.data.gender || "",
            nationality: response.data.nationality || "",
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    getProfileData();
  }, [fetchProfile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(profileData);
      toast.success("Profile updated successfully!");
      navigate("/home");
    } catch (error) {
      toast.error(error.message || "Failed to update profile");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/dre9wtsg5/image/upload/v1738259932/jubal-kenneth-bernal-uvdhVGaeem4-unsplash_a3make.jpg')`,
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg bg-opacity-90">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Profile Information
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Username</label>
              <input
                name="username"
                value={profileData.username}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                College Name
              </label>
              <input
                name="collegeName"
                value={profileData.collegeName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Designation
              </label>
              <input
                name="designation"
                value={profileData.designation}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone No</label>
              <input
                name="phoneNo"
                type="tel"
                value={profileData.phoneNo}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Gender</label>
              <select
                name="gender"
                value={profileData.gender} // Controlled component
                onChange={handleChange} // Ensure this is `onChange`
                className="w-full px-3 py-2 border rounded-lg"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Nationality
              </label>
              <input
                name="nationality"
                value={profileData.nationality}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
