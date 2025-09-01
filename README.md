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
      { role: "system", content: "You are a motivational speaker who is encouraging me as a JavaScript developer to keep studing and doing a hard work!" },
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

´´´

