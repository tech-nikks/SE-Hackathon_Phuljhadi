import React, { useRef, useState } from "react";
import axios from "axios";

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
      <video ref={videoRef} autoPlay></video>
      <button onClick={getWebcam}>Start Webcam</button>
      <button onClick={captureImage}>Capture Image</button>
      <button onClick={sendImageData}>Send Image</button>
    </div>
  );
};

export default ImageUploader;
