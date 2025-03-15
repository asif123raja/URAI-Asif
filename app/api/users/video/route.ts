import { NextRequest, NextResponse } from 'next/server';
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,  // Use environment variable
});

export async function POST(req: NextRequest) {
  try {
    const { prompt, lora_url } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    console.log("Generating video with prompt:", prompt);

    const prediction = await replicate.predictions.create({
      version: "8cc15b0c230195c2cf34825a23e3c3240689bd0a144e717caa196198fb9f0461",
      input: {
        prompt,
        lora_url: lora_url || "https://huggingface.co/motimalu/wan-flat-color-v2/resolve/main/wan_flat_color_v2.safetensors",
      },
    });

    console.log("Raw prediction response:", prediction);

    if (!prediction || !prediction.id) {
      return NextResponse.json({ error: 'Failed to start video generation' }, { status: 500 });
    }

    // Polling to get the final video URL
    let output;
    while (true) {
      const updatedPrediction = await replicate.predictions.get(prediction.id);
      if (updatedPrediction.status === "succeeded") {
        output = updatedPrediction.output;
        break;
      } else if (updatedPrediction.status === "failed") {
        return NextResponse.json({ error: 'Video generation failed' }, { status: 500 });
      }
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5 seconds before checking again
    }

    console.log("Final output from Replicate:", output);

    // Ensure output is a valid URL
    const videoUrls = Array.isArray(output) ? output : [output];

    return NextResponse.json({ videoUrls }, { status: 200 });
  } catch (error) {
    console.error('Video generation failed:', error);
    return NextResponse.json({ error: 'Video generation failed' }, { status: 500 });
  }
}
