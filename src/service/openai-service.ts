import OpenAI from "openai";
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
}