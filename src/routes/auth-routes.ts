import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { hashPassword, verifyPassword } from '../utils/hash-utils';
import { prisma } from '../db/prisma';

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post('/register', async (request, reply) => {
    console.log("TeSTE")
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { email, password } = bodySchema.parse(request.body);
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return reply.status(400).send({ message: 'Email já registrado' });

    const hashed = await hashPassword(password);

    const user = await prisma.user.create({
      data: { email, password: hashed },
    });

    return reply.status(201).send({ id: user.id, email: user.email });
  });

  fastify.post('/login', async (request, reply) => {
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string(),
    });

    const { email, password } = bodySchema.parse(request.body);

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await verifyPassword(password, user.password))) {
      return reply.status(401).send({ message: 'Credenciais inválidas' });
    }

    const accessToken = fastify.jwt.sign({ id: user.id }, { expiresIn: '15m' });
    const refreshToken = fastify.jwt.sign({ id: user.id }, { expiresIn: '7d' });

    return reply.send({ accessToken, refreshToken });
  });

  fastify.post('/refresh', async (request, reply) => {
    try {
      const bodySchema = z.object({
        refreshToken: z.string(),
      });

      const { refreshToken } = bodySchema.parse(request.body);
      const payload = fastify.jwt.verify(refreshToken);

      const accessToken = fastify.jwt.sign({ id: (payload as any).id }, { expiresIn: '15m' });
      return reply.send({ accessToken });
    } catch (err) {
      return reply.status(401).send({ message: 'Refresh token inválido' });
    }
  });
}
