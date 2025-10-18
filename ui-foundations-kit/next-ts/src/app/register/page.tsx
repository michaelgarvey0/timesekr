import type { Metadata } from 'next';
import { Register } from '~/routes/Register';

export default function Page() {
  return <Register />;
}

export const metadata: Metadata = {
  title: 'Register',
}