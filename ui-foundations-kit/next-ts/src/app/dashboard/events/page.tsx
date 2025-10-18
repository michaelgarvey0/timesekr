import type { Metadata } from 'next';
import { Events } from '~/routes/Events';

export default function Page() {
  return <Events />;
}

export const metadata: Metadata = {
  title: 'Events',
}