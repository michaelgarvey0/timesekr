import type { Metadata } from 'next';
import { Changelog } from '~/routes/Changelog';

export default function Page() {
  return <Changelog />;
}

export const metadata: Metadata = {
  title: 'Changelog',
}