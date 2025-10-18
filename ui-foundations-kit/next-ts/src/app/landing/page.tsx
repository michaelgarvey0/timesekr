import type { Metadata } from 'next';
import { Landing } from '~/routes/Landing';

export default function Page() {
  return <Landing />;
}

export const metadata: Metadata = {
  title: 'Landing',
}