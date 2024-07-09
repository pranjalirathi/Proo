import React, { useState } from 'react';
import Modal from './CreateRoomModal';

const RoomList = () => {
  const [showModal, setShowModal] = useState(false);

  const rooms = [
    { id: 1, name: 'Room 1', host: 'hostid1', members: 10, daysAgo: 3, type: 'Public' },
    { id: 2, name: 'Room 2', host: 'hostid2', members: 5, daysAgo: 2, type: 'Public' },
    { id: 3, name: 'Room 3', host: 'hostid3', members: 8, daysAgo: 1, type: 'Private' },
  ];

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="flex-1 flex-col h-screen w-full bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-bold">Rooms</h1>
        <button
          onClick={toggleModal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create a new room
        </button>
      </div>
      {rooms.map(room => (
        <div key={room.id} className="border border-gray-600 p-4 mb-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <div className="bg-gray-500 h-10 w-10 rounded-full flex items-center justify-center mr-3">
                {/* Placeholder for room logo */}
                <span className="text-xl font-bold">{room.name.charAt(0)}</span>
              </div>
              <div>
                <h2 className="text-lg font-bold">{room.name}</h2>
                <p className="text-sm text-gray-400">by @{room.host}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex items-center">
                {/* Placeholder for members display picture */}
                <div className="bg-gray-500 h-6 w-6 rounded-full flex items-center justify-center mr-2">
                  <span className="text-sm">{room.members}</span>
                </div>
                <span className="text-sm">members</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-400">{room.daysAgo} days ago</p>
            <div className="flex items-center">
              <span className={`text-sm mr-2 ${room.type === 'Public' ? 'text-green-400' : 'text-red-400'}`}>
                {room.type}
              </span>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded">
                Join
              </button>
            </div>
          </div>
        </div>
      ))}
      {showModal && <Modal onClose={toggleModal} />}
    </div>
  );
};

export default RoomList;
