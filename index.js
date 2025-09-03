import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const apiKey = process.env.OPENAI_API_KEY;

axios
  .post(
    "https://api.openai.com/v1/images/generations",
    {
      model: "dall-e-3",
      prompt: "A modern milk maid in Vermeer style",
      size: "1024x1024",
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    }
  )
  .then(res => console.log(res.data));
