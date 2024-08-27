import { Hero } from './sections';
import { Header } from './sections';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('Header')

  return (
    <>
      <Header />
    <main>
      <Hero />
    </main>
    </>
  );
}
