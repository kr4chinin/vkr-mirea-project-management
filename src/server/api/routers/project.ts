import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const projectRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ createdBy: z.string().min(1), name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.project.create({
        data: {
          name: input.name,
          createdBy: input.createdBy,
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

  updateProject: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().optional(),
        description: z.string().optional(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.project.update({
        where: { id: input.id },
        data: {
          name: input.name,
          description: input.description,
          startDate: input.startDate,
          endDate: input.endDate,
        },
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
