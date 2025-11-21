import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AppContext from "../Context/context";

const NewComponent = () => {
  const navigate = useNavigate();
  const { logged } = useContext(AppContext);

  return (
    <div className="w-full flex justify-center">
      {logged ? (
        <div className="w-1/2 flex flex-col items-center text-center p-6">
          {/* Buttons */}
          <div className="flex flex-row gap-4 mb-6 w-full justify-center">
            <button
              onClick={() => navigate("/home/new/newurl")}
              className="px-6 py-2 font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              New URL
            </button>

            <button
              onClick={() => navigate("/home/new/newqr")}
              className="px-6 py-2 font-semibold rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
            >
              New QR
            </button>
          </div>

          {/* Child Content */}
          <div className="w-full bg-gray-100 p-6 rounded-lg flex flex-col items-center">
            <Outlet />
          </div>
        </div>
      ) : (
        <div className="w-3/5 text-center p-8 mt-6">
          <h1 className="text-2xl font-semibold">Please login to continue</h1>
        </div>
      )}
    </div>
  );
};

export default NewComponent;
