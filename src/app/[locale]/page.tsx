import { Hero } from './sections';
import { Header } from './sections';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { decrypt } from '@/lib';


export default async function Home() {
  const cookie = cookies().get('session')?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect('/register');
  }

  return (
    <>
      <Header />
    <main>
      <Hero />
    </main>
    </>
  );
}