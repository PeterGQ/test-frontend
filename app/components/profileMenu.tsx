'use client';

import {
  Box,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Skeleton,
} from '@chakra-ui/react';
import { useUser } from '@auth0/nextjs-auth0';
import { useState, useEffect } from 'react';

export default function ProfileMenu() {
  const { user, isLoading } = useUser();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Skeleton
        width="40px"
        height="40px"
        borderRadius="full"
      />
    );
  }

  return (
    <Menu>
      <MenuButton
        as={Button}
        p={0}
        bg="transparent"
        _hover={{ bg: 'whiteAlpha.200' }}
        _active={{ bg: 'whiteAlpha.200' }}
        rounded="full"
      >
        <Avatar
          size="sm"
          src={user?.picture ?? undefined}
          name={user?.name ?? 'User'}
        />
      </MenuButton>
      <MenuList
        bg="gray.800"
        borderColor="gray.700"
        p={0}
      >
        <MenuItem
          as="a"
          href="/profile"
          _hover={{ bg: 'whiteAlpha.200' }}
          _focus={{ bg: 'whiteAlpha.200' }}
          color="white"
        >
          Profile
        </MenuItem>
        <MenuItem
          as="a"
          href="/auth/logout"
          _hover={{ bg: 'whiteAlpha.200' }}
          _focus={{ bg: 'whiteAlpha.200' }}
          color="white"
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
