'use client';

import { Box, VStack, Text, Divider, Icon, Flex, IconButton } from '@chakra-ui/react';
import { 
  FiHome, 
  FiUser, 
  FiDollarSign, 
  FiClock, 
  FiSettings, 
  FiHelpCircle,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface NavItemProps {
  icon: any;
  children: string;
  href: string;
  isOpen: boolean;
}

const NavItem = ({ icon, children, href, isOpen }: NavItemProps) => {
  return (
    <Box
      as="a"
      href={href}
      display="flex"
      alignItems="center"
      p={2}
      borderRadius="md"
      _hover={{ bg: 'gray.700', textDecoration: 'none' }}
      w="full"
      color="white"
      cursor="pointer"
    >
      <Icon as={icon} boxSize="20px" />
      <Text 
        ml={3} 
        opacity={isOpen ? 1 : 0} 
        transition="opacity 0.3s"
        whiteSpace="nowrap"
      >
        {children}
      </Text>
    </Box>
  );
};

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const recentItems = [
    { name: 'Project A', href: '/projects/a' },
    { name: 'Project B', href: '/projects/b' },
  ];

  return (
    <Box
      as="nav"
      pos="fixed"
      left={0}
      top="60px"
      w={isOpen ? "240px" : "60px"}
      h="calc(100vh - 60px)"
      bg="gray.900"
      transition="width 0.3s ease"
      overflowX="hidden"
      borderRight="1px"
      borderRightColor="gray.600"
      zIndex={20}
    >
      <Flex direction="column" h="full">
        {/* Logo Area */}
        <Flex p={4} alignItems="center" justifyContent={isOpen ? "space-between" : "center"}>
          {isOpen && (
            <Text 
              fontSize="xl" 
              fontWeight="bold"
            >
              Logo
            </Text>
          )}
          <IconButton
            aria-label="Toggle Sidebar"
            icon={isOpen ? <FiChevronLeft /> : <FiChevronRight />}
            onClick={onToggle}
            variant="ghost"
            color="gray.400"
            _hover={{ color: 'white', bg: 'whiteAlpha.200' }}
            size="sm"
          />
        </Flex>

        <VStack spacing={4} align="stretch" flex="1">
          {/* Main Navigation */}
          <Box p={4}>
            <NavItem icon={FiHome} href="/dashboard" isOpen={isOpen}>Dashboard</NavItem>
            <NavItem icon={FiUser} href="/profile" isOpen={isOpen}>Profile</NavItem>
            <NavItem icon={FiDollarSign} href="/pricing" isOpen={isOpen}>Pricing</NavItem>
          </Box>

          {/* Recent Section */}
          <Box p={4}>
            <Text 
              color="gray.400" 
              fontSize="sm" 
              mb={2}
              opacity={isOpen ? 1 : 0}
              transition="opacity 0.3s"
            >
              RECENT
            </Text>
            {recentItems.map((item) => (
              <NavItem key={item.name} icon={FiClock} href={item.href} isOpen={isOpen}>
                {item.name}
              </NavItem>
            ))}
          </Box>

          {/* Bottom Links */}
          <Box mt="auto" p={4}>
            <Divider mb={4} />
            <NavItem icon={FiSettings} href="/settings" isOpen={isOpen}>Settings</NavItem>
            <NavItem icon={FiHelpCircle} href="/help" isOpen={isOpen}>Help & Support</NavItem>
          </Box>
        </VStack>
      </Flex>
    </Box>
  );
}
