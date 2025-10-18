import * as React from 'react';
import { LoadingScreen } from '../components/LoadingScreen';
import { AppProviders } from '../context/AppProviders';
export const metadata = {
  title: 'UI Foundations Kit',
  description: 'A SaaS template built with MUI based on design and style of UI Foundations.',
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fontlay.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fontlay.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fontlay.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fontlay.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fontlay.com/css2?family=Manrope:wght@200..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AppProviders>
          <React.Suspense fallback={<LoadingScreen />}>{children}</React.Suspense>
        </AppProviders>
      </body>
    </html>
  );
}
