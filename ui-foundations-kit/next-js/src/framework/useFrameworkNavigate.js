'use client';
import { useRouter } from 'next/navigation';
export function useFrameworkNavigate() {
  const router = useRouter();
  return router.push;
}
