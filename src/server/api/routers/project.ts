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
      orderBy: [{ isImportant: 'desc' }, { createdAt: 'desc' }],
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
        isImportant: z.boolean().optional(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.project.update({
        where: { id: input.id },
        data: {
          name: input.name,
          endDate: input.endDate,
          startDate: input.startDate,
          description: input.description,
          isImportant: input.isImportant,
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
