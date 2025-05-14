import { FastifyRequest, FastifyReply } from 'fastify'
import { OpenAiService } from '../service/openai-service'

export class CreateAssistantController {

  handle = async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const sut = new OpenAiService();
      const response = await sut.createAssistant();

      return res.status(200).send({ message: response});
    } catch (err) {
      return res.status(400).send({ err: err.message })
    }
  }
}