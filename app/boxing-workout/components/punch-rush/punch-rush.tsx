import React, { useRef, useEffect, useState } from "react";
import { Card, CardBody } from "@nextui-org/react";
import * as pose from "@mediapipe/pose";
import smoothLandmarks from "mediapipe-pose-smooth";
import * as cam from "@mediapipe/camera_utils";
import * as drawingUtils from "@mediapipe/drawing_utils";
import { animate, motion } from "framer-motion";

import "./workout-setup.css";

const goTextAnimation = {
  opacity: [1, 0, 1], // Alternate between visible and invisibl
  transition: {
    duration: 1, // Duration of one blink
    repeat: 100, // Repeat the animation 20 times
    repeatType: "loop", // Loop the animation
  },
};

export default function PunchRushRound({onRoundComplete, setTotalStrikes, totalStrikes}) {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const camera = useRef(null);
  const audioRef = useRef(null); // Ref for the audio element
  const soundEffectsRef = useRef(null); // Ref for the sound effects element
  const [didLoad, setDidLoad] = useState(false);
  const [videoSize, setVideoSize] = useState({ width: "34%", height: "15%" });
  const [outputWidth, setOutputWidth] = useState(480);
  const [outputHeight, setOutputHeight] = useState(480);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [allAudiosFinished, setAllAudiosFinished] = useState(false);
  const [showGoText, setShowGoText] = useState(false);
  const [jabCount, setJabCount] = useState(0); // State variable to track the number of jabs
  const [formattedTime, setFormattedTime] = useState("01:00");
  const [timer, setTimer] = useState(60000); // Start from 60,000 milliseconds (which is 60 seconds)
  const [textColor, setTextColor] = useState("green-500");

  useEffect(() => {
    // Only set up the interval if all audios have finished and the timer is greater than 0
    if (allAudiosFinished && timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => {
          const newTimer = prevTimer - 1000; // Decrement by 1000 milliseconds (1 second)
          if (newTimer <= 0) {
            clearInterval(intervalId); // Stop the interval
            onRoundComplete(); // Call the onRoundComplete function when the timer reaches 0
          }
          const { formatted, color } = formatTime(newTimer);
          setTextColor(color); // Set the color based on the remaining time
          setFormattedTime(formatted); // Update the formatted time
          return newTimer; // Return the new timer value to update the state
        });
      }, 1000); // Run every second
  
      return () => clearInterval(intervalId); // Cleanup interval on component unmount or when the timer stops
    }
  }, [allAudiosFinished, timer, setTimer, setFormattedTime, setTextColor, onRoundComplete]);
  

  // Function to format time in SS:MS
  const formatTime = (time) => {
    const seconds = Math.floor(time / 1000);
    const milliseconds = time % 1000;
    const formatted = `${seconds < 10 ? "0" : ""}${seconds}`;

    // Change color based on remaining time
    let color = "green-500";
    if (seconds <= 10) {
      color = "red-500";
    } else if (seconds <= 30) {
      color = "yellow-500";
    }

    return { formatted, color };
  };

  // Array of audio files
  const audioFiles = [
    "/punch_rush_donny.mp3",
  ];

  // Inside your component or function
  const rightWristInBoundary = useRef([false, false]);

  function processPoseLandmarks(results, audioRef) {
    if (!results.poseLandmarks) {
      return; // No landmarks detected
    }
  
    const leftWrist = results.poseLandmarks[15];
    const rightWrist = results.poseLandmarks[16];
  
    // Check for both wrists
    const wrists = [leftWrist, rightWrist];
    wrists.forEach((wrist, index) => {
      // Check if the wrist is currently in one of the boundary zones (first 5% or last 5% of the normalized range)
      const isInBoundaryZone =
        wrist.x <= 0.05 ||
        (wrist.x >= 0.95 && wrist.visibility > 0.5);
  
      if (isInBoundaryZone) {
        // If the wrist is in the boundary zone, mark it as such if it wasn't already
        if (!rightWristInBoundary.current[index]) {
          rightWristInBoundary.current[index] = true;
        }
      } else {
        // If the wrist is not in the boundary zone but was previously in, play the sound and reset the tracking
        if (rightWristInBoundary.current[index] && wrist.visibility > 0.5) {
          playJabSound(audioRef);
          rightWristInBoundary.current[index] = false;
          setJabCount((prevCount) => prevCount + 1); // Increment the jab count
          setTotalStrikes((prevStrikes) => prevStrikes + 1); // Increment the total strikes
        }
      }
    });
  }
  

  function playJabSound(audioRef) {
    if (audioRef.current && !audioRef.current.playing) {
      audioRef.current.currentTime = 0;
      audioRef.current
        .play()
        .catch((error) => console.error("Error playing jab sound:", error));
    }
  }

  function onResults(results) {
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );

    if (results.poseLandmarks) {
      
      drawPoseLandmarks(canvasCtx, results);
      processPoseLandmarks(results, soundEffectsRef);
    }
    canvasCtx.restore();
  }

  function drawPoseLandmarks(canvasCtx, results) {
    drawingUtils.drawConnectors(
      canvasCtx,
      results.poseLandmarks,
      pose.POSE_CONNECTIONS,
      {
        visibilityMin: 0.65,
        color: "white",
      }
    );
    drawingUtils.drawLandmarks(
      canvasCtx,
      getLandmarks(results, pose.POSE_LANDMARKS_LEFT),
      {
        visibilityMin: 0.65,
        color: "white",
        fillColor: "rgb(255,138,0)",
      }
    );
    drawingUtils.drawLandmarks(
      canvasCtx,
      getLandmarks(results, pose.POSE_LANDMARKS_RIGHT),
      {
        visibilityMin: 0.65,
        color: "white",
        fillColor: "rgb(0,217,231)",
      }
    );
    drawingUtils.drawLandmarks(
      canvasCtx,
      getLandmarks(results, pose.POSE_LANDMARKS_NEUTRAL),
      {
        visibilityMin: 0.65,
        color: "white",
        fillColor: "white",
      }
    );
  }

  function getLandmarks(results, landmarks) {
    return Object.values(landmarks).map(
      (index) => results.poseLandmarks[index]
    );
  }

  useEffect(() => {
    if (allAudiosFinished) {
      setShowGoText(true);
      const timer = setTimeout(() => {
        setShowGoText(false);
      }, 20000); // Hide the text after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [allAudiosFinished, setShowGoText, audioRef]);

  useEffect(() => {
    const audioEl = audioRef.current;

    // Function to handle the end of an audio
    const handleAudioEnd = () => {
      // Check if the current audio is the last one in the array
      console.log("Audio ended!");
      console.log("Current audio index:", currentAudioIndex);
      console.log("Audio files length:", audioFiles.length);
      if (currentAudioIndex < audioFiles.length - 1) {
        // If not, increment the index to play the next audio
        setCurrentAudioIndex((prevIndex) => prevIndex + 1);
      } else {
        // If it is the last audio, set 'allAudiosFinished' to true
        setAllAudiosFinished(true);
      }
    };

    if (audioEl) {
      // Add the event listener to handle when the audio ends
      audioEl.addEventListener("ended", handleAudioEnd);

      // Attempt to play the current audio file
      audioEl
        .play()
        .catch((error) => console.error("Error playing audio:", error));

      // Cleanup function to remove the event listener
      return () => {
        audioEl.removeEventListener("ended", handleAudioEnd);
      };
    }
  }, [currentAudioIndex, audioFiles.length, audioRef, setAllAudiosFinished, allAudiosFinished]);

  useEffect(() => {
    if (didLoad) return;

    const mpPose = new pose.Pose({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    mpPose.setOptions({
      selfieMode: false,
      modelComplexity: 1,
      smoothLandmarks: false,
      enableSegmentation: false,
      smoothSegmentation: false,
      minDetectionConfidence: 0.3,
      minTrackingConfidence: 0.3,
    });

    camera.current = new cam.Camera(webcamRef.current, {
      onFrame: async () => {
        await mpPose.send({ image: webcamRef.current });
      },
      width: 480,
      height: 480,
      facingMode: "user",
    });
    camera.current.start();

    mpPose.onResults(onResults);
    setDidLoad(true);
  }, [didLoad]);

  return (
    <Card className="w-full h-100vh relative items-center justify-center">
      <CardBody className="h-full p-3">
        <video
          className="w-full h-full absolute top-0 left-0 object-cover z-1"
          src="https://kayyo-static-assests.s3.us-east-2.amazonaws.com/pre-punch-rush.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        {showGoText && (
          <motion.div
            animate={goTextAnimation}
            className="absolute bottom-0 left-0 p-4"
            style={{ fontSize: "2rem", color: "green", marginBottom: "20px" }} // Adjusted positioning and added margin for spacing from the bottom
          >
            STRIKE!
          </motion.div>

          // Removed the text element
        )}

        <div className="timer-display"></div>

        <Card
          className="absolute top-0 right-0 p-2 rounded-lg mt-20 mr-2 flex justify-center items-center"
          style={{ width: videoSize.width, height: videoSize.height }}
        >
          <audio
            ref={audioRef}
            src={audioFiles[currentAudioIndex]} // Set the src to the current audio file
          />
          <audio ref={soundEffectsRef} src={"/punch.mp3"} />

          <video
            className="input_video w-full h-auto"
            ref={webcamRef}
            autoPlay
            muted
            playsInline
          />
          <canvas
            ref={canvasRef}
            width={outputWidth}
            height={outputHeight}
            className="output_canvas w-full h-auto"
            style={{ zIndex: 20 }}
          ></canvas>
        </Card>

        <div className="p-4 z-30 relative">
          <p className="text-small">PUNCH RUSH</p>
          <p className="jab-counter">TOTAL PUNCHES: {jabCount}</p>{" "}
          {/* Displaying the jab count */}
          { allAudiosFinished && (
            <p className={"timer-text  text-" + textColor}>
            {formattedTime}
          </p>
          
          )}
          
        </div>
      </CardBody>
    </Card>
  );
}
