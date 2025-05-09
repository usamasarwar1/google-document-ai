import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Upload.css";
import { storage, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);  
  const [user, setUser] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleDownload = () => {
    if (!downloadUrl) {
      toast("No file available for download.");
      return;
    }
    
    // Open the URL in a new tab
    window.open(downloadUrl, '_blank');
  };

  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      toast("Please upload a valid PDF file.");
      setFile(null);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "application/pdf",
    multiple: false,
  });

  const handleUpload = () => {
    if (!user) {
      toast("You must be logged in to upload files.");
      return;
    }

    if (file) {
      setLoading(true);  // Start loading
      const fileName = file.name.replace('.pdf', '');
      const storageRef = ref(storage, `pdfs/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        () => {
        },
        (error) => {
          toast("Upload failed: " + error.message);
          setLoading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            setFile(null);

            const functions = getFunctions();
            const processPDF = httpsCallable(functions, 'processPDF');
            processPDF({ 
              pdfUrl: downloadURL,
              fileName: fileName
            })
              .then((result) => {
                console.log('processPDF response:', result.data);
                setDownloadUrl(result.data.url);
                setLoading(false);
                toast.success('PDF converted successfully!');
              })
              .catch((error) => {
                toast.error('Error processing PDF:', error);
                setLoading(false);
              });
          });
        }
      );
    } else {
      toast("No file selected.");
    }
  };

  const handleDeselect = () => {
    setFile(null);
    setDownloadUrl(null);
  };

  return (
    <div className="upload-container">
      <ToastContainer />
      <div className="upload-card">
        <h2 className="upload-title">
          {loading ? "Processing please wait..." : "Upload PDF"}
        </h2>
        
        {!downloadUrl && !loading && (
          <>
            {!file && (
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <FaCloudUploadAlt className="upload-icon" />
                <p>Drag 'n' drop a PDF file here, or click to select one</p>
              </div>
            )}
            {file && (
              <div className="file-info">
                <p className="file-name">Selected File: {file.name}</p>
                <button style={{marginBottom:"6px"}} className="deselect-button" onClick={handleDeselect}>X</button>
              </div>
            )}
            <button onClick={handleUpload} className="upload-button" disabled={loading}>
              {loading ? "Please wait..." : "Convert"}
            </button>
          </>
        )}

        {loading && <div className="spinner"></div>}
        
        {downloadUrl && (
          <>
            <p className="success-message">Conversion complete!</p>
            <button onClick={handleDownload} className="download-button">
              Download Excel
            </button>
            <button onClick={() => {
              setDownloadUrl(null);
              setFile(null);
            }} className="new-upload-button">
              Convert Another File
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Upload;