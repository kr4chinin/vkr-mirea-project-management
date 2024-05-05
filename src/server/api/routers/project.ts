import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const projectRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.project.create({
        data: {
          name: input.name,
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.project.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }),

  getOne: publicProcedure.input(z.object({ id: z.number() })).query(({ ctx, input }) => {
    return ctx.db.project.findUniqueOrThrow({
      where: { id: input.id },
    });
  }),

  updateProjectCompleteStatus: publicProcedure
    .input(z.object({ id: z.number(), isCompleted: z.boolean() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.project.update({
        where: { id: input.id },
        data: { isCompleted: input.isCompleted },
      });
    }),
});
