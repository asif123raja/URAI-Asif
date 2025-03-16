// import { NextRequest, NextResponse } from "next/server";

// interface RequestBody {
//     contents: {
//         parts: ({ text: string } | { inline_data: { mimeType: string; data: string } })[];
//     }[];
// }

// export async function POST(req: NextRequest) {
//     try {
//         const { message, file }: { message?: string; file?: { mimeType: string; data: string } } = await req.json();

//         if (!message && !file?.data) {
//             return NextResponse.json({ error: "Message or image is required." }, { status: 400 });
//         }

//         const api_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
//         const apiKey = "AIzaSyCJidV_cX7J8wUYAj9kQS4NnQf-p573RpA"; // Use env variable

//         if (!apiKey) {
//             return NextResponse.json({ error: "API key is missing." }, { status: 500 });
//         }

//         const requestBody: RequestBody = {
//             contents: [
//                 {
//                     parts: message ? [{ text: message }] : [],
//                 },
//             ],
//         };

//         if (file?.data) {
//             requestBody.contents[0].parts.push({ inline_data: { mimeType: file.mimeType, data: file.data } });
//         }

//         const response = await fetch(`${api_url}?key=${apiKey}`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(requestBody),
//         });

//         if (!response.ok) {
//             return NextResponse.json({ error: "Failed to fetch response from AI" }, { status: 500 });
//         }

//         const data = await response.json();
//         const apiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI.";

//         return NextResponse.json({ response: apiResponse });

//     } catch (error) {
//         console.error("Error:", error);
//         return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//     }
// }

import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
    contents: {
        parts: ({ text: string } | { inline_data: { mimeType: string; data: string } })[];
    }[];
}

export async function POST(req: NextRequest) {
    try {
        const { message, file }: { message?: string; file?: { mimeType: string; data: string } } = await req.json();

        if (!message && !file?.data) {
            return NextResponse.json({ error: "Message or image is required." }, { status: 400 });
        }

        const api_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
        const apiKey = "AIzaSyCJidV_cX7J8wUYAj9kQS4NnQf-p573RpA"; // Securely store the API key in .env.local

        if (!apiKey) {
            console.error("API key is missing.");
            return NextResponse.json({ error: "API key is missing." }, { status: 500 });
        }

        const requestBody: RequestBody = {
            contents: [
                {
                    parts: message ? [{ text: message }] : [],
                },
            ],
        };

        if (file?.data) {
            requestBody.contents[0].parts.push({ inline_data: { mimeType: file.mimeType, data: file.data } });
        }

        console.log("RequestBody:", JSON.stringify(requestBody, null, 2)); // Log request payload for debugging

        const response = await fetch(`${api_url}?key=${apiKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
        });

        console.log("API Response Status:", response.status); // Log response status

        const data = await response.json();
        console.log("API Response Data:", data); // Log full API response

        if (!response.ok) {
            return NextResponse.json({ error: `Failed to fetch response from AI: ${data.error?.message || "Unknown error"}` }, { status: response.status });
        }

        const apiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI.";

        return NextResponse.json({ response: apiResponse });

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
