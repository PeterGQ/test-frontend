'use client';

import {
  Box,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Image,
  HStack,
  Icon,
  Skeleton,
} from '@chakra-ui/react';
import { FiSearch, FiBell, FiMessageSquare } from 'react-icons/fi';
import ProfileMenu from './profileMenu';
import { useState, useEffect } from 'react';

export default function NavBar() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

 useEffect(() => {
    const checkServerEnvironment = async () => {
      // We only run the check once the user object is loaded to avoid unnecessary calls.
        console.log("CLIENT: Triggering server environment variable check...");
        try {
          const response = process.env.NEXT_PUBLIC_API_URL;
          

        } catch (error) {
          console.error("CLIENT: Failed to fetch server environment variables.", error);
      }
    };
 checkServerEnvironment();
  }); //

  if (!mounted) {
    return (
      <Box
        as="nav"
        position="fixed"
        w="100%"
        h="60px"
        bg="gray.800"
        borderBottom="1px"
        borderBottomColor="gray.700"
        zIndex={30}
      />
    );
  }

  return (
    <Box 
      as="nav"
      position="fixed"
      w="100%"
      h="60px"
      bg="gray.800"
      borderBottom="1px"
      borderBottomColor="gray.700"
      zIndex={30}
    >
      <Flex h="full" alignItems="center" mx="auto" px={4}>
        {/* Logo */}
        <Box w="40px" h="40px" position="relative" ml="60px" display="flex" alignItems="center">
          <Image
            src="/logo-placeholder.svg"
            alt="Logo"
            style={{ width: '32px', height: '32px' }}
          />
        </Box>

        {/* Search Bar */}
        <InputGroup maxW="400px" mx={8}>
          <InputLeftElement pointerEvents="none">
            <Icon as={FiSearch} color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Search..."
            variant="filled"
            bg="gray.700"
            _hover={{ bg: 'gray.600' }}
            _focus={{ bg: 'gray.600', borderColor: 'blue.400' }}
            border="1px solid"
            borderColor="gray.600"
          />
        </InputGroup>

        {/* Right Side Icons */}
        <HStack spacing={4} ml="auto">
          <IconButton
            aria-label="Notifications"
            icon={<FiBell />}
            variant="ghost"
            color="gray.400"
            _hover={{ color: 'white', bg: 'whiteAlpha.200' }}
          />
          <IconButton
            aria-label="Messages"
            icon={<FiMessageSquare />}
            variant="ghost"
            color="gray.400"
            _hover={{ color: 'white', bg: 'whiteAlpha.200' }}
          />
          <ProfileMenu />
        </HStack>
      </Flex>
    </Box>
  );
}