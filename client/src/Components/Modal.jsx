import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../Context/context";

const Modal = ({ handleClose }) => {
  const { apiUrl, setAlertType, setMessage, setOpen } = useContext(AppContext);

  const token = localStorage.getItem("token");

  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [urlError, setUrlError] = useState("");
  const [shortCodeError, setShortCodeError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // URL validation
  const validateUrl = (value) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };

  const handleUrlChange = (e) => {
    const value = e.target.value;
    setUrl(value);

    if (!validateUrl(value)) {
      setUrlError("Please enter a valid URL (ex: https://example.com)");
    } else {
      setUrlError("");
    }
  };

  const handleShortCodeChange = (e) => {
    const value = e.target.value;
    setShortCode(value);

    if (value && value.length < 6) {
      setShortCodeError("Short code must be at least 6 characters long");
    } else if(value && value.length>8){
      setShortCodeError("Short code must be less than 8 characters");
    }
    else {
      setShortCodeError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateUrl(url)) {
      setUrlError("Invalid URL. Cannot submit.");
      return;
    }

    if (shortCode && shortCode.length < 6) {
      setShortCodeError("Short code must be at least 8 characters long");
      return;
    }
    else if(shortCode && shortCode.length > 8){
      setShortCodeError("Short code must be less than characters long");
      return;
    }

    setLoading(true);

    const data = {
      url,
      title,
      shortCode: shortCode.trim() || undefined,
    };

    axios
      .post(`${apiUrl}/api/links`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.status === 201) {
          setAlertType("success");
          setMessage("Short URL generated...");
          setOpen(true);

          setUrl("");
          setTitle("");
          setShortCode("");

          handleClose();
        }
      })
      .catch((e) => {
        setAlertType("error");
        setMessage(e.response?.data?.message || "Error occurred");
        setOpen(true);
        
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-md relative animate-fadeIn">

        <button
          onClick={handleClose}
          disabled={loading}
          className="absolute top-3 right-3 text-gray-500 hover:text-black text-2xl"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-center mb-5 mt-2">
          Create a Link
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* URL */}
          <div>
            <input
              type="text"
              placeholder="Destination URL"
              value={url}
              onChange={handleUrlChange}
              required
              disabled={loading}
              className={`w-full border rounded-lg p-3 focus:ring-2 focus:outline-none ${
                urlError
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />

            {urlError && (
              <p className="text-red-600 text-sm mt-1">{urlError}</p>
            )}
          </div>

          {/* Title */}
          <input
            type="text"
            placeholder="Title (Optional)"
            value={title}
            disabled={loading}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          {/* Short Code */}
          <div>
            <input
              type="text"
              placeholder="Short Code (Optional) ex: mylink123"
              value={shortCode}
              onChange={handleShortCodeChange}
              disabled={loading}
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />

            {shortCodeError && (
              <p className="text-red-600 text-sm mt-1">{shortCodeError}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-3 rounded-lg font-semibold transition 
             ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
            `}
          >
            {loading ? "Generating..." : "Generate Link"}
          </button>
        </form>

      </div>
    </div>
  );
};

export default Modal;
