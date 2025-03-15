"use client";

import { useState } from "react";
import { Bot } from "lucide-react"; // Importing bot icon

export default function ChatComponent() {
    const [message, setMessage] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);
    const [chat, setChat] = useState<{ sender: "user" | "AI"; text: string; image?: string }[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setImage(file);
    };

    const sendMessage = async () => {
        if (!message.trim() && !image) return;

        setLoading(true);
        let base64Image: string | null = null;

        if (image) {
            const reader = new FileReader();
            reader.readAsDataURL(image);
            base64Image = await new Promise<string | null>((resolve) => {
                reader.onload = () => resolve(reader.result?.toString().split(",")[1] || null);
            });
        }

        setChat([...chat, { sender: "user", text: message, image: image ? URL.createObjectURL(image) : undefined }]);
        setMessage("");
        setImage(null);

        const res = await fetch("/api/users/chatbot", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message,
                file: base64Image ? { mime_type: image?.type, data: base64Image } : undefined,
            }),
        });

        const data = await res.json();
        setChat((prevChat) => [...prevChat, { sender: "AI", text: data.response }]);
        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen w-full bg-gray-900 text-white px-4 lg:px-16">
            <div className="w-full max-w-2xl lg:max-w-full lg:w-3/4 xl:w-1/2 h-full p-4 bg-gray-800 rounded-lg shadow-lg flex flex-col">
                <div className="flex-1 overflow-auto space-y-4 p-2 border border-gray-700 rounded-lg custom-scrollbar">
                    {chat.map((c, index) => (
                        <div key={index} className={`flex items-center gap-3 ${c.sender === "user" ? "justify-end" : "justify-start"}`}>
                            {c.sender === "AI" && <Bot className="text-green-400" size={66} />} {/* Bigger bot icon outside */}
                            <div
                                className={`p-3 rounded-lg max-w-3/4 ${
                                    c.sender === "user" 
                                        ? "bg-blue-500 ml-8 lg:ml-12 self-end text-right" // Left gap for user input
                                        : "bg-gray-700 mr-8 lg:mr-12 self-start text-left" // Right gap for AI output
                                }`}
                            >
                                {c.text}
                                {c.image && <img src={c.image} alt="Uploaded" className="mt-2 w-32 h-32 rounded-lg" />}
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className="flex flex-col space-y-2 mt-4">
                    <input
                        type="text"
                        className="flex-1 p-2 text-black rounded-lg"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                    />
                    
                    {/* Custom File Upload Button */}
                    <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-center">
                        Choose Image File
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>

                    <button onClick={sendMessage} className="p-2 bg-green-500 hover:bg-green-600 rounded-lg">
                        {loading ? "Sending..." : "Send"}
                    </button>
                </div>
            </div>
        </div>
    );
}
