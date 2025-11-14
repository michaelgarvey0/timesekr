import type { Metadata } from "next";
import ThemeRegistry from './ThemeRegistry';
import { DeviceViewProvider } from './contexts/DeviceViewContext';
import DeviceViewWrapper from './components/DeviceViewWrapper';
// Lexend font (current)
import '@fontsource/lexend/300.css';
import '@fontsource/lexend/600.css';
// IBM Plex Sans font (previous - keep for easy revert)
// import '@fontsource/ibm-plex-sans/300.css';
// import '@fontsource/ibm-plex-sans/400.css';
// import '@fontsource/ibm-plex-sans/500.css';
// import '@fontsource/ibm-plex-sans/600.css';
import "./globals.css";

export const metadata: Metadata = {
  title: "timesēkr",
  description: "Find meeting times across organizations, instantly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <DeviceViewProvider>
            <DeviceViewWrapper>
              {children}
            </DeviceViewWrapper>
          </DeviceViewProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
