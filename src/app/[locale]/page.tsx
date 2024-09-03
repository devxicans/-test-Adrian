import { Hero } from './sections';
import { Header } from './sections';
import { verifySession } from '@/lib';

export default async function Home() {
  await verifySession();

  return (
    <>
      <Header />
    <main>
      <Hero />
    </main>
    </>
  );
}