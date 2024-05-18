import { analyticsRouter } from './routers/analytics';
import { projectRouter } from './routers/project';
import { taskRouter } from './routers/task';
import { userRouter } from './routers/user';
import { createCallerFactory, createTRPCRouter } from './trpc';

export const appRouter = createTRPCRouter({
  project: projectRouter,
  task: taskRouter,
  analytics: analyticsRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
