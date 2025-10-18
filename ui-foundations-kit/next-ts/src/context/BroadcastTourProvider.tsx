'use client'
import * as React from 'react';

import { TourIds } from '~/data/tours';

const BroadcastTourProviderContext = React.createContext({
  activeTourName: 'welcome',
  broadcastTour: (_tourName: TourIds) => {},
  isTourOpen: false,
  setIsTourOpen: (_: boolean) => {},
});

export function BroadcastTourProvider({ children }: { children: React.ReactNode }) {
  const broadcastTour = useBroadcastTourProvider();

  return (
    <BroadcastTourProviderContext.Provider value={broadcastTour}>
      {children}
    </BroadcastTourProviderContext.Provider>
  );
}

function useBroadcastTourProvider() {
  const [activeTourName, setActiveTourName] = React.useState<TourIds>('welcome');
  const [isTourOpen, setIsTourOpen] = React.useState<boolean>(false);

  function broadcastTour(tourName: TourIds) {
    setActiveTourName(tourName);
    setIsTourOpen(true);
  }

  return {
    activeTourName,
    broadcastTour,
    isTourOpen,
    setIsTourOpen,
  };
}

export const useBroadcastTour = () => {
  return React.useContext(BroadcastTourProviderContext);
};
