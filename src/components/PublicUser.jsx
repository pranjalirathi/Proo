import React from 'react';

const PublicUser = () => {
  const dummyRooms = ["room title 1", "room title 2", "room title 3"];

  return (
    <div className="w-full mr-2 mt-2 mb-2 rounded-lg overflow-auto h-screen bg-customBackground2">
      <div className="flex flex-wrap h-full w-full p-4 bg-customBackground2 text-white">
        <div className="w-full md:w-1/5 p-4 flex-shrink-0">
          <div className="bg-customBackground1 p-4 rounded shadow h-full">
            <div className="flex flex-col items-center h-full">
              <div className="rounded-full bg-white h-24 w-24 mb-4"></div>
              <div className="text-lg font-bold">Name</div>
              <div className="text-sm ">Username</div>
              <div className="text-sm ">Bio</div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-4/5 p-4 flex-grow">
          <div className="flex flex-col space-y-4 h-full">
            <div className="flex space-x-4">
              <div className="w-1/2 bg-customBackground1 p-6 rounded shadow text-black min-h-[150px]">
                <div className="text-xl font-bold">Rooms</div>
                <div className="text-sm text-gray-600">5 created</div>
              </div>
              <div className="w-1/2 bg-white p-4 rounded shadow min-h-[150px]">
                <div className="text-lg font-bold">Member of</div>
                <div className="text-sm text-gray-600">4 rooms</div>
              </div>
            </div>
            <div className="bg-white p-4 rounded shadow flex-grow">
              <div className="text-lg font-bold mb-2">Rooms List</div>
              <ul className="space-y-2">
                {dummyRooms.map((room, index) => (
                  <li key={index} className="bg-gray-100 p-2 rounded">{room}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicUser;










// ------------------------------------------------------------------------------------------------
//   USER ACCOUNT
// 
//   ------------------------------       ------------------------       ------------------------
//   |                            |       |   Rooms              |       | Member of             |
//   |      circular dp           |       |                      |       |                       |
//   |----------------------------        |   5 created          |       |   4 rooms             |             
//   |                            |        -----------------------       -------------------------
//   |     name                   |      
//   |                            |       --------------------------------------------------------
//   |     username               |       |  room title                                          |
//   |                            |       |                                                      |
//   |     bio                    |       --------------------------------------------------------
//   |                            |       |  room title 2                                        |
//   |                            |       |                                                      |                                                   
//   |                            |       --------------------------------------------------------
//   ------------------------------       |  room title 3                                        |
//                                        |                                                      |
//                                        --------------------------------------------------------
//                                         | room title 4                                        |
//                                        |                                                      |
//                                         -------------------------------------------------------
//                                        | room title 5                                         |
//                                        |                                                      |
//                                        -------------------------------------------------------

// ---------------------------------------------------------------------------------------------------