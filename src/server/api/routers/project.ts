import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { clerkClient } from '@clerk/nextjs/server';

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

  getAll: publicProcedure.query(async ({ ctx }) => {
    const projects = await ctx.db.project.findMany({
      orderBy: [{ isImportant: 'desc' }, { createdAt: 'desc' }],
    });

    return projects.map(project => {
      return {
        ...project,
        particpantsIds:
          project.particpantsIds && typeof project.particpantsIds === 'string'
            ? (JSON.parse(project.particpantsIds) as string[])
            : [],
      };
    });
  }),

  getProjectCreator: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const { createdBy } = await ctx.db.project.findUniqueOrThrow({
        where: { id: input.id },
        select: { createdBy: true },
      });

      return clerkClient.users.getUser(createdBy);
    }),

  getOne: publicProcedure.input(z.object({ id: z.number() })).query(async ({ ctx, input }) => {
    const project = await ctx.db.project.findUniqueOrThrow({
      where: { id: input.id },
    });

    return {
      ...project,
      particpantsIds:
        project.particpantsIds && typeof project.particpantsIds === 'string'
          ? (JSON.parse(project.particpantsIds) as string[])
          : [],
    };
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
        participants: z.array(z.string().trim()).optional(),
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
          particpantsIds: input.participants ? JSON.stringify(input.participants) : undefined,
        },
      });
    }),

  updateProjectCompleteStatus: publicProcedure
    .input(z.object({ id: z.number(), isCompleted: z.boolean() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.project.update({
        where: { id: input.id },
        data: input.isCompleted
          ? { isCompleted: input.isCompleted, isImportant: false }
          : { isCompleted: input.isCompleted },
      });
    }),
});
