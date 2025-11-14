'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type DeviceView = 'desktop' | 'mobile';

interface DeviceViewContextType {
  deviceView: DeviceView;
  setDeviceView: (view: DeviceView) => void;
}

const DeviceViewContext = createContext<DeviceViewContextType | undefined>(undefined);

export function DeviceViewProvider({ children }: { children: ReactNode }) {
  const [deviceView, setDeviceView] = useState<DeviceView>('desktop');

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('deviceView') as DeviceView;
    if (saved) {
      setDeviceView(saved);
    }
  }, []);

  // Save to localStorage when changed
  const handleSetDeviceView = (view: DeviceView) => {
    setDeviceView(view);
    localStorage.setItem('deviceView', view);
  };

  return (
    <DeviceViewContext.Provider value={{ deviceView, setDeviceView: handleSetDeviceView }}>
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
