import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { prompt } = await request.json();

  if (!prompt) {
    return NextResponse.json(
      { error: 'Prompt is required' },
      { status: 400 }
    );
  }

  const token = "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"; // Replace with your actual token

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
      {
        headers: { Authorization: `Bearer ${token}` },
        method: "POST",
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to generate image');
    }

    const imageBlob = await response.blob();
    const imageBuffer = await imageBlob.arrayBuffer();
    const imageBase64 = Buffer.from(imageBuffer).toString('base64');

    return NextResponse.json({ image: imageBase64 });
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    );
  }
}
// import { NextResponse } from 'next/server';

// export async function POST(request: Request) {
//   const { prompt } = await request.json();

//   if (!prompt) {
//     return NextResponse.json(
//       { error: 'Prompt is required' },
//       { status: 400 }
//     );
//   }

//   const token = "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"; // Replace with your actual token

//   try {
//     const response = await fetch(
//       "https://api-inference.huggingface.co/models/Alpha-VLLM/Lumina-Image-2.0",
//       {
//         headers: { Authorization: `Bearer ${token}` },
//         method: "POST",
//         body: JSON.stringify({ inputs: prompt }),
//       }
//     );

//     // Log the response status and body for debugging
//     console.log('Response Status:', response.status);
//     const responseBody = await response.text();
//     console.log('Response Body:', responseBody);

//     if (!response.ok) {
//       throw new Error(`API Error: ${response.status} - ${responseBody}`);
//     }

//     const imageBlob = await response.blob();
//     const imageBuffer = await imageBlob.arrayBuffer();
//     const imageBase64 = Buffer.from(imageBuffer).toString('base64');

//     return NextResponse.json({ image: imageBase64 });
//   } catch (error) {
//     console.error('Error generating image:', error);
//     return NextResponse.json(
//       { error: 'Failed to generate image' },
//       { status: 500 }
//     );
//   }
// }