import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { X } from 'lucide-react';

const Profile = ({userdata, onClose }) => {

  const [userData, setUserData] = useState(userdata);

  const navigate = useNavigate();
  const location = useLocation();
  const baseURL = 'http://127.0.0.1:8000';

  const handleAccountSettings = () => {
    navigate('/myAccount');
  };
  console.log("this is from profile: ", userData);
  console.log(userData.profile_pic)
  const isAccountPage = location.pathname === '/myAccount';

  return (
    <div className="relative max-w-sm left-4 mx-auto bg-customBackground2 rounded-lg overflow-hidden shadow-lg my-5 border-1 border border-gray-500">
      <div className="relative bg-logoColour3 h-20">
        <button
          className="absolute top-2 right-2 text-white hover:text-gray-300 rounded-full"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        <div className="absolute -bottom-10 left-4">
          <img
            className="w-20 h-20 rounded-full"
            src={userData.profile_pic}
            alt={`profilepic`}
          />
        </div>
      </div>
      <div className="mt-5 p-4">
        <div className="mt-4">
          <h2 className="text-gray-400 text-sm font-bold">Username</h2>
          <h1 className="text-xl text-logoColour2"> <Link to={`/user/${userData.username}`}>@{userData.username}</Link></h1>
        </div>
        <div className="mt-4">
          <h2 className="text-gray-400 text-sm font-bold">Bio</h2>
          <p className="text-gray-100 text-sm mt-1">{userData.bio || "Hey Everyone!, I'm new here and exploring the community. 😊" }</p>
        </div>
        <div className="mt-4">
          <button
            className={`w-full text-left ${isAccountPage ? 'text-gray-200' : 'text-gray-400 hover:text-logoColour3'} mt-2`}
            onClick={handleAccountSettings}
          >
            Account Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;


//the image was nnot coming directly from the data, so i craeted a baseurl, and then used it , The issue is likely due to the fact that the image path provided by the backend is relative, and the browser needs an absolute URL to correctly load the image.