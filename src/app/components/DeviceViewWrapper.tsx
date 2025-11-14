'use client';

import { useDeviceView } from '../contexts/DeviceViewContext';
import MobileSimulator from '../home/MobileSimulator';
import { ReactNode } from 'react';

export default function DeviceViewWrapper({ children }: { children: ReactNode }) {
  const { deviceView, isMounted } = useDeviceView();

  // Prevent hydration mismatch by only showing device-specific view after mount
  if (!isMounted) {
    return <>{children}</>;
  }

  if (deviceView === 'mobile') {
    return <MobileSimulator>{children}</MobileSimulator>;
  }

  return <>{children}</>;
}
