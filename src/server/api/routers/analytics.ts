import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const analyticsRouter = createTRPCRouter({
  getProjectTasksCount: publicProcedure
    .input(z.object({ projectId: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.task.count({
        where: { projectId: input.projectId },
      });
    }),

  getCompletedTasksCount: publicProcedure
    .input(z.object({ projectId: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.task.count({
        where: { projectId: input.projectId, isCompleted: true },
      });
    }),

  getOverdueTasksCount: publicProcedure
    .input(z.object({ projectId: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.task.count({
        where: { projectId: input.projectId, endDate: { lt: new Date() } },
      });
    }),

  getTasksWithoutDateCount: publicProcedure
    .input(z.object({ projectId: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.task.count({
        where: { projectId: input.projectId, startDate: undefined, endDate: undefined },
      });
    }),

  getProjectMonitoringStats: publicProcedure
    .input(z.object({ projectId: z.number() }))
    .query(async ({ ctx, input }) => {
      return {
        count: await ctx.db.task.count({ where: { projectId: input.projectId } }),
        completedCount: await ctx.db.task.count({
          where: { projectId: input.projectId, isCompleted: true },
        }),
        overdueCount: await ctx.db.task.count({
          where: { projectId: input.projectId, endDate: { lt: new Date() } },
        }),
        withoutDateCount: await ctx.db.task.count({
          where: { projectId: input.projectId, startDate: null, endDate: null },
        }),
      };
    }),
});
