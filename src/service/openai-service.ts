import OpenAI from "openai";
import fs from "fs";
import { readMarkdown } from "../utils/reader-utils";
import { env } from "../env";

export class OpenAiService {
  openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });
  }

  askOpenAiAssistent = async (message: string) => {
    const context = readMarkdown("./docs/contexto.md");
    
    const response = await this.openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Você é um assistente de código. Use as regras abaixo como contexto:\n\n${context}`,
        },
        { role: "user", content: message },
      ],
    });
  
    return response.choices[0].message.content;
  }

  createAssistant = async () => {
    const file = await this.openai.files.create({
      file: fs.createReadStream("./docs/contexto.md"),
      purpose: "assistants",
    });

    const assistant = await this.openai.beta.assistants.create({
      name: "Assistente de Código",
      instructions: "Você é um assistente de código que segue padrões de um projeto descrito no arquivo.",
      tools: [{ type: "code_interpreter" }],
      tool_resources: {
        code_interpreter: {
          file_ids: [file.id],
        }
      },
      model: "gpt-3.5-turbo"
    });

    return assistant.id;
  }

  askAssistantMessage = async (assistantId: string, userMessage: string) => {
    const thread = await this.openai.beta.threads.create();

    await this.openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: userMessage,
    });

    const run = await this.openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistantId,
    });

    let status = run.status;
    let errorMessage = run.last_error
    let currentRun = run;
    while (status === "queued" || status === "in_progress") {
      await new Promise((res) => setTimeout(res, 1000));
      currentRun = await this.openai.beta.threads.runs.retrieve(thread.id, run.id);
      status = currentRun.status;
    }

    if (status !== "completed") {
      throw new Error(`Execução falhou com status: ${status} ${errorMessage}`);
    }

    const messages = await this.openai.beta.threads.messages.list(thread.id);
    const assistantMessage = messages.data.find((msg) => msg.role === "assistant");

    return assistantMessage?.content;
  }
}