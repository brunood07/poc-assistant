import { FastifyRequest, FastifyReply } from 'fastify'
import { OpenAiService } from '../service/openai-service'
import { z } from 'zod';

const askAssistentSchema = z.object({
  assistantId: z.string(),
  userMessage: z.string()
});

export class AskAssistantController {

  handle = async (req: FastifyRequest, res: FastifyReply) => {
    const { assistantId, userMessage } = askAssistentSchema.parse(req.body);
    try {
      const sut = new OpenAiService();
      const response = await sut.askAssistantMessage(assistantId, userMessage);

      return res.status(200).send({ message: response});
    } catch (err) {
      return res.status(400).send({ err: err.message })
    }
  }
}