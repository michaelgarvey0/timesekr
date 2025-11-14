'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type DeviceView = 'desktop' | 'mobile';

interface DeviceViewContextType {
  deviceView: DeviceView;
  setDeviceView: (view: DeviceView) => void;
  isMounted: boolean;
}

const DeviceViewContext = createContext<DeviceViewContextType | undefined>(undefined);

export function DeviceViewProvider({ children }: { children: ReactNode }) {
  const [deviceView, setDeviceView] = useState<DeviceView>('desktop');
  const [isMounted, setIsMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem('deviceView') as DeviceView;
    if (saved) {
      setDeviceView(saved);
    }
  }, []);

  // Save to localStorage when changed
  const handleSetDeviceView = (view: DeviceView) => {
    setDeviceView(view);
    if (typeof window !== 'undefined') {
      localStorage.setItem('deviceView', view);
    }
  };

  return (
    <DeviceViewContext.Provider value={{ deviceView, setDeviceView: handleSetDeviceView, isMounted }}>
      {children}
    </DeviceViewContext.Provider>
  );
}

export function useDeviceView() {
  const context = useContext(DeviceViewContext);
  if (context === undefined) {
    throw new Error('useDeviceView must be used within a DeviceViewProvider');
  }
  return context;
}
