import type { Metadata } from 'next';
import { Checkout } from '~/routes/Checkout';

export default function Page() {
  return <Checkout />;
}

export const metadata: Metadata = {
  title: 'Checkout',
}