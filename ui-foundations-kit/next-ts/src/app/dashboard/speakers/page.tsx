import type { Metadata } from 'next';
import { Speakers } from '~/routes/Speakers';

export default function Page() {
  return <Speakers />;
}

export const metadata: Metadata = {
  title: 'Speakers',
}