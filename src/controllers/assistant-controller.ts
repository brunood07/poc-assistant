import { FastifyRequest, FastifyReply } from 'fastify'
import { OpenAiService } from '../service/openai-service'
import { z } from 'zod';

const assistentSchema = z.object({
  message: z.string(),
});

export class AssistantController {

  handle = async (req: FastifyRequest, res: FastifyReply) => {
    const body = assistentSchema.parse(req.body);
    try {
      const sut = new OpenAiService();
      const response = await sut.askOpenAiAssistent(body.message);

      return res.status(200).send({ message: response});
    } catch (err) {
      return res.status(400).send({ err: err.message })
    }
  }
}