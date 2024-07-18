// src/components/Profile.tsx
import React, { useState } from 'react';
import axios from 'axios';

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profileUrl, setProfileUrl] = useState('');

  const handleScrapeProfile = async () => {
    try {
      const response = await axios.get('http://localhost:4000/linkedin-scraper/profile', {
        params: { username, password, profileUrl },
      });
      console.log(username);
      console.log(password);
      console.log(profileUrl);
      console.log(response.data);

      
      setProfile(response.data);
    } catch (error) {
      console.error('Failed to scrape profile:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">LinkedIn Profile Scraper</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="LinkedIn Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="LinkedIn Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="LinkedIn Profile URL"
            value={profileUrl}
            onChange={(e) => setProfileUrl(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <button
          onClick={handleScrapeProfile}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Scrape Profile
        </button>
        {profile && (
          <div className="mt-6 text-center">
            <h2 className="text-xl font-semibold">{profile.name}</h2>
            <p className="text-blue-500">{profile.profileUrl}</p>
            <img
              src={profile.photoUrl}
              alt="Profile"
              className="mt-4 mx-auto rounded-full w-32 h-32 object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
