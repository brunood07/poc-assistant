import { FastifyInstance } from "fastify";
import { AssistantController } from "../controllers/assistant-controller";

export function openAiRoutes(app: FastifyInstance) {
  const assistantController = new AssistantController();
  app.post("/ask", assistantController.handle);
}