'use client';

import './globals.css';
import NavBar from './components/navbar';
import React from 'react';
import { Auth0Provider } from '@auth0/nextjs-auth0';
import { Providers } from './providers';

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Auth0Provider>
          <Providers>
            <NavBar />
            {children}
          </Providers>
        </Auth0Provider>
      </body>
    </html>
  );
}