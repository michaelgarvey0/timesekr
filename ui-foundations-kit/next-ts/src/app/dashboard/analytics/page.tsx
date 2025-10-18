import type { Metadata } from 'next';
import { Analytics } from '~/routes/Analytics';

export default function Page() {
  return <Analytics />;
}

export const metadata: Metadata = {
  title: 'Analytics',
}