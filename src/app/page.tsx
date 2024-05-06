import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function Home() {
  const { userId } = auth();

  if (!userId) return redirect('/sign-in');

  return null;
}
