"use client";
import { useState } from "react";
import { UploadCloud } from "lucide-react";

export default function PdfSummarizer() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a PDF file first.");
      return;
    }
    
    setMessage("Backend is yet to be completed. PDF processing will be available soon!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <div className="bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-lg text-center">
        <h1 className="text-2xl font-bold text-red-400 mb-2">Backend is yet to be completed</h1>
        <p className="text-gray-300 mb-4">PDF summarization will be available soon.</p>
        
        <label className="border border-dashed border-gray-500 p-6 rounded-md cursor-pointer flex flex-col items-center bg-gray-700 hover:bg-gray-600">
          <UploadCloud className="w-10 h-10 text-gray-400 mb-2" />
          <span className="text-gray-300">Click to upload a PDF</span>
          <input type="file" accept="application/pdf" className="hidden" onChange={handleFileChange} />
        </label>
        
        {file && <p className="mt-2 text-sm text-gray-300">Selected File: {file.name}</p>}

        <button
          onClick={handleUpload}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Upload & Summarize
        </button>

        {message && <p className="mt-4 text-red-400">{message}</p>}
      </div>
    </div>
  );
}
