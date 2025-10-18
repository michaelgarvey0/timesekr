import type { Metadata } from 'next';
import { Login } from '~/routes/Login';

export default function Page() {
  return <Login />;
}

export const metadata: Metadata = {
  title: 'Login',
}