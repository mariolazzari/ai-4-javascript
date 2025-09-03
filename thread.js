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
