import React from "react";
import dayjs from "dayjs";

const InfoWindow = ({ handleClose, item }) => {
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={() => handleClose("info")}
    >
      <div
        className="bg-white rounded-lg shadow-xl w-[90%] md:w-[700px] max-h-[90vh] overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title */}
        <h2 className="text-2xl font-semibold mb-4">URL Information</h2>

        {/* General Details */}
        <h3 className="text-lg font-semibold mb-2">General Details:</h3>
        <ul className="border rounded-md divide-y">
          <li className="p-3">
            <p className="font-medium">Title</p>
            <p className="text-gray-600 break-all">{item.title}</p>
          </li>

          <li className="p-3">
            <p className="font-medium">Short URL</p>
            <p className="text-blue-600 break-all">{item.shortUrl}</p>
          </li>

          <li className="p-3">
            <p className="font-medium">Target URL</p>
            <p className="text-gray-600 break-all">{item.targetUrl}</p>
          </li>

          <li className="p-3">
            <p className="font-medium">Created At</p>
            <p className="text-gray-600">
              {dayjs(item.createdAt).format("MMMM D, YYYY h:mm A")}
            </p>
          </li>

          <li className="p-3">
            <p className="font-medium">Updated At</p>
            <p className="text-gray-600">
              {dayjs(item.updatedAt).format("MMMM D, YYYY h:mm A")}
            </p>
          </li>
        </ul>

        {/* Visit History */}
        <h3 className="text-lg font-semibold mt-6 mb-2">Visit History:</h3>

        {item.visitHistory.length > 0 ? (
          <ul className="border rounded-md divide-y">
            {item.visitHistory.map((visit, index) => (
              <li key={index} className="p-3">
                <p className="font-medium">Visit {index + 1}</p>
                <p className="text-gray-600">
                  {dayjs(visit).format("MMMM D, YYYY h:mm A")}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No visits recorded.</p>
        )}

        {/* Close Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={() => handleClose("info")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoWindow;
