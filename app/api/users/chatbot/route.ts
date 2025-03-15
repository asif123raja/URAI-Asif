// import { NextRequest, NextResponse } from "next/server";

// export async function POST(req: NextRequest) {
//     try {
//         const { message, file } = await req.json();

//         const api_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
//         const apiKey = "AIzaSyDyrb9h2jy8wXPrDYoh8-QixYORsyGFHII"; // Store your API key securely in .env

//         const requestBody = {
//             contents: [
//                 {
//                     parts: [{ text: message }, file?.data ? [{ inline_data: file }] : []],
//                 },
//             ],
//         };

//         const response = await fetch(`${api_url}?key=${apiKey}`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(requestBody),
//         });

//         const data = await response.json();

//         if (!response.ok) {
//             return NextResponse.json({ error: "Failed to fetch response from AI" }, { status: 500 });
//         }

//         const apiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI.";

//         return NextResponse.json({ response: apiResponse });

//     } catch (error) {
//         console.error("Error:", error);
//         return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//     }
// }

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { message, file } = await req.json();

        if (!message && !file?.data) {
            return NextResponse.json({ error: "Message or image is required." }, { status: 400 });
        }

        const api_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
        const apiKey = "AIzaSyCJidV_cX7J8wUYAj9kQS4NnQf-p573RpA"; // Store API key securely in .env

        const requestBody: any = {
            contents: [
                {
                    parts: [{ text: message }],
                },
            ],
        };

        if (file?.data) {
            requestBody.contents[0].parts.push({ inline_data: file });
        }

        const response = await fetch(`${api_url}?key=${apiKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            return NextResponse.json({ error: "Failed to fetch response from AI" }, { status: 500 });
        }

        const data = await response.json();
        const apiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI.";

        return NextResponse.json({ response: apiResponse });

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
