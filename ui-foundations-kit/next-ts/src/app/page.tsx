import type { Metadata } from 'next';
import { Homepage } from '~/routes/Homepage';

export default function Page() {
  return <Homepage />;
}

export const metadata: Metadata = {
  title: 'Homepage',
}