import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PublicUser = ({username}) => {

  const [userDetails, setUserDetails] = useState({
        username: '',
        bio: '',
        name: '',
        profile_pic: '',
        verified: false,
        rooms: [],
        joined_rooms_count: 0,
      });
    
      useEffect(() => {
        const fetchUserDetails = async () => {
          try {
            const token = localStorage.getItem('access_token');
            const response = await axios.get(`http://127.0.0.1:8000/api/user_public_details/${username}`, {
              headers: {
                'Authorization': `Bearer ${token}` 
              }
            });

            const userData = response.data.detail;
            if (!userData.bio) {
              userData.bio = "Hey Everyone!, I'm new here and exploring the community. 😊";
            }
            if (!userData.name) {
              userData.name = "Anonymous User";
            }
            if(!userData.rooms){
              userData.rooms = []
            }

            setUserDetails(userData);
            console.log(userData);
          } catch (error) {
            console.error('Error fetching the user details: ', error.reponse.data);
          }
        };
    
        fetchUserDetails();
      }, [username]);

  return (
    <div className="w-full mr-2 mt-2 mb-2 rounded-lg overflow-auto h-screen bg-customBackground2 custom-scrollbar">
      <div className="flex flex-wrap h-full w-full pr-0 pl-2 pt-2 pb-2 text-white relative">
        {/* User Section */}
        <div className="w-full md:w-1/5 p-4 flex-shrink-0">
          <div className="bg-customBackground2 p-0 sm:p-4 rounded h-full">
            <div className="flex flex-col items-center h-full">
              <div className="rounded-full bg-white h-24 w-24 mb-4">
              {userDetails.profile_pic && (
                  <img
                    src={userDetails.profile_pic}
                    alt="Profile"
                    className="h-24 w-24 rounded-full"
                  />
                )}
              </div>
              <div className="text-lg font-bold mb-1">{userDetails.name}</div>
              {/* Divider line */}
              <div className="w-full h-[1px] bg-gray-600 my-2"></div>
              <div className="text-lg mb-4">@{userDetails.username}</div>
              <div className="text-sm ">{userDetails.bio}</div>
            </div>
          </div>
          {/* User Section Ends */}
        </div>

        {/* Content Section */}
        <div className="w-full md:w-4/5 p-0 sm:p-4 flex-grow">
          <div className="flex flex-col space-y-4 h-full">
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">

              <div className="w-full md:w-1/2 p-4 rounded-2xl shadow text-black min-h-[100px] md:min-h-[150px] backdrop-blur backdrop-brightness-75 relative room-card">
                <div className="text-xl sm:text-5xl text-gray-200 pl-2"> Created</div>
                <div className='text-white mt-2 pt-4 text-7xl bottom-0 gradient-text pl-2'>{userDetails.rooms.length} <span className='text-2xl'>rooms</span></div>
                {/* <div className="absolute bottom-4 right-4 flex items-center justify-center">
                  <div className="circle relative">
                    <div className="stats">
                    </div>
                    <div className="wave absolute bottom-0 right-0"></div>
                  </div>
                </div> */}
              </div>

              
            {/* Joined Rooms Card */}
            <div className="w-full md:w-1/2 p-4 rounded-2xl shadow text-black min-h-[100px] md:min-h-[150px] backdrop-blur backdrop-brightness-75 relative room-card">
                <div className="text-xl sm:text-5xl text-gray-200 pl-2"> Joined</div>
                <div className='text-white mt-2 pt-4 text-7xl bottom-0 gradient-text pl-2'>{userDetails.joined_rooms_count} <span className='text-2xl'>rooms</span>
                </div>
            </div>
            {/* Join Room Card Ends */}

        </div>
        {/* Content Section Ends */}
            

            {/* Room List Section starts */}
            <div className="text-white rounded-2xl shadow flex-grow room-card">
              <div className="text-gray-200 text-center px-4 py-2 rounded-2xl">
                <div className="text-xl font-bold ">{userDetails.name} Rooms</div>
              </div>   
              <div className="w-full h-[1px] bg-gray-600 my-2"></div>
              <ul>
              {userDetails.rooms.length > 0 ? (
                  userDetails.rooms.map((room, index) => (
                    <div
                      key={room.id}
                      className={`flex justify-between items-center p-2 ${index !== userDetails.rooms.length - 1 ? 'border-b border-gray-600' : ''} rounded`}
                    >
                      <div className="flex items-center">
                        <img
                          src={room.room_pic}
                          className="rounded-full h-10 w-10"
                        />
                        <div className="ml-4">{room.name}</div>
                      </div>
                      <button className="w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-700 font-medium rounded-lg text-sm px-4 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        View
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-gray-400 flex justify-center items-center h-full">Oopsi! No rooms created till now.</div>
                )}
                </ul>
            </div>
            {/* Room Section Ends */}

          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicUser;

