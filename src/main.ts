import Fastify from "fastify"
import { openAiRoutes } from "./routes/openai-routes";

const main = async () => {
  const app = Fastify();

  app.register(openAiRoutes);

  await app.listen({ port: 3000 }, () => {
    console.log("server is running on port 3000")
  })
}

main();