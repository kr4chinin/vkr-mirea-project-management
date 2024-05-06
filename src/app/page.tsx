import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function MainPage() {
  const user = await currentUser();

  console.log(user);

  if (user) {
    redirect('/projects');
  } else {
    redirect('/sign-in');
  }
}
