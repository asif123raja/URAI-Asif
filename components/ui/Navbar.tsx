"use client";
import { useState } from "react";
import { UserCircle, Bot, Image, Video, LogIn, Menu } from "lucide-react";
import { FaFileAlt, FaRegImage } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center shadow-md relative w-full">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold">
        <span className="text-blue-500">UR</span>
        <span className="text-gray-400">AI</span>
      </Link>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex gap-6">
        <Link href="/chatbot" className="flex items-center gap-2 hover:text-green-400">
          <Bot className="w-5 h-5" /> Chatbot
        </Link>
        <Link href="/summarizer" className="flex items-center gap-2 hover:text-green-400">
          <FaFileAlt className="w-5 h-5" /> Summarizer
        </Link>
        <Link href="/image" className="flex items-center gap-2 hover:text-yellow-400">
          <Image className="w-5 h-5" /> Image Gen
        </Link>
        <Link href="/chatbot" className="flex items-center gap-2 hover:text-blue-400">
          <FaRegImage className="w-5 h-5" /> Image Description
        </Link>
        <Link href="/video" className="flex items-center gap-2 hover:text-purple-400">
          <Video className="w-5 h-5" /> Video Gen
        </Link>
       
      </div>

      {/* Mobile Dropdown Menu */}
      <div className="md:hidden relative">
        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <Menu className="w-8 h-8" />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-800 bg-opacity-80 backdrop-blur-lg rounded-lg p-2 flex flex-col gap-2">
            <Link href="/chatbot" className="flex items-center gap-2 hover:text-green-400">
              <Bot className="w-5 h-5" /> Chatbot
            </Link>
            <Link href="/summarizer" className="flex items-center gap-2 hover:text-green-400">
              <FaFileAlt className="w-5 h-5" /> Summarizer
            </Link>
            <Link href="/image" className="flex items-center gap-2 hover:text-yellow-400">
              <Image className="w-5 h-5" /> Image Gen
            </Link>
            <Link href="/video" className="flex items-center gap-2 hover:text-purple-400">
              <Video className="w-5 h-5" /> Video Gen
            </Link>
            <Link href="/image-description" className="flex items-center gap-2 hover:text-blue-400">
              <FaRegImage className="w-5 h-5" /> Image Description
            </Link>
          </div>
        )}
      </div>

      {/* Profile / Sign-in */}
      <div className="hidden md:flex">
        {isLoggedIn ? (
          <Link href="/" className="flex items-center gap-2 hover:text-blue-400">
            <UserCircle className="w-6 h-6" /> Profile
          </Link>
        ) : (
          <Button onClick={() => setIsLoggedIn(true)} variant="outline" className=" text-blue-900 border-white">
            <LogIn className="w-5 h-5 mr-2" /> Sign In
          </Button>
        )}
      </div>
    </nav>
  );
}
