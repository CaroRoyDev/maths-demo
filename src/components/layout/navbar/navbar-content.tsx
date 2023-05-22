import React from 'react'
import {
  Box,
  CloseButton,
  Flex,
  useColorModeValue,
  BoxProps,
  useColorMode,
  IconButton,
} from '@chakra-ui/react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { NavbarLink } from './navbar-link'
import { AppRoute } from '../../../routes'

interface NavbarContentProps extends BoxProps {
  onClose: () => void
  links: AppRoute[]
}

const NavbarContent: React.FC<NavbarContentProps> = ({ onClose, links, ...rest }) => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      py={{ base: 0, md: 4 }}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex
        h="20"
        alignItems="center"
        mx="8"
        justifyContent="space-between"
        display={{ base: 'flex', md: 'none' }}
      >
        <CloseButton onClick={onClose} />
      </Flex>
      <Flex direction="column" justifyContent="space-between" height="100%">
        <Box>
          {links.map(link => (
            <NavbarLink key={link.id} {...link} />
          ))}
        </Box>
        <Box px="4" py="2" mx="4">
          <IconButton
            aria-label="toggle theme"
            rounded="full"
            size="sm"
            onClick={toggleColorMode}
            icon={colorMode === 'dark' ? <FaSun /> : <FaMoon />}
            variant="outline"
          />
        </Box>
      </Flex>
    </Box>
  )
}

export { NavbarContent }
