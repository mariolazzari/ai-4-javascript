# AI Programming for JavaScript Developers

## Creating App

### Install OpenAI

```sh
pnpm init
pnpm add openai dotenv
```

### Generate API key

```js
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log(openai);
```

### Language model

```js
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const hello = async () => {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a great robot!" }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
};

hello();
```

## Working with prompts

### Writing functions

```js
const hello = async () => {
  const stram = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a great robot!" },
      { role: "user", content: "What is the population of Riva del Garda?" },
    ],
    model: "gpt-3.5-turbo",
    stream:true
  });

for await (const chunk of stream){
    process.stdout.write(chunk.choices[0].delta.content || "!)
}
};
```

### Working with streams

```js
const hello = async () => {
  const stream = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    messages: [
      { role: "system", content: "You are a great robot!" },
      { role: "user", content: "What is the population of Riva del Garda?" },
    ],
  });

  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0].delta.content || "");
  }
};
```

### Creating a prompt

```js
const hello = async () => {
  const stream = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    max_completion_tokens: 128,
    messages: [
      { role: "system", content: "You are an amazing JavaScript developer: when I send you JavaScript code, you reply with a better and a more reusable code" },
      { role: "user", content: "How can I improve my AI skills with JavaScript?" },
    ],
  });

  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0].delta.content || "");
  }
};
```

### Refactoring functions with code prompts

```js
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
        content: "function add(x, y) {var z = x + y;console.log(z);}add(1, 2);",
      },
    ],
  });

  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0].delta.content || "");
  }
};
```

### Setting templates

```sql
const hello = async (author,text) => {
  const stream = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    max_completion_tokens: 128,
    messages: [
      {
        role: "system",
        content: "You are a world famus author",
      },
      {
        role: "user",
        content: `Write whis in the style of ${author}: ${text}`,
      },
    ],
  });

  for await (const chunk of stream) {
    process.stdout.write(chunk.choices[0].delta.content || "");
  }
};

hello("Shakespeare", "It was the best of times, it was the worst of times");
```

## Incorporating API

### Accrpting user input with readline

```js
import OpenAI from "openai";
import dotenv from "dotenv";
import readline from "readline";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("What do you want to ask to the robot?", async question => {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a friendly robot",
      },
      {
        role: "user",
        content: question,
      },
    ],
  });

  console.log(completion.choices[0].message);
  rl.close();
});
```

### Describing image url

```js
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
```

### Transcribing audio

[Speech to text](https://platform.openai.com/docs/guides/speech-to-text)

```js
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
```

### Image generation

[DALL-E 3](https://openai.com/it-IT/index/dall-e-3/)

```js
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
```

## Customizing assistant

### Assistant API playground

[Assistant playground](https://platform.openai.com/assistants/)

### Create assistant with NodeJS

```js
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
```

### Adding messages to thread

Thread is a conversation

```js
import OpenAI from "openai";
import "dotenv/config";
import readline from "readline";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Share your opening paragraph with Rowena\n", async question => {
  const run = await openai.beta.threads.createAndRun({
    assistant_id: "asst_pIrAb1marsdSMnoPah1SjhF0",
    thread: {
      messages: [{ role: "user", content: question }],
    },
  });

  async function checkStatus() {
    let status = await openai.beta.threads.runs.retrieve(run.thread_id, run.id);
    if (status.status === "completed") {
      const messages = await openai.beta.threads.messages.list(run.thread_id);
      messages.data.forEach(msg => {
        const content = msg.content[0].text.value;
        console.log(content);
      });
    } else {
      console.log("Run not yet completed");
    }

    setTimeout(() => {
      checkStatus(run.thread_id, run.id);
    }, 20000);
  }
});
```

## LangChain features

### Setting up LangChain project

[LangChain](https://python.langchain.com/docs/integrations/llms/openai/)
[LabgChain API](https://python.langchain.com/api_reference/)

```sh
pnpm add @langchain/openai
```

```js
import { ChatOpenAI } from "@langchain/openai";
import "dotenv/config";

const chatModel = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const population = await chatModel.invoke("Quanti abitanti ha Riva del garda?");
console.log(population);
```

### Creating a chat template

```sh
pnpm add @langchain/core
```

```js
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import "dotenv/config";

const prompt = ChatPromptTemplate.fromMessages([
  "human",
  "Write a haiku about {topic}"
]);

const chatModel = new ChatOpenAI();
const parser = new StringOutputParser();

const chain = prompt.pipe(chatModel).pipe(parser);

const response = await chain.invoke({
  topic: "cats"
});

console.log(response);
```

### Using runnable sequence

```js
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import "dotenv/config";

const chatModel = new ChatOpenAI();

const prompt = PromptTemplate.fromTemplate(
  "Write a haiku about {topic}"
);

const parser = new StringOutputParser();

const chain = RunnableSequence.from([
  prompt,
  chatModel,
  parser
]);

const response = await chain.invoke({
  topic: "spaceships"
});

console.log(response);
```

### Combining multiple chains

```js
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import "dotenv/config";

const chatModel = new ChatOpenAI();

const prompt1 = PromptTemplate.fromTemplate(
  "What town is {restaurant} restaurant in? Respond with the name of one town."
);

const prompt2 = PromptTemplate.fromTemplate(
  "what country is the restaurant {restaurant} in? Respond in {language}."
);

const parser = new StringOutputParser();

const chain = prompt1.pipe(chatModel).pipe(parser);

const bigChain = RunnableSequence.from([
  {
    restaurant: chain,
    language: (input) => input.language
  },
  prompt2,
  chatModel,
  parser
]);

const response = await bigChain.invoke({
  restaurant: "Le Pigeon",
  language: "French"
});

console.log(response);
```
