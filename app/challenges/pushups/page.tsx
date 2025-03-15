// "use client";

// import { useState, useEffect, useRef } from "react";
// import { Button } from "@/components/ui/button";
// import { Pose } from "@mediapipe/pose";
// import { Camera } from "@mediapipe/camera_utils";

// export default function PushupPage() {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const [count, setCount] = useState(0);
//   const [isDetecting, setIsDetecting] = useState(false);
//   const poseRef = useRef<Pose | null>(null);
//   const [pushupState, setPushupState] = useState<"up" | "down" | null>(null);
//   const lastPushupCountedRef = useRef(false); // Prevent multiple counts in one rep

//   useEffect(() => {
//     if (!videoRef.current) return;

//     // Initialize MediaPipe Pose
//     poseRef.current = new Pose({
//       locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
//     });

//     poseRef.current.setOptions({
//       modelComplexity: 1,
//       smoothLandmarks: true,
//       enableSegmentation: false,
//       minDetectionConfidence: 0.5,
//       minTrackingConfidence: 0.5,
//     });

//     poseRef.current.onResults(handlePoseResults);

//     // Start Camera
//     const camera = new Camera(videoRef.current, {
//       onFrame: async () => {
//         if (videoRef.current && isDetecting) {
//           await poseRef.current?.send({ image: videoRef.current });
//         }
//       },
//       width: 640,
//       height: 480,
//     });
//     camera.start();

//     return () => {
//       camera.stop();
//       poseRef.current?.close();
//     };
//   }, [isDetecting]);

//   // Pose results handler
//   const handlePoseResults = (results: any) => {
//     if (!results.poseLandmarks) return;

//     const landmarks = results.poseLandmarks;

//     // Left arm landmarks
//     const leftShoulder = landmarks[11];
//     const leftElbow = landmarks[13];
//     const leftWrist = landmarks[15];

//     // Right arm landmarks
//     const rightShoulder = landmarks[12];
//     const rightElbow = landmarks[14];
//     const rightWrist = landmarks[16];

//     // Torso landmarks
//     const leftHip = landmarks[23];
//     const rightHip = landmarks[24];
//     const torsoY = (leftHip.y + rightHip.y) / 2; // Average Y position of hips

//     // Calculate angles
//     const leftArmAngle = calculateAngle(leftShoulder, leftElbow, leftWrist);
//     const rightArmAngle = calculateAngle(rightShoulder, rightElbow, rightWrist);

//     console.log(`Left Arm Angle: ${leftArmAngle}, Right Arm Angle: ${rightArmAngle}`);

//     // Detect push-up movement
//     if (leftArmAngle < 90 && rightArmAngle < 90) {
//       if (pushupState !== "down") {
//         console.log("Push-up Down Detected");
//         setPushupState("down");
//         lastPushupCountedRef.current = false; // Reset count flag
//       }
//     }

//     if (leftArmAngle > 160 && rightArmAngle > 160) {
//       if (pushupState === "down" && !lastPushupCountedRef.current) {
//         console.log("Push-up Up Detected - Counting Repetition");
//         setPushupState("up");
//         setCount((prev) => prev + 1);
//         lastPushupCountedRef.current = true; // Prevent duplicate counts
//       }
//     }
//   };

//   const startDetection = () => {
//     setIsDetecting(true);
//   };

//   const stopDetection = () => {
//     setIsDetecting(false);
//   };

//   const postPushupCount = async () => {
//     const response = await fetch("/api/users/pushups", {
//       method: "POST",
//       body: JSON.stringify({ count }),
//       headers: { "Content-Type": "application/json" },
//     });

//     if (response.ok) {
//       alert("Push-up count posted successfully!");
//     } else {
//       alert("Failed to post push-up count.");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <h1 className="text-2xl font-bold">Push-up Challenge</h1>
//       <video ref={videoRef} autoPlay playsInline className="w-full max-w-lg rounded-lg shadow-md" />
//       <p className="text-lg font-semibold mt-4">Push-ups Count: {count}</p>
//       <div className="flex gap-4 mt-4">
//         <Button onClick={startDetection} disabled={isDetecting}>
//           Start Detection
//         </Button>
//         <Button onClick={stopDetection} disabled={!isDetecting}>
//           Stop Detection
//         </Button>
//         <Button onClick={postPushupCount}>Post Count</Button>
//       </div>
//     </div>
//   );
// }

// // Helper function to calculate angle between three points
// const calculateAngle = (a: any, b: any, c: any) => {
//   const ab = Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
//   const bc = Math.sqrt(Math.pow(b.x - c.x, 2) + Math.pow(b.y - c.y, 2));
//   const ac = Math.sqrt(Math.pow(c.x - a.x, 2) + Math.pow(c.y - a.y, 2));
//   return Math.acos((ab * ab + bc * bc - ac * ac) / (2 * ab * bc)) * (180 / Math.PI);
// };
