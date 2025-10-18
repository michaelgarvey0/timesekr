import type { Metadata } from 'next';
import { Pivot } from '~/routes/Pivot';

export default function Page() {
  return <Pivot />;
}

export const metadata: Metadata = {
  title: 'Pivot',
}