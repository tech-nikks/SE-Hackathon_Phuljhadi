  import React, { useRef, useState } from "react";
  import axios from "axios";

  const ImageUploader = () => {
    const videoRef = useRef(null);
    const fileInputRef = useRef(null); // Reference for file input element
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

    // Function to capture image from webcam
    const captureImage = () => {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas
        .getContext("2d")
        .drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const base64Data = canvas.toDataURL("image/png");
      setImageData(base64Data);
    };

    // Function to handle file selection
    const handleFileInputChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageData(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };

    // Function to send image data to server
    const sendImageData = async () => {
      try {
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
        <input
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
        <button onClick={() => fileInputRef.current.click()}>Upload Image</button>
        <button onClick={sendImageData}>Send Image</button>
      </div>
    );
  };

  export default ImageUploader;
