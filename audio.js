import dotenv from "dotenv";
import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import FormData from "form-data";

dotenv.config();
const apiKey = process.env.OPENAI_API_KEY;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const recordingPath = path.join(__dirname, "eve-recording.mp3");

const data = new FormData();
data.append("model", "whisper-1");
data.append("file", fs.createReadStream(recordingPath));

axios
  .post("https://api.openai.com/v1/audio/transcriptions", data, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": `multipart/form-data;boundary=${data.boundary}`,
    },
  })
  .then(res => console.log(res.data));
