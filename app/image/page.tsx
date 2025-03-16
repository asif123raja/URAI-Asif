"use client";
import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const examplePrompts = [
    "A futuristic cyberpunk city with neon lights and flying cars.",
    "A mystical forest with glowing mushrooms and magical creatures.",
    "An astronaut walking on an alien planet with a purple sky.",
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Prompt copied!");
  };

  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt!");
      return;
    }

    setIsLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const response = await fetch("/api/users/image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate image");
      }

      const data = await response.json();
      const imageBase64 = data.image;
      const imageUrl = `data:image/png;base64,${imageBase64}`;
      setImageUrl(imageUrl);
    } catch (error) {
      console.error("Error generating image:", error);
      setError("Failed to generate image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white flex items-center justify-center min-h-screen flex-col p-6">
      <div className="bg-gray-800 p-8 max-w-3xl w-full rounded-lg shadow-lg flex flex-col items-center gap-5">
        <h1 className="text-4xl font-bold text-center">Text-to-Image Generator</h1>
        
        <textarea
          className="bg-gray-700 border border-gray-600 w-full p-3 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
        />
        
        <button
          onClick={handleGenerateImage}
          disabled={isLoading}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xl rounded-lg transition duration-300 ease-in-out"
        >
          {isLoading ? "Generating..." : "Generate Image"}
        </button>

        {/* Example Prompts */}
        <div className="w-full text-center mt-4">
          <h2 className="text-lg font-semibold mb-2 text-gray-300">Example Prompts:</h2>
          {examplePrompts.map((text, index) => (
            <div key={index} className="flex justify-between items-center bg-gray-700 p-2 rounded-md mb-2">
              <p className="text-sm text-gray-300">{text}</p>
              <button
                onClick={() => copyToClipboard(text)}
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                Copy
              </button>
            </div>
          ))}
        </div>
      </div>

      {isLoading && (
        <div className="flex flex-col items-center mt-6">
          <div className="border-t-4 border-blue-500 border-solid rounded-full w-12 h-12 animate-spin"></div>
          <p className="text-lg mt-3">Generating Image...</p>
        </div>
      )}

      {error && (
        <div className="mt-6">
          <p className="text-red-500 text-lg font-semibold">{error}</p>
        </div>
      )}

      {imageUrl && (
        <div className="mt-10 max-w-3xl w-full flex flex-col items-center justify-center mx-auto mb-10">
          <img src={imageUrl} className="mx-auto rounded-lg shadow-lg w-full max-w-lg" alt="Generated Image" />
          <button
            onClick={() => {
              const link = document.createElement("a");
              link.href = imageUrl;
              link.download = "generated-image.png";
              link.click();
            }}
            className="w-full bg-green-500 hover:bg-green-600 text-white rounded-lg px-6 mt-4 py-2 transition duration-300 ease-in-out"
          >
            Download Image
          </button>
        </div>
      )}
    </div>
  );
}

