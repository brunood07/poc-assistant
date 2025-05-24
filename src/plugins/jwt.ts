import fp from 'fastify-plugin';
import fastifyJwt from '@fastify/jwt';
import '@fastify/jwt';            
import { env } from 'process';

export default fp(async (fastify) => {
  fastify.register(fastifyJwt, {
    secret: env.JWT_SECRET || '',
    sign: { expiresIn: '15m' },
  });

  fastify.decorate(
    'authenticate',
    async function (request, reply) {
      try {
        await request.jwtVerify();
      } catch {
        reply.code(401).send({ message: 'Token inválido ou expirado' });
      }
    },
  );
});
