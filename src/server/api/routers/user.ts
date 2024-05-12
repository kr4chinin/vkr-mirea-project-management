import { clerkClient } from '@clerk/nextjs/server';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { type ClientUser } from '~/lib/models/ClientUser';

export const userRouter = createTRPCRouter({
  getAll: publicProcedure.query(async (): Promise<ClientUser[]> => {
    const { data: clerkUsers } = await clerkClient.users.getUserList({
      limit: 100,
    });

    return clerkUsers.map<ClientUser>(u => ({
      id: u.id,
      imageUrl: u.imageUrl,
      lastName: u.lastName ?? 'Неизвестно',
      firstName: u.firstName ?? 'Неизвестно',
    }));
  }),
});
