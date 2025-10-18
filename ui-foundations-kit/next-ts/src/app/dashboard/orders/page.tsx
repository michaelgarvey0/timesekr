import type { Metadata } from 'next';
import { Orders } from '~/routes/Orders';

export default function Page() {
  return <Orders />;
}

export const metadata: Metadata = {
  title: 'Orders',
}