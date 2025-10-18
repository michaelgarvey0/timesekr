import * as React from 'react';
const BroadcastTourProviderContext = React.createContext({
  activeTourName: 'welcome',
  broadcastTour: (_tourName) => {},
  isTourOpen: false,
  setIsTourOpen: (_) => {},
});
export function BroadcastTourProvider({ children }) {
  const broadcastTour = useBroadcastTourProvider();
  return (
    <BroadcastTourProviderContext.Provider value={broadcastTour}>
      {children}
    </BroadcastTourProviderContext.Provider>
  );
}
function useBroadcastTourProvider() {
  const [activeTourName, setActiveTourName] = React.useState('welcome');
  const [isTourOpen, setIsTourOpen] = React.useState(false);
  function broadcastTour(tourName) {
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
