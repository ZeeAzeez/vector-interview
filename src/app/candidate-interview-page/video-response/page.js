"use client";

import { useState, useRef, useEffect } from "react";

export default function VideoInterview() {
  const [recording, setRecording] = useState(false);
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [error, setError] = useState(null);
  const [isCameraStarted, setIsCameraStarted] = useState(false); // Track if the camera is started
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);

  // Start camera and video preview
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraStarted(true); // Mark camera as started
      setError(null);
    } catch (error) {
      console.error("Error accessing camera:", error);
      setError(
        "Failed to access camera. Please ensure your camera and microphone are enabled and try again."
      );
    }
  };

  // Start recording
  const startRecording = () => {
    if (!videoRef.current?.srcObject) {
      setError("Please start the camera first.");
      return;
    }

    try {
      recordedChunksRef.current = [];
      const stream = videoRef.current.srcObject;
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: "video/webm",
      });

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, {
          type: "video/webm",
        });
        setRecordedVideo(URL.createObjectURL(blob));
        setError(null);
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
      setError("Failed to start recording. Please try again.");
    }
  };

  // Stop recording
  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      try {
        mediaRecorderRef.current.stop();
        setRecording(false);
      } catch (error) {
        console.error("Error stopping recording:", error);
        setError("Failed to stop recording. Please try again.");
      }
    }
  };

  // Play recorded video
  const playRecordedVideo = () => {
    const recordedVideoElement = document.getElementById("recorded-video");
    if (recordedVideoElement) {
      recordedVideoElement.play();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col items-center justify-center p-8">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl w-1/2 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Video Interview
        </h1>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-6">
            {error}
          </div>
        )}

        {/* Video Preview */}
        <video
          ref={videoRef}
          autoPlay
          muted
          className="w-full h-100 bg-white-200 rounded-lg mb-8"
        ></video>

        {/* Recording Controls */}
        <div className="flex justify-center space-x-5 mb-8">
          <button
            onClick={startCamera}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
          >
            Start Camera
          </button>
          <button
            onClick={startRecording}
            disabled={!isCameraStarted || recording} // Disable if camera isn't started or already recording
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded disabled:bg-gray-300"
          >
            Start Recording
          </button>
          <button
            onClick={stopRecording}
            disabled={!recording}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded disabled:bg-gray-300"
          >
            Stop Recording
          </button>
        </div>

        {/* Recorded Video Playback */}
        {recordedVideo && (
          <div className="mt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Review Your Response
            </h2>
            <video
              id="recorded-video"
              src={recordedVideo}
              controls
              className="w-full h-100 bg-white-200 rounded-lg"
            ></video>
            <button
              onClick={playRecordedVideo}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded mt-4"
            >
              Play Video
            </button>
          </div>
        )}

        {/* Submit Button */}
        <div className="mt-8">
          <button
            onClick={() => alert("Video submitted!")}
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded"
          >
            Submit Video
          </button>
        </div>
      </div>
    </div>
  );
}
