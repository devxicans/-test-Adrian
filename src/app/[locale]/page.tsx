import { Hero } from './sections';
import { Header } from './sections';

export default async function Home() {

  return (
    <>
      <Header />
    <main>
      <Hero />
    </main>
    </>
  );
}