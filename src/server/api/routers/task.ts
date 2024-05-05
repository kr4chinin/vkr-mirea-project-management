import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const taskRouter = createTRPCRouter({
  getAll: publicProcedure.input(z.object({ projectId: z.number() })).query(({ ctx, input }) => {
    return ctx.db.task.findMany({
      where: { projectId: input.projectId },
    });
  }),

  createTask: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().optional(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
        projectId: z.number(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.task.create({
        data: {
          name: input.name,
          description: input.description,
          startDate: input.startDate,
          endDate: input.endDate,
          projectId: input.projectId,
        },
      });
    }),

  updateTask: publicProcedure
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
      return ctx.db.task.update({
        where: { id: input.id },
        data: {
          name: input.name,
          description: input.description,
          startDate: input.startDate,
          endDate: input.endDate,
        },
      });
    }),
});
