import { TaskStatus } from '@prisma/client';
import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const taskRouter = createTRPCRouter({
  getAll: publicProcedure.input(z.object({ projectId: z.number() })).query(({ ctx, input }) => {
    return ctx.db.task.findMany({
      where: { projectId: input.projectId },
      orderBy: { createdAt: 'desc' },
    });
  }),

  getProjectTasksCount: publicProcedure
    .input(z.object({ projectId: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.task.count({ where: { projectId: input.projectId } });
    }),

  createTask: publicProcedure
    .input(
      z.object({
        createdBy: z.string().min(1),
        name: z.string().trim().min(1),
        description: z.string().optional(),
        startDate: z.date().optional(),
        endDate: z.date().optional(),
        projectId: z.number(),
        status: z.nativeEnum(TaskStatus).optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.task.create({
        data: {
          createdBy: input.createdBy,
          name: input.name,
          description: input.description,
          startDate: input.startDate,
          endDate: input.endDate,
          projectId: input.projectId,
          status: input.status,
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
        status: z.nativeEnum(TaskStatus).optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.task.update({
        where: { id: input.id },
        data: {
          name: input.name,
          status: input.status,
          endDate: input.endDate,
          startDate: input.startDate,
          description: input.description,
          isCompleted: input.status === TaskStatus.DONE,
          completionDate: input.status === TaskStatus.DONE ? new Date() : null,
        },
      });
    }),

  changeTaskIsCompletedState: publicProcedure
    .input(z.object({ id: z.number(), isCompleted: z.boolean() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.task.update({
        where: { id: input.id },
        data: {
          isCompleted: input.isCompleted,
          completionDate: input.isCompleted ? new Date() : null,
          status: input.isCompleted ? TaskStatus.DONE : TaskStatus.IN_PROGRESS,
        },
      });
    }),

  delete: publicProcedure.input(z.object({ id: z.number() })).mutation(({ ctx, input }) => {
    return ctx.db.task.delete({ where: { id: input.id } });
  }),
});
