// "use client";
// import { useState } from 'react';

// export default function Home() {
//   const [prompt, setPrompt] = useState('');
//   const [imageUrl, setImageUrl] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleGenerateImage = async () => {
//     if (!prompt.trim()) {
//       setError('Please enter a prompt!');
//       return;
//     }
  
//     setIsLoading(true);
//     setError(null);
//     setImageUrl(null);
  
//     try {
//       const response = await fetch('/api/users/image', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ prompt }),
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to generate image');
//       }
  
//       const data = await response.json();
//       const imageBase64 = data.image;
//       const imageUrl = `data:image/png;base64,${imageBase64}`;
//       setImageUrl(imageUrl);
//     } catch (error) {
//       console.error('Error generating image:', error);
//       setError('Failed to generate image. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gradient-to-br from-purple-600 to-indigo-800 flex items-center justify-center min-h-screen flex-col p-6">
//       <div className="bg-white p-10 max-w-3xl w-full rounded-lg shadow-lg flex flex-col items-center gap-5">
//         <h1 className="text-4xl text-gray-800 text-center font-bold">Text-to-Image Generator</h1>
//         <textarea
//           className="border border-gray-300 w-full p-3 rounded-lg text-lg focus:ring-2 focus:ring-blue-500"
//           rows={4}
//           value={prompt}
//           onChange={(e) => setPrompt(e.target.value)}
//           placeholder="Enter your prompt here..."
//         />
//         <button
//           onClick={handleGenerateImage}
//           disabled={isLoading}
//           className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white text-xl rounded-lg transition duration-300 ease-in-out"
//         >
//           {isLoading ? 'Generating...' : 'Generate Image'}
//         </button>
//       </div>

//       {isLoading && (
//         <div className="flex flex-col items-center mt-6">
//           <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-12 h-12 animate-spin"></div>
//           <p className="text-white text-lg mt-3">Generating Image...</p>
//         </div>
//       )}

//       {error && (
//         <div className="mt-6">
//           <p className="text-red-500 text-lg font-semibold">{error}</p>
//         </div>
//       )}

//       {imageUrl && (
//         <div className="mt-10 max-w-3xl w-full flex flex-col items-center justify-center mx-auto mb-10">
//           <img src={imageUrl} className="mx-auto rounded-lg shadow-lg w-full max-w-lg" alt="Generated Image" />
//           <button
//             onClick={() => {
//               const link = document.createElement('a');
//               link.href = imageUrl;
//               link.download = 'generated-image.png';
//               link.click();
//             }}
//             className="w-full bg-green-500 hover:bg-green-600 text-white rounded-lg px-6 mt-4 py-2 transition duration-300 ease-in-out"
//           >
//             Download Image
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";
import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt!');
      return;
    }

    setIsLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const response = await fetch('/api/users/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate image');
      }

      const data = await response.json();
      const imageBase64 = data.image;
      const imageUrl = `data:image/png;base64,${imageBase64}`;
      setImageUrl(imageUrl);
    } catch (error) {
      console.error('Error generating image:', error);
      setError('Failed to generate image. Please try again.');
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
          {isLoading ? 'Generating...' : 'Generate Image'}
        </button>
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
              const link = document.createElement('a');
              link.href = imageUrl;
              link.download = 'generated-image.png';
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
