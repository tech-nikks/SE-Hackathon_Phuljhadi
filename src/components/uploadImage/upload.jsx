import React, {
  useRef,
  useState,
} from 'react';

import axios from 'axios';

import {
  CameraAlt,
  PhotoCamera,
  Send,
} from '@mui/icons-material';
import { Fab } from '@mui/material';

const ImageUploader = () => {
  const videoRef = useRef(null);
  const [imageData, setImageData] = useState(null);

  // Function to access webcam
  const getWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  // Function to capture image
  const captureImage = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas
      .getContext("2d")
      .drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const base64Data = canvas.toDataURL("image/png");
    setImageData(base64Data);
    console.log(base64Data);
  };

  // Function to send image data to server
  const sendImageData = async () => {
    try {
      console.log(imageData);
      const response = await axios.post("http://localhost:8000/image", {
        imageData,
      });
      console.log("Response from server:", response.data);
    } catch (error) {
      console.error("Error sending image data:", error);
    }
  };

  return (
    <div>
      <video ref={videoRef} autoPlay style={{ width: "100%", height: "auto" }}></video>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Fab color="primary" aria-label="start-webcam" onClick={getWebcam}>
          <CameraAlt />
        </Fab>
        <Fab color="secondary" aria-label="capture-image" onClick={captureImage}>
          <PhotoCamera />
        </Fab>
        <Fab color="success" aria-label="send-image" onClick={sendImageData}>
          <Send />
        </Fab>
      </div>
    </div>
  );
};

export default ImageUploader;
