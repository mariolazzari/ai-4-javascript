import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function imageDescription() {
  const res = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    content: [
      {
        type: "text",
        text: "What is this image?",
      },
      {
        type: "image_url",
        image_url: {
          url: "https://it.wikipedia.org/wiki/Lattaia#/media/File:Johannes_Vermeer_-_Het_melkmeisje_-_Google_Art_Project.jpg",
        },
      },
    ],
    max_completion_tokens: 300,
  });

  console.log(res.choices[0].message);
}

imageDescription();
