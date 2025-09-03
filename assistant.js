import OpenAI from "openai";
import "dotenv/config";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function betterSpeaker() {
  const assistant = await openai.beta.assistants.create({
    name: "Rowena the enthusiastic speaker coach",
    instructions:
      "You are a speaker coach! Take the content of my speach and make it funnier and engaging",
    model: "gpt-4.1-nano",
  });

  console.log(assistant);
}

betterSpeaker();
