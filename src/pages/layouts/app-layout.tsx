import { ReactNode } from 'react'
import { Box, useColorModeValue, Drawer, DrawerContent, useDisclosure } from '@chakra-ui/react'
import { NavbarContent, NavbarMobile } from '../../components/layout'
import { APP_ROUTES } from '../../routes'

const AppLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      <NavbarContent
        links={[...APP_ROUTES]}
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <NavbarContent links={[...APP_ROUTES]} onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <NavbarMobile display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box as="main" ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  )
}

export { AppLayout }
