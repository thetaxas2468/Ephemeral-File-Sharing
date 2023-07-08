import React, { useState } from "react";
import axios from "axios";
import "./componentsCSS/FileSharing.css";
import { Link } from "react-router-dom";

function FileSharing() {
  const [file, setFile] = useState(null);
  const [retentionTime, setRetentionTime] = useState(1);
  const [sharableURL, setSharableURL] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleRetentionChange = (e) => {
    setRetentionTime(e.target.value);
  };

  const handleSubmit = async () => {
    if (!file || retentionTime <= 0) {
      setError("Please check your inputs again with the right requirments!");
    } else {
      setError("");
      setIsCopied(false);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("retentionTime", retentionTime);
      try {
        const response = await axios.put(
          "http://localhost:5000/v1/file",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setSharableURL(response.data.url);
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const handleCopyURL = () => {
    navigator.clipboard.writeText(sharableURL);
    setIsCopied(true);
  };

const MemeIdSub = sharableURL.substring(4, sharableURL.length);

  return (
    <div>
      <div
        className="d-flex justify-content-center align-items-center flex-column w-100 h-100"
        style={{ minHeight: "100vh" }}
      >
        <div className="d-flex justify-content-center m-5 flex-column">
          <span className="span-text">Please drop your file:</span>
          <input
            type="file"
            onChange={handleFileChange}
            className="file-drop mb-5 border"
          />
          <span className="span-text">
            Please put your expiration date from now in minutes:
          </span>
          <input
            type="number"
            value={retentionTime}
            className="retention-time border"
            onChange={handleRetentionChange}
          />
        </div>
        <div>
          <button
            onClick={handleSubmit}
            className="file-submit-button addition"
          >
            Upload
          </button>
        </div>
        {sharableURL && (
          <div>
            <p>Sharable URL: {sharableURL}</p>
            <button onClick={handleCopyURL}>
              {isCopied ? "Copied!" : "Copy to Clipboard"}
            </button>
            
            <div>
                <Link className="file-submit-button addition mt-5"
                    to={MemeIdSub}
                    state={{ MemeId: MemeIdSub }}
                >
                    Show the meme
                </Link>
            </div>

            
          </div>
        )}
        <div style={{ textAlign: "center", color: "red" }}>{error}</div>
      </div>
    </div>
  );
}

export default FileSharing;
