'use client';

import { useDeviceView } from '../contexts/DeviceViewContext';
import MobileSimulator from '../home/MobileSimulator';
import { ReactNode } from 'react';

export default function DeviceViewWrapper({ children }: { children: ReactNode }) {
  const { deviceView } = useDeviceView();

  if (deviceView === 'mobile') {
    return <MobileSimulator>{children}</MobileSimulator>;
  }

  return <>{children}</>;
}
