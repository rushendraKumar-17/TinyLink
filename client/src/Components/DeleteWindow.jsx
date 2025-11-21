import React from "react";

const DeleteWindow = ({ handleClose, handleDelete, item }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={() => handleClose("delete")}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-[90%] sm:w-[400px] p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title */}
        <h2 className="text-xl font-semibold">Confirm Deletion</h2>

        {/* Content */}
        <p className="text-gray-700 mt-3">
          Are you sure you want to delete the following URL?
        </p>

        <p className="text-gray-500 text-sm mt-2 break-all">{item.shortUrl}</p>

        {/* Actions */}
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={() => handleClose("delete")}
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              handleDelete(item._id);
              handleClose("delete");
            }}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteWindow;
