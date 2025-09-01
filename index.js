import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const hello = async () => {
  const stream = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    max_completion_tokens: 128,
    messages: [
      {
        role: "system",
        content:
          "You are a motivational speaker who is encouraging me as a JavaScript developer to keep studing and doing a hard work!",
      },
      {
        role: "user",
        content: "How can I improve my AI skills with JavaScript?",
      },
    ],
  });

  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0].delta.content || "");
  }
};

hello();
