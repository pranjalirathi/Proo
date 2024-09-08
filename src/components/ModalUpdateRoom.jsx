import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ModalUpdateRoom = ({ roomId, isOpen, onClose, roomDetails, onRoomUpdateSuccess }) => {
    const [roomName, setRoomName] = useState('');
    const [limit, setLimit] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        if(roomDetails){
            setRoomName(roomDetails.name || '');
            setLimit(roomDetails.limit || '');
            setDescription(roomDetails.description || '');
        }
    }, [roomDetails]);

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const data = {
            name: roomName,
            limit,
            description,
        };
    
        const token = localStorage.getItem('access_token'); 
        if (!token) {
            setError('No access token found');
            return;
        }
    
        axios.patch(
            `http://127.0.0.1:8000/api/update_room/${roomId}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        .then(response => {
            if (response.status === 200) {
                // setSuccess('Room updated successfully!');
                setError(null);
                // onRoomUpdate(response.data);
                onClose(); 
                if (onRoomUpdateSuccess) {
                    onRoomUpdateSuccess('Room updated successfully!'); 
                  }
                // setSuccess(null);
            }
        })
        .catch(error => {
            if (error.response) {
                console.error('Error response:', error.response.data);
                setError(error.response.data.detail || 'Failed to update room. Please try again.');
            } else {
                console.error('Error:', error);
                setError('An unexpected error occurred');
            }
            setSuccess(null);
        });
    };
    
    

    if (!isOpen) return null;

    return (
        <div
            id="crud-modal"
            tabIndex="-1"
            aria-hidden="true"
            className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto overflow-x-hidden w-full md:inset-0 max-h-full"
            style={{backgroundColor: 'rgb(17,18,22, 0.83)'}}
        >
            <div className="relative p-4 w-full max-w-md max-h-full">
                {/* Modal content */}
                <div className=" border bg-opacity-85 border-gray-400 p-3 w-full max-w-md max-h-full bg-gray-700 rounded-xl">
                    {/* Modal header */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
                        <h3 className="text-xl font-medium text-white">
                            Update Room Details
                        </h3>
                        <button
                            type="button"
                            className="text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white"
                            onClick={onClose}
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/* Modal body */}
                    <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                        <div className="grid gap-4 mb-4 grid-cols-2">
                            <div className="col-span-2">
                                <label
                                    htmlFor="name"
                                    className="block mb-2 text-sm font-medium text-white"
                                >
                                    Room Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white "
                                    placeholder="Type room name"
                                    value={roomName}
                                    onChange={(e) => setRoomName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <label
                                    htmlFor="limit"
                                    className="block mb-2 text-sm font-medium text-white"
                                >
                                    Limit
                                </label>
                                <input
                                    type="number"
                                    name="limit"
                                    id="limit"
                                    className="text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                                    placeholder="100"
                                    value={limit}
                                    onChange={(e) => setLimit(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="col-span-2">
                                <label
                                    htmlFor="description"
                                    className="block mb-2 text-sm font-medium text-white"
                                >
                                    Room Description
                                </label>
                                <textarea
                                    id="description"
                                    rows="4"
                                    className="text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                                    placeholder="Write room description here"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </div>
                        </div>
                        <button
                        type="submit"
                        className="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-800"
                        >
                        <svg
                            className="inline w-5 h-5 mr-2 -ml-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                        Update Room
                    </button>

                    </form>
                    {error && <p className="text-red-500 mt-4">{error}</p>}
                    {success && <p className="text-green-500 mt-4">{success}</p>}
                </div>
            </div>
        </div>
    );
}

export default ModalUpdateRoom;

