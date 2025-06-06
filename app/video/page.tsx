// "use client";
// import { useState } from 'react';

// interface VideoGenerationResponse {
//   videoUrls: string[];
// }

// export default function Home() {
//   const [prompt, setPrompt] = useState('');
//   const [loraUrl, setLoraUrl] = useState('');
//   const [videoUrls, setVideoUrls] = useState<string[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!prompt.trim()) return;

//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await fetch('/api/users/video', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ 
//           prompt,
//           lora_url: loraUrl || undefined
//         }),
//       });

//       const data: VideoGenerationResponse = await response.json();
//       if (!response.ok) {
//         throw new Error( 'Failed to generate video');
//       }

//       if (!data.videoUrls.length) {
//         throw new Error('No video URLs received');
//       }

//       setVideoUrls(data.videoUrls);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to generate video');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-8 px-4">
//       <main className="max-w-4xl mx-auto">
//         <h1 className="text-4xl font-bold text-center mb-8">AI Video Generator</h1>
        
//         <form onSubmit={handleSubmit} className="mb-8">
//           <div className="flex flex-col space-y-4">
//             <textarea
//               value={prompt}
//               onChange={(e) => setPrompt(e.target.value)}
//               placeholder="Enter your video prompt..."
//               className="p-4 border rounded-lg resize-none h-32"
//               disabled={isLoading}
//             />
//             <input
//               type="url"
//               value={loraUrl}
//               onChange={(e) => setLoraUrl(e.target.value)}
//               placeholder="LORA Model URL (optional)"
//               className="p-4 border rounded-lg"
//               disabled={isLoading}
//             />
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//             >
//               {isLoading ? 'Generating...' : 'Generate Video'}
//             </button>
//           </div>
//         </form>

//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//             {error}
//           </div>
//         )}

//         {videoUrls.length > 0 && (
//           <div className="mt-8">
//             <h2 className="text-xl font-semibold mb-4">Generated Videos</h2>
//             <div className="grid gap-4">
//               {videoUrls.map((url, index) => (
//                 <div key={index} className="aspect-video bg-black rounded-lg overflow-hidden">
//                   <video
//                     controls
//                     src={url}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

"use client";
import { useState } from 'react';

interface VideoGenerationResponse {
  videoUrls: string[];
}

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [loraUrl, setLoraUrl] = useState('');
  const [videoUrls, setVideoUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const examplePrompts = [
    "A hyper-realistic drone shot of a futuristic Tokyo at midnight, illuminated by neon holographic billboards reflecting off wet streets. Flying cars navigate between towering skyscrapers, their headlights casting beams through a light fog. Pedestrians in futuristic attire walk along bustling streets filled with street vendors selling steaming ramen, high-tech gadgets, and glowing accessories. The skyline features digital advertisements with animated figures, and cherry blossom trees with glowing petals line the sidewalks. A soft rain drizzles, creating a cinematic wet pavement effect.",
    "A highly detailed underwater shot of a deep-sea exploration submersible slowly approaching a colossal sunken shipwreck. The rusted remains of the vessel are covered in coral and glowing bioluminescent organisms, while schools of exotic fish swim around the decayed structure. A giant manta ray glides gracefully above the wreck, and distant shadows of sharks can be seen moving through the deep blue abyss. The submersible's bright lights reveal intricate carvings on the ship’s bow, while a robotic arm collects samples from the ocean floor, stirring up a cloud of golden sand.",
    "A highly detailed cinematic battle scene set in a medieval battlefield during a thunderstorm. Thousands of armored knights charge across a muddy field, their swords clashing as rain pours down. Lightning illuminates the sky, casting eerie shadows over the battlefield. Soldiers on horseback trample through pools of water, while catapults hurl flaming projectiles toward distant stone walls. The camera focuses on a single warrior in intricately detailed battle-worn armor, his sword gleaming with rainwater as he leads his army through the chaos. The ground shakes with the sound of clashing steel and distant war cries, making the scene feel intensely immersive.",
    "A serene landscape of the Northern Lights dancing over a snowy mountain range, reflecting off a frozen lake, make it realistic.",
    "A thrilling car chase through a cyberpunk-inspired metropolis, with neon billboards and rain-slicked streets reflecting city lights, make it realistic."
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/users/video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt,
          lora_url: loraUrl || undefined
        }),
      });

      const data: VideoGenerationResponse = await response.json();
      if (!response.ok) {
        throw new Error( 'Failed to generate video');
      }

      if (!data.videoUrls.length) {
        throw new Error('No video URLs received');
      }

      setVideoUrls(data.videoUrls);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate video');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8 px-4">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">AI Video Generator</h1>
        
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex flex-col space-y-4">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your video prompt..."
              className="p-4 border border-gray-700 rounded-lg resize-none h-32 bg-gray-800 text-white"
              disabled={isLoading}
            />
            <input
              type="url"
              value={loraUrl}
              onChange={(e) => setLoraUrl(e.target.value)}
              placeholder="LORA Model URL (optional)"
              className="p-4 border border-gray-700 rounded-lg bg-gray-800 text-white"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Generating...' : 'Generate Video'}
            </button>
          </div>
        </form>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Example Prompts</h2>
          <ul className="space-y-2">
            {examplePrompts.map((example, index) => (
              <li
                key={index}
                className="p-3 bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700"
                onClick={() => setPrompt(example)}
              >
                {example}
              </li>
            ))}
          </ul>
        </div>

        {error && (
          <div className="bg-red-700 border border-red-500 text-white px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {videoUrls.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Generated Videos</h2>
            <div className="grid gap-4">
              {videoUrls.map((url, index) => (
                <div key={index} className="aspect-video bg-black rounded-lg overflow-hidden">
                  <video
                    controls
                    src={url}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// "use client";
// import { useState, useEffect } from "react";

// interface VideoGenerationResponse {
//   videoUrls: string[];
// }

// export default function Home() {
//   const [prompt, setPrompt] = useState("");
//   const [loraUrl, setLoraUrl] = useState("");
//   const [videoUrls, setVideoUrls] = useState<string[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
//   const [paymentSuccess, setPaymentSuccess] = useState(false);

//   useEffect(() => {
//     if (paymentSuccess) {
//       handleSubmit(); // Automatically trigger video generation after successful payment
//     }
//   }, [paymentSuccess]);

//   const handlePayment = () => {
//     if (!window.google) {
//       setError("Google Pay is not available.");
//       return;
//     }
  
//     const paymentRequest = {
//       apiVersion: 2,
//       apiVersionMinor: 0,
//       allowedPaymentMethods: [
//         {
//           type: "CARD" as const, // Ensure "CARD" is a valid PaymentMethodType
//           parameters: {
//             allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
//             allowedCardNetworks: ["VISA", "MASTERCARD"],
//           },
//           tokenizationSpecification: {
//             type: "PAYMENT_GATEWAY" as const, // Ensure proper type
//             parameters: {
//               gateway: "example", // Replace with your actual payment gateway
//               gatewayMerchantId: "your-merchant-id",
//             },
//           },
//         },
//       ],
//       merchantInfo: {
//         merchantId: "your-merchant-id",
//         merchantName: "Your Business Name",
//       },
//       transactionInfo: {
//         totalPriceStatus: "FINAL" as const, // Ensure proper type
//         totalPrice: "5.00", // Change price as needed
//         currencyCode: "USD",
//       },
//     };
  
//     const paymentsClient = new google.payments.api.PaymentsClient({
//       environment: "TEST", // Change to "PRODUCTION" for live payments
//     });
  
//     paymentsClient
//       .loadPaymentData(paymentRequest as google.payments.api.PaymentDataRequest)
//       .then((paymentData) => {
//         console.log("Payment successful:", paymentData);
//         setPaymentSuccess(true);
//       })
//       .catch((err) => {
//         console.error("Payment failed:", err);
//         setError("Payment was not successful.");
//       });
//   };
  

//   const handleSubmit = async () => {
//     if (!prompt.trim()) return;

//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await fetch("/api/users/video", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           prompt,
//           lora_url: loraUrl || undefined,
//         }),
//       });

//       const data: VideoGenerationResponse = await response.json();
//       if (!response.ok) {
//         throw new Error("Failed to generate video");
//       }

//       if (!data.videoUrls.length) {
//         throw new Error("No video URLs received");
//       }

//       setVideoUrls(data.videoUrls);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Failed to generate video");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white py-8 px-4">
//       <main className="max-w-4xl mx-auto">
//         <h1 className="text-4xl font-bold text-center mb-8">AI Video Generator</h1>

//         <form onSubmit={(e) => e.preventDefault()} className="mb-8">
//           <div className="flex flex-col space-y-4">
//             <textarea
//               value={prompt}
//               onChange={(e) => setPrompt(e.target.value)}
//               placeholder="Enter your video prompt..."
//               className="p-4 border border-gray-700 rounded-lg resize-none h-32 bg-gray-800 text-white"
//               disabled={isLoading}
//             />
//             <input
//               type="url"
//               value={loraUrl}
//               onChange={(e) => setLoraUrl(e.target.value)}
//               placeholder="LORA Model URL (optional)"
//               className="p-4 border border-gray-700 rounded-lg bg-gray-800 text-white"
//               disabled={isLoading}
//             />
//             <button
//               type="button"
//               disabled={isLoading}
//               onClick={handlePayment} // Trigger Google Pay first
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//             >
//               {isLoading ? "Generating..." : "Generate Video"}
//             </button>
//           </div>
//         </form>

//         {error && (
//           <div className="bg-red-700 border border-red-500 text-white px-4 py-3 rounded mb-4">
//             {error}
//           </div>
//         )}

//         {videoUrls.length > 0 && (
//           <div className="mt-8">
//             <h2 className="text-xl font-semibold mb-4">Generated Videos</h2>
//             <div className="grid gap-4">
//               {videoUrls.map((url, index) => (
//                 <div key={index} className="aspect-video bg-black rounded-lg overflow-hidden">
//                   <video controls src={url} className="w-full h-full object-cover" />
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }
