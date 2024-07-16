// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Modal from './CreateRoomModal';

// const RoomList = () => {
//   const [rooms, setRooms] = useState([]);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     const fetchRooms = async () => {
//       try {
//         const response = await axios.get('http://127.0.0.1:8000/api/rooms');
//         if (response.data.detail && Array.isArray(response.data.detail)) {
//           setRooms(response.data.detail);
//         } else {
//           console.error('API response does not contain an array:', response.data);
//         }
//       } catch (error) {
//         console.error('Error fetching rooms:', error);
//       }
//     };

//     fetchRooms();
//   }, []);

//   const toggleModal = () => {
//     setShowModal(!showModal);
//   };

//   return (
//     <div className="w-full mr-2 mt-2 rounded-lg flex flex-col h-screen bg-customBackground2 text-white p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-lg font-bold">Rooms</h1>
//         <button
//           onClick={toggleModal}
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Create a new room
//         </button>
//       </div>
//       {rooms.length > 0 ? (
//         rooms.map(room => (
//           <div key={room.id} className="border border-gray-600 p-4 mb-4 rounded-lg bg-customBackground1">
//             <div className="flex flex-col sm:flex-row justify-between items-center mb-2">
//               <div className="flex items-center mb-2 sm:mb-0">
//                 <div className="bg-gray-500 h-10 w-10 rounded-full flex items-center justify-center mr-3">
//                   <span className="text-xl font-bold">{room.name.charAt(0)}</span>
//                 </div>
//                 <div>
//                   <h2 className="text-lg font-bold">{room.name}</h2>
//                   <p className="text-sm text-gray-400">by @{room.host}</p>
//                 </div>
//               </div>
//               <div className="flex items-center">
//                 <div className="flex items-center">
//                   <div className="bg-gray-500 h-6 w-6 rounded-full flex items-center justify-center mr-2">
//                     <span className="text-sm">{room.member_count}</span>
//                   </div>
//                   <span className="text-sm">members</span>
//                 </div>
//               </div>
//             </div>
//             <div className="flex flex-col sm:flex-row justify-between items-center">
//               <p className="text-sm text-gray-400">{new Date(room.created).toLocaleDateString()}</p>
//               <div className="flex items-center mt-2 sm:mt-0">
//                 <span className={`text-sm mr-2 ${room.is_public ? 'text-green-400' : 'text-red-400'}`}>
//                   {room.is_public ? 'Public' : 'Private'}
//                 </span>
//                 <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded">
//                   Join
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p>No rooms available</p>
//       )}
//       {showModal && <Modal onClose={toggleModal} />}
//     </div>
//   );
// };

// export default RoomList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './CreateRoomModal';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 650);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/rooms');
        if (response.data.detail && Array.isArray(response.data.detail)) {
          setRooms(response.data.detail);
        } else {
          console.error('API response does not contain an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();

    const handleResize = () => {
      setIsMobile(window.innerWidth < 650);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const truncateName = (name) => {
    if (name.length > 25) {
      return `${name.slice(0, 15)}...`;
    }
    return name;
  };

  return (
    <div className="w-full mr-2 mt-2 rounded-lg flex flex-col h-screen bg-customBackground2 text-white p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-bold sm:text-base">Rooms</h1>
        <button
          onClick={toggleModal}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded-3xl h-12 w-12 flex items-center justify-center transition duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
      {rooms.length > 0 ? (
        rooms.map(room => (
          <div key={room.id} className={`border border-gray-600 p-4 mb-4 rounded-lg bg-customBackground1 sm:p-3 sm:mb-3 ${isMobile ? 'p-2 mb-2' : ''}`}>
            <div className="flex flex-col sm:flex-row justify-between mb-2 sm:mb-1">
              <div className="flex items-center mb-2 sm:mb-0">
                <div className={`bg-gray-500 h-10 w-10 rounded-full flex items-center justify-center mr-3 sm:h-8 sm:w-8 sm:mr-2 ${isMobile ? 'h-8 w-8' : ''}`}>
                  <span className={`text-xl font-bold sm:text-lg ${isMobile ? 'text-lg' : ''}`}>{room.name.charAt(0)}</span>
                </div>
                <div>
                  <h2 className={`text-lg font-bold sm:text-base ${isMobile ? 'text-base' : ''}`}>{truncateName(room.name)}</h2>
                  <p className={`text-sm text-gray-400 sm:text-xs ${isMobile ? 'text-xs' : ''}`}>by @{room.host}</p>
                </div>
              </div>
              {!isMobile && (
                <div className="flex items-center">
                  <div className="flex items-center">
                    <div className="bg-gray-500 h-6 w-6 rounded-full flex items-center justify-center mr-2 sm:h-5 sm:w-5 sm:mr-1">
                      <span className="text-sm sm:text-xs">{room.member_count}</span>
                    </div>
                    <span className="text-sm sm:text-xs">members</span>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row justify-between sm:items-start">
              {!isMobile && (
                <p className="text-sm text-gray-400 sm:text-xs">{new Date(room.created).toLocaleDateString()}</p>
              )}
              <div className="flex items-center mt-2 sm:mt-0">
                <span className={`text-sm mr-2 ${room.is_public ? 'text-green-400' : 'text-red-400'} sm:text-xs ${isMobile ? 'text-xs' : ''}`}>
                  {room.is_public ? 'Public' : 'Private'}
                </span>
                <button className={`bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded sm:py-0.5 sm:px-2 sm:text-xs ${isMobile ? 'py-0.5 px-2 text-xs' : ''}`}>
                  Join
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm sm:text-xs">No rooms available</p>
      )}
      {showModal && <Modal onClose={toggleModal} />}
    </div>
  );
};

export default RoomList;

