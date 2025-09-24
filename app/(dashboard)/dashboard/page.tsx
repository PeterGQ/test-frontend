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

export default function Dashboard() {
  async function fetchData() {
    try {
      const token = await getAccessToken();
      // call external API with token...
    } catch (err) {
      // err will be an instance of AccessTokenError if an access token could not be obtained
    }
  }
  const { isOpen: sidebarOpen, onToggle } = useDisclosure({ defaultIsOpen: true });

  // State to hold our fetched data, loading status, and errors
  const [data, setData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();
  

  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced' | 'error'>('idle');
  const [syncError, setSyncError] = useState<string | null>(null);

  // State to hold the user's subscription plan
  const [subscriptionPlan, setSubscriptionPlan] = useState<string | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isManaging, setIsManaging] = useState(false);
  
  // This useEffect hook runs once when the user information is available.
  useEffect(() => {
    if (user && syncStatus === 'idle') {
      const onboardUser = async () => {
        setSyncStatus('syncing');
        setSyncError(null);
        try {
          const token = await getAccessToken();
          console.log("--- DECODE THIS ACCESS TOKEN ---");
          console.log(token);
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/onboard`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.description || `Backend responded with status: ${response.status}`);
          }
          const result = await response.json();
          console.log('Onboarding status:', result.message);
          setSyncStatus('synced');
        } catch (err: unknown) {
          console.error('Failed to sync user with backend:', err);
          if (err instanceof Error) {
            setSyncError(err.message);
          } else {
            setSyncError('An unknown error occurred during user sync.');
          }
          setSyncStatus('error');
        }
      };
      onboardUser();
    }
  }, [user, syncStatus]);


  // Fetch the user's subscription plan when the user data is available
  useEffect(() => {
    const fetchUserStatus = async () => {
      if (user) {
        try {
          const token = await getAccessToken(); // In a real app, fetch this securely
          const response = await fetch('/api/user/status', {
            headers: { 'Authorization': `Bearer ${token}` },
          });

          if (!response.ok) throw new Error('Failed to fetch status');
          const data = await response.json();
          setSubscriptionPlan(data.subscription_plan);
        } catch (error) {
          console.error('Error fetching user status:', error);
          setSubscriptionPlan('free'); // Default to 'free' on error
        }
      }
    };
    fetchUserStatus();
  }, [user]);
  

  const handleFetchError = async () => {
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      // This fetch runs in the browser when the button is clicked
      const token = await getAccessToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/create-checkout-session`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

      if (!response.ok) {
        // Handle HTTP errors like 500
        throw new Error(`Backend responded with status: ${response.status}`);
      }
      else if (response.ok)
      {
       const session = await response.json();

  // 2. Then, use the 'url' property from the JSON for the redirect
        if (session.url) {
          // CORRECT: This is how you redirect on the client-side
          window.location.href = session.url;
        }
      }
      
      const result = await response.json(); // The /error endpoint returns JSON
      setData(JSON.stringify(result, null, 2));

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
      console.error('Fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Event handlers for Stripe actions
  const handleCheckout = async () => {
    setIsCheckingOut(true);
    // In a real app, this would fetch a token and call the checkout endpoint
    try {
      // This fetch runs in the browser when the button is clicked
      const token = await getAccessToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/create-checkout-session`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

      if (!response.ok) {
        // Handle HTTP errors like 500
        throw new Error(`Backend responded with status: ${response.status}`);
      }
      else if (response.ok)
      {
       const session = await response.json();

  // 2. Then, use the 'url' property from the JSON for the redirect
        if (session.url) {
          // CORRECT: This is how you redirect on the client-side
          window.location.href = session.url;
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
      console.error('Fetch error:', err);
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleManageSubscription = async () => {
    setIsManaging(true);
    // In a real app, this would fetch a token and call the portal endpoint
    try {
      // This fetch runs in the browser when the button is clicked
      const token = await getAccessToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/create-portal-session`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

      if (!response.ok) {
        // Handle HTTP errors like 500
        throw new Error(`Backend responded with status: ${response.status}`);
      }
      else if (response.ok)
      {
       const session = await response.json();

  // 2. Then, use the 'url' property from the JSON for the redirect
        if (session.url) {
          // CORRECT: This is how you redirect on the client-side
          window.location.href = session.url;
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
      console.error('Fetch error:', err);
    } finally {
      setIsCheckingOut(false);
    }
    // Simulating redirect logic
    setTimeout(() => {
       // window.location.href = session.url;
       setIsManaging(false);
    }, 1500);
  };
  

  // If still loading user or subscription plan, show loading screen
  if (isLoading || !subscriptionPlan) {
    return <LoadingScreen />;
  }

  return (
    <Box>
      <Box
        ml={{ base: sidebarOpen ? "240px" : "60px", md: sidebarOpen ? "240px" : "60px" }}
        pt="60px" // Added top padding to account for navbar height
        transition="margin-left 0.3s ease"
        bg="gray.800"
        minH="100vh"
        color="white"
      >
        <Flex px={4} py={4} alignItems="center" justifyContent="space-between">
          <IconButton
            aria-label="Toggle Sidebar"
            icon={<HamburgerIcon />}
            onClick={onToggle}
            variant="outline"
            size="md"
            display={{ base: 'flex', md: 'none' }}
          />
          <Heading size="lg">Dashboard</Heading>
        </Flex>
        
        <Box p={4}>
          <Heading size="md" mb={4}>Welcome to your dashboard</Heading>
          <div style={{ padding: '1rem', backgroundColor: '#4A5568', borderRadius: '0.375rem', maxWidth: '42rem' }}>
            <h3 style={{ fontSize: '1.125rem', marginBottom: '0.75rem' }}>Account Status</h3>
            {syncStatus === 'syncing' && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <p>Syncing your account with our records...</p>
              </div>
            )}
            {syncStatus === 'synced' && (
              <div style={{ padding: '0.75rem', backgroundColor: '#38A169', borderRadius: '0.375rem' }}>
                Your account is ready and synced.
              </div>
            )}
            {syncStatus === 'error' && (
              <div style={{ padding: '0.75rem', backgroundColor: '#E53E3E', borderRadius: '0.375rem' }}>
                There was an error syncing your account: {syncError}
              </div>
            )}
          </div>
          {/* Section for testing the backend call */}
          <Box p={4} bg="gray.700" rounded="md">
            <Heading size="sm" mb={3}>Test Backend Connection</Heading>
            <Button
              onClick={handleFetchError}
              isLoading={isLoading}
              colorScheme="blue"
            >
              Trigger /error Endpoint
            </Button>
            
            <Box mt={4} p={3} bg="gray.900" rounded="md" minH="80px" fontFamily="monospace">
              <Text fontSize="sm">API Response:</Text>
              {error && <Text color="red.400"><strong>Error:</strong> {error}</Text>}
              {data && <Text color="green.400"><strong>Success:</strong> <pre>{data}</pre></Text>}
            </Box>
            <Box mt={6} p={4} bg="gray.700" rounded="md">
              <Heading size="sm" mb={3}>Subscription Management</Heading>
              <Text mb={3}>Current Plan: <strong>{subscriptionPlan || 'Loading...'}</strong></Text> 

              {/* Buttons to handle checkout and manage subscription */}
              {subscriptionPlan === 'free' && (
              <Button
                onClick={handleCheckout}
                isLoading={isCheckingOut}
                colorScheme="green"
                mr={3}
              >
                Upgrade Plan
              </Button>
              )}

              {/* Only show "Manage Subscription" if not on free plan */}
              {subscriptionPlan !== 'free' && (
                <Button onClick={handleManageSubscription} isLoading={isManaging} colorScheme="blue">
                  Manage Subscription
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
