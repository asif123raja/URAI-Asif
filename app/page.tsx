"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { FaRobot, FaImage, FaVideo, FaFileAlt, FaRegImage } from "react-icons/fa";
import Link from "next/link";

const tools = [
  {
    name: "Chatbot",
    icon: <FaRobot className="w-10 h-10 text-blue-400" />, 
    description: "Ask AI questions and get instant responses.",
    link: "/chatbot",
  },
  {
    name: "Summarizer",
    icon: <FaFileAlt className="w-10 h-10 text-yellow-400" />,
    description: "Summarize long texts into concise information.",
    link: "/summarizer",
  },
  {
    name: "Image Generator",
    icon: <FaImage className="w-10 h-10 text-green-400" />,
    description: "Generate images from text prompts.",
    link: "/image",
  },
  {
    name: "Image Description",
    icon: <FaRegImage className="w-10 h-10 text-purple-400" />,
    description: "Get a detailed description of an uploaded image.",
    link: "/chatbot",
  },
  {
    name: "Video Generator",
    icon: <FaVideo className="w-10 h-10 text-red-400" />,
    description: "Create videos based on AI-generated content.",
    link: "/video",
  },
  
];

export default function AIToolsPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h2 className="text-4xl font-bold text-center mb-8">AI Tools Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl">
        {tools.map((tool) => (
          <motion.div key={tool.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Card className="bg-gray-800 p-6 shadow-lg rounded-lg border border-gray-700">
              <CardContent className="flex flex-col items-center">
                {tool.icon}
                <CardTitle className="mt-4 text-xl">{tool.name}</CardTitle>
                <p className="text-sm text-gray-400 text-center mt-2">{tool.description}</p>
                <Link href={tool.link}>
                  <Button className="mt-4 bg-blue-600 hover:bg-blue-700 w-full">Open {tool.name}</Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
