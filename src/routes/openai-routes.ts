import { FastifyInstance } from "fastify";
import { AssistantController } from "../controllers/assistant-controller";
import { CreateAssistantController } from "../controllers/create-assistant-controller";
import { AskAssistantController } from "../controllers/ask-assistant-controller";

export function openAiRoutes(app: FastifyInstance) {
  const assistantController = new AssistantController();
  const createAssistantController = new CreateAssistantController();
  const askAssistantController = new AskAssistantController();
  app.post("/ask", assistantController.handle);
  app.post("/create-assistant", createAssistantController.handle);
  app.post("/ask-assistant", askAssistantController.handle);
}