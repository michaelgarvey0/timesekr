import type { Metadata } from 'next';
import { Home } from '~/routes/Home';

export default function Page() {
  return <Home />;
}

export const metadata: Metadata = {
  title: 'Home',
}