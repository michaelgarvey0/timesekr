'use client'
import * as React from 'react';
import useLocalStorage from '~/hooks/useLocalStorage';
import { AvailColorScale, AvailFont, AvailRadiusScale } from '~/theme';

const themeCustomizationContext = React.createContext({
  activeColorScale: 'primary',
  setActiveColorScale: (colorScale: AvailColorScale) => {},
  activeRadiusScale: 'none',
  setActiveRadiusScale: (radiusScale: AvailRadiusScale) => {},
  activeFont: 'Inter',
  setActiveFont: (font: AvailFont) => {},
});

function useSettingsProvider() {
  const [activeColorScale, setActiveColorScale] = useLocalStorage<AvailColorScale>(
    'active-color',
    'primary',
  );
  const [activeRadiusScale, setActiveRadiusScale] = useLocalStorage<AvailRadiusScale>(
    'active-radius',
    'md',
  );
  const [activeFont, setActiveFont] = useLocalStorage<AvailFont>('active-font', 'Inter');

  return {
    activeColorScale,
    setActiveColorScale,
    activeRadiusScale,
    setActiveRadiusScale,
    activeFont,
    setActiveFont,
  };
}

export function ThemeCustomizationProvider({ children, ...props }: { children: React.ReactNode }) {
  const settings = useSettingsProvider();
  return (
    <themeCustomizationContext.Provider value={settings} {...props}>
      {children}
    </themeCustomizationContext.Provider>
  );
}

// Hook that enables any component to subscribe to customization state
export const useThemeCustomization = () => {
  return React.useContext(themeCustomizationContext) as {
    activeColorScale: AvailColorScale;
    setActiveColorScale: (colorScale: AvailColorScale) => void;
    activeRadiusScale: AvailRadiusScale;
    setActiveRadiusScale: (radiusScale: AvailRadiusScale) => void;
    activeFont: AvailFont;
    setActiveFont: (font: AvailFont) => void;
  };
};
