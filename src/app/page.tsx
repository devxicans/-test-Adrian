import styles from './page.module.css';
import { Hero } from './sections';
import { Header } from './sections';

export default function Home() {
  return (
    <>
    <Header />
    <main>
      <Hero />
    </main>
    </>
  );
}
