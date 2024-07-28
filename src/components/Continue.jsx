import React, { useState } from 'react';
import ModalUpdatePassword from './ModalUpdatePassword';
import ModalDeactivateUser from './ModalDeactivateUser';

const Continue = () => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);

  return (
    <div className="flex flex-col m-2 rounded-xl w-full max-w-2xl text-white">
      <div className="bg-customBackground1 rounded-xl overflow-hidden shadow-lg w-full p-6">
        <div className="p-6 bg-gray-700 rounded-md">
          <h2 className="text-lg font-bold mb-2">Password and Authentication</h2>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-400">
                Wanna change the password cause you may be bored of the old one, right? It's fine, we've got you!
              </p>
              <div className="flex space-x-2 mt-2">
                <button
                  className="bg-blue-500 px-4 py-2 rounded text-sm"
                  onClick={() => setIsPasswordModalOpen(true)}
                >
                  Change Password
                </button>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold mb-1">Account Status</h2>
              <p className="text-xs text-gray-400">
                Deactivating your account means you don't want to show your profile to others for some time, but it will save your data. Deleting the account will permanently delete all of your data.
              </p>
              <div className="flex space-x-2 mt-2">
                <button
                  className="bg-red-600 px-4 py-2 rounded text-sm"
                  onClick={() => setIsDeactivateModalOpen(true)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalUpdatePassword isOpen={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)} />
      <ModalDeactivateUser isOpen={isDeactivateModalOpen} onClose={() => setIsDeactivateModalOpen(false)} />
    </div>
  );
};

export default Continue;
