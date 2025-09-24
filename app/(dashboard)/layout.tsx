'use client';

import { useState,useEffect } from 'react';
import {
  Box,
  Flex,
  IconButton,
  useDisclosure,
  Heading,
  Text,
  Button,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import Sidebar from '@/app/components/sidebar';
import { getAccessToken } from "@auth0/nextjs-auth0";
import { redirect } from 'next/dist/server/api-utils';

const useUser = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user data after a short delay
    const timer = setTimeout(() => {
      setUser({ name: 'Jane Doe', email: 'jane.doe@example.com' });
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  return { user, isLoading, getAccessToken };
};


const Spinner = ({ size = '24px' }: { size?: string }) => (
    <div style={{
        border: '4px solid rgba(255, 255, 255, 0.3)',
        borderTop: '4px solid white',
        borderRadius: '50%',
        width: size,
        height: size,
        animation: 'spin 1s linear infinite'
    }}>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
);

const LoadingScreen = () => {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#1A202C', minHeight: '100vh', color: 'white',
      fontFamily: 'sans-serif'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Spinner size="48px" />
        <p style={{ marginTop: '1rem' }}>Loading Your Dashboard...</p>
      </div>
    </div>
  );
};

export default function DashboardLayout({
  children, // This prop will be the content of our pages (e.g., dashboard/page.tsx)
}: {
  children: React.ReactNode;
}) {
  // We use React's useState instead of Chakra's useDisclosure
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const onToggle = () => setSidebarOpen(!sidebarOpen);

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      {/* The Sidebar is now part of the layout, so it will always be present */}
      <Sidebar isOpen={sidebarOpen} onToggle={onToggle} />

      {/* This div is the main content area that wraps the page content */}
      <div
        style={{
          marginLeft: sidebarOpen ? "240px" : "60px",
          transition: "margin-left 0.3s ease",
          background: "#1A202C", // gray.900
          minHeight: "100vh",
          color: "white"
        }}
      >
        {/* A persistent header */}
        <header style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0.75rem 1rem',
          borderBottom: '1px solid #2D3748' // gray.800
        }}>
           <button
             aria-label="Toggle Sidebar"
             onClick={onToggle}
             style={{
               background: 'transparent',
               border: 'none',
               color: 'white',
               cursor: 'pointer',
               fontSize: '1.5rem'
             }}
           >
             <HamburgerIcon />
           </button>
           {/* You could add more header items here, like a user profile dropdown */}
        </header>

        {/* This is where the content of the current page will be rendered */}
        <main style={{ padding: '1rem' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
// Note: The sidebar and header are now part of the layout, so they will persist across page navigations within the dashboard section.

// The children prop will contain the content of the specific page being rendered, such as dashboard/page.tsx.