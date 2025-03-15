// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardTitle } from "@/components/ui/card";
// import { GiJumpingRope, GiRunningShoe, GiMeditation, GiWeightLiftingUp, GiWalk } from "react-icons/gi";

// import { FaBiking, FaSwimmer, FaDumbbell } from "react-icons/fa";

// const challenges = [
//   { name: "Squats", icon: <GiJumpingRope className="w-10 h-10 text-blue-500" />, description: "Do bodyweight squats daily." },
//   { name: "Push-ups", icon: <GiWeightLiftingUp className="w-10 h-10 text-red-500" />, description: "Strengthen your upper body." },
//   { name: "Meditation", icon: <GiMeditation className="w-10 h-10 text-green-500" />, description: "Relax and calm your mind." },
//   { name: "Walking", icon: <GiWalk className="w-10 h-10 text-yellow-500" />, description: "Walk 10,000 steps a day." },
// //   { name: "Yoga", icon: <GiYoga className="w-10 h-10 text-purple-500" />, description: "Improve flexibility and breathing." },
//   { name: "Running", icon: <GiRunningShoe className="w-10 h-10 text-orange-500" />, description: "Run 5km a day." },
//   { name: "Cycling", icon: <FaBiking className="w-10 h-10 text-pink-500" />, description: "Boost endurance with cycling." },
//   { name: "Swimming", icon: <FaSwimmer className="w-10 h-10 text-cyan-500" />, description: "Swim for full-body exercise." },
//   { name: "Weightlifting", icon: <FaDumbbell className="w-10 h-10 text-gray-500" />, description: "Build muscle with weights." },
// ];

// export default function ChallengePage() {
//   const [selected, setSelected] = useState<string | null>(null);

//   const startChallenge = (name: string) => {
//     setSelected(name);
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <h2 className="text-3xl font-bold text-center mb-6">Choose Your Challenge</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {challenges.map((challenge) => (
//           <motion.div 
//             key={challenge.name}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <Card className={`p-4 shadow-md rounded-lg border ${selected === challenge.name ? "border-blue-500" : ""}`}>
//               <CardContent className="flex flex-col items-center">
//                 {challenge.icon}
//                 <CardTitle className="mt-3 text-lg">{challenge.name}</CardTitle>
//                 <p className="text-sm text-gray-600 text-center">{challenge.description}</p>
//                 <Button className="mt-3 w-full" onClick={() => startChallenge(challenge.name)}>
//                   {selected === challenge.name ? "Ongoing..." : "Start Challenge"}
//                 </Button>
//               </CardContent>
//             </Card>
//           </motion.div>
//         ))}
//       </div>
//       {selected && (
//         <div className="mt-6 text-center">
//           <p className="text-lg font-semibold">🔥 Challenge Active: {selected} 🔥</p>
//         </div>
//       )}
//     </div>
//   );
// }
