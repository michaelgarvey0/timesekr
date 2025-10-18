'use client';
import * as React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
const themeCustomizationContext = React.createContext({
  activeColorScale: 'primary',
  setActiveColorScale: (colorScale) => {},
  activeRadiusScale: 'none',
  setActiveRadiusScale: (radiusScale) => {},
  activeFont: 'Inter',
  setActiveFont: (font) => {},
});
function useSettingsProvider() {
  const [activeColorScale, setActiveColorScale] = useLocalStorage('active-color', 'primary');
  const [activeRadiusScale, setActiveRadiusScale] = useLocalStorage('active-radius', 'md');
  const [activeFont, setActiveFont] = useLocalStorage('active-font', 'Inter');
  return {
    activeColorScale,
    setActiveColorScale,
    activeRadiusScale,
    setActiveRadiusScale,
    activeFont,
    setActiveFont,
  };
}
export function ThemeCustomizationProvider({ children, ...props }) {
  const settings = useSettingsProvider();
  return (
    <themeCustomizationContext.Provider value={settings} {...props}>
      {children}
    </themeCustomizationContext.Provider>
  );
}
// Hook that enables any component to subscribe to customization state
export const useThemeCustomization = () => {
  return React.useContext(themeCustomizationContext);
};
