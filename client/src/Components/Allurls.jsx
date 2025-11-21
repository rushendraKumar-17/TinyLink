import React, { useContext, useEffect, useState } from "react";
import AppContext from "../Context/context.jsx";
import axios from "axios";
import { Copy, Trash2 } from "lucide-react";
import InfoWindow from "./InfoWindow.jsx";
import DeleteWindow from "./DeleteWindow.jsx";
import Landing from "./Landing.jsx";
import Modal from "./Modal.jsx";
import { useNavigate } from "react-router-dom";

const Allurls = () => {
  const [urls, setUrls] = useState(null);
  const [copiedIndex, setCopiedIndex] = useState(-1);
  const token = localStorage.getItem("token");
  const [selected, setSelected] = useState();
  const [deleteWindow, setDeleteWindow] = useState();
  const [infoWindow, setInfoWindow] = useState();
  const [openNewUrl, setOpenNewUrl] = useState(false);
  const navigate = useNavigate();
  const { logged, apiUrl, setMessage, setAlertType, setOpen, user } =
    useContext(AppContext);

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  useEffect(() => {
    axios
      .get(`${apiUrl}/api/links`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data.urls)
        if (res.status === 200) {
          setUrls(res.data.urls);
        }
      })
      .catch((e) => {
        setAlertType("error");
        setMessage(e.data?.message || "Something went wrong");
        setOpen(true);
      });
  }, []);
  
  const handleClose = (option) => {
    option === "info" ? setInfoWindow(false) : setDeleteWindow(false);
  };

  const handleDelete = (id) => {
    axios
      .delete(`${apiUrl}/api/links/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        axios
          .get(`${apiUrl}/api/links`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((re) => {
            if (re.status === 200) {
              setAlertType("success");
              setMessage("Url deleted...");
              setOpen(true);
            }
            setUrls(re.data.urls);
          })
          .catch((er) => {
            setAlertType("error");
            setMessage(er.data?.message);
            setOpen(true);
          });
      })
      .catch((e) => console.log(e));
  };

  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
      setAlertType("success");
      setMessage("Copied to clipboard");
      setOpen(true);
    });
  };

  const handleSelectLink = (e)=>{
    console.log(e)
    console.log(e.short);
    navigate("/code/"+e.shortUrl,{
      state:{
        e
      }
    })
  }
  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <Landing />
      {logged ? (
        <div className="p-8 text-center w-screen">
          <h1 className="text-3xl font-semibold mb-6">Your URLs</h1>

          {urls && urls.length > 0 ? (
            <div className="overflow-x-auto mt-6">
           
              <table className="min-w-full border  shadow-sm">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Title</th>
                    <th className="px-4 py-3 font-semibold">Target URL</th>
                    <th className="px-4 py-3 font-semibold">Short URL</th>
                    <th className="px-4 py-3 font-semibold">Total Clicks</th>
                    <th className="px-4 py-3 font-semibold">Created</th>
                    <th className="px-4 py-3 font-semibold">Last Clicked</th>

                    <th className="px-4 py-3 font-semibold text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
              
                <tbody>
                  {urls.map((item) => (
                    <tr key={item._id} className="hover:bg-gray-50 transition" onClick={(e)=>{
                      setSelected(item)
                      handleSelectLink(item)}}>
                      {/* Title */}
                      <td className="py-3 px-4 border" >
                        {item.title || "Untitled"}
                      </td>

                      {/* Target URL */}
                      <td className="py-3 px-4 border text-blue-600 underline">
                        <a href={item.targetUrl} target="_blank">
                          {item.targetUrl}
                        </a>
                      </td>

                      {/* Short URL */}
                      <td className="py-3 px-4 border flex items-center gap-2">
                        {item.shortUrl}
                        <Copy
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(item.shortUrl)}}
                          className="cursor-pointer"
                        />
                      </td>

                      {/* Total Clicks */}
                      <td className="py-3 px-4 border text-center">
                        {item.visitHistory.length}
                      </td>

                      {/* Created */}
                      <td className="py-3 px-4 border">
                        {formatDate(item.createdAt)}
                      </td>
                      <td className="py-3 px-4 border">
                       {item.visitHistory.length > 0 ? item.visitHistory[item.visitHistory.length-1]: "Not clicked yet"}
                      </td>
                      {/* Actions */}
                      <td className="py-3 px-4 border text-center">
                        <Trash2
                          className="text-red-600 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelected(item);
                            setDeleteWindow(true);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <h2 className="text-xl text-gray-500 mt-4">No URLs available.</h2>
          )}

          {infoWindow && (
            <InfoWindow handleClose={handleClose} item={selected} />
          )}
          {deleteWindow && (
            <DeleteWindow
              handleDelete={handleDelete}
              item={selected}
              handleClose={handleClose}
            />
          )}
          <button
            onClick={() => setOpenNewUrl(true)}
            className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 
             text-white px-5 py-3 rounded-full shadow-lg transition-all"
          >
            Create New Short URL
          </button>
          {openNewUrl && (
            <Modal handleClose={() => setOpenNewUrl(false)}></Modal>
          )}
        </div>
      ) : (
        <div className="p-5 text-center mt-10 w-[60vw] mx-auto">
          <h2 className="text-2xl font-semibold">Please login to continue</h2>
        </div>
      )}
    </div>
  );
};

export default Allurls;
