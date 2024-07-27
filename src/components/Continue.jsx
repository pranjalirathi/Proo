import React from 'react';

const Continue = () => {
  return (
    <div className="flex flex-col m-2 rounded-xl w-full max-w-2xl bg-customBackground2 text-white">
      <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg w-full p-6">
        <div className="p-6 bg-gray-900">
          <h2 className="text-lg font-bold mb-2">Password and Authentication</h2>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-500">
                Protect your account with an extra layer of security. Once configured, you'll be required to enter your password and complete one additional step in order to sign in.
              </p>
            <div className="flex space-x-2 mt-2">
                <button className="bg-blue-500 px-4 py-2 rounded text-sm ">Change Password</button>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold mb-1">Account Status</h2>
              <p className="text-xs text-gray-500">
                Disabling your account means you can recover it at any time after taking this action.
              </p>
              <div className="flex space-x-2 mt-2">
                <button className="border border-red-600 bg-gray-800 px-4 py-2 rounded text-sm ">Deactivate</button>
                <button className="bg-red-600 px-4 py-2 rounded text-sm">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Continue;


//  px-5 py-2 rounded w-full mt-2
