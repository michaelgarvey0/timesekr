import type { Metadata } from 'next';
import { Account } from '~/routes/Account';

export default function Page() {
  return <Account />;
}

export const metadata: Metadata = {
  title: 'Account',
}