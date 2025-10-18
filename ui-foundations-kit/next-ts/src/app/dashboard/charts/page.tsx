import type { Metadata } from 'next';
import { Charts } from '~/routes/Charts';

export default function Page() {
  return <Charts />;
}

export const metadata: Metadata = {
  title: 'Charts',
}