import React from "react";
import { useLocation } from "react-router-dom";

const InfoWindow = () => {
  const { state } = useLocation();  // 👈 received data

  const item = state.e || {};         // safety

  return (
    <div className="p-6 bg-white shadow-md rounded-md w-[60vw] mx-auto mt-10">
      
      <h2 className="text-2xl font-semibold mb-4">URL Details</h2>

      <p className="mb-2">
        <strong>Title:</strong> {item.title}
      </p>

      <p className="mb-2">
        <strong>Short Code:</strong> {item.shortUrl}
      </p>

      <p className="mb-2">
        <strong>Short URL:</strong>{" "}
        {`/${item.shortUrl}`}
      </p>

      <p className="mb-2">
        <strong>Target URL:</strong>{" "}
        <a href={item.targetUrl} className="text-blue-600 underline">
          {item.targetUrl}
        </a>
      </p>

      <p className="mb-2">
        <strong>Created At:</strong>{" "}
        {new Date(item.createdAt).toLocaleString()}
      </p>

      {/* <p className="mb-2">
        <strong>Last Updated:</strong>{" "}
        {new Date(item.updatedAt).toLocaleString()}
      </p> */}

      <p className="mb-4">
        <strong>Total Clicks:</strong> {item.visitHistory.length}
      </p>

      <h3 className="text-xl font-bold mt-4 mb-2">Visit History:</h3>

      {/* visitHistory is an array of timestamps */}
      {item.visitHistory.length === 0 ? (
        <p className="text-gray-500">No visits yet.</p>
      ) : (
        <ul className="list-disc pl-6">
          {item.visitHistory.map((ts, index) => (
        <li key={index} className="mb-1">
          {new Date(ts).toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </li>
      ))}
        </ul>
      )}
    </div>
  );
};

export default InfoWindow;
