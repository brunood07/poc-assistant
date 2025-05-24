import Fastify from "fastify"
import jwtPlugin from './plugins/jwt';
import { openAiRoutes } from "./routes/openai-routes";
import { authRoutes } from "./routes/auth-routes";

const main = async () => {
  const app = Fastify();

  app.register(jwtPlugin);
  app.register(authRoutes, { prefix: "/auth" });
  app.register(openAiRoutes);

  await app.listen({ port: 3000 }, () => {
    console.log("server is running on port 3000")
  })
}

main();