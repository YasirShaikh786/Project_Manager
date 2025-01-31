import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfileInfo = ({ onSaveProfile }) => {
  const [userName, setUserName] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [designation, setDesignation] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Load profile data if it exists
    const profile = JSON.parse(localStorage.getItem("profile"));
    if (profile) {
      setUserName(profile.userName);
      setCollegeName(profile.collegeName);
      setDesignation(profile.designation);
      setPhoneNo(profile.phoneNo);
      setGender(profile.gender);
      setNationality(profile.nationality);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const profileData = {
      userName,
      collegeName,
      designation,
      phoneNo,
      gender,
      nationality,
    };
    localStorage.setItem("profile", JSON.stringify(profileData));
    onSaveProfile(profileData);
    navigate("/home"); // Redirect to home page after saving profile
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url('https://res.cloudinary.com/dre9wtsg5/image/upload/v1738259932/jubal-kenneth-bernal-uvdhVGaeem4-unsplash_a3make.jpg')`,
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg bg-opacity-90">
        <h2 className="text-2xl font-bold mb-6 text-center">Profile Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">User Name</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">College Name</label>
              <input
                type="text"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Designation</label>
              <input
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone No</label>
              <input
                type="text"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
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
              <label className="block text-sm font-medium mb-2">Nationality</label>
              <input
                type="text"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileInfo;