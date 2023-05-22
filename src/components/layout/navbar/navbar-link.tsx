import React from 'react'
import { Link } from '@chakra-ui/react'
import { AppRoute } from '../../../routes'
import { NavLink } from 'react-router-dom'

type NavbarLinkProps = AppRoute

const NavbarLink: React.FC<NavbarLinkProps> = ({ path, displayName }) => {
  return (
    <Link
      to={path}
      as={NavLink}
      style={{ textDecoration: 'none' }}
      display="block"
      px="4"
      py="2"
      mx="4"
      fontWeight={500}
      borderRadius="lg"
      cursor="pointer"
      _activeLink={{
        fontWeight: 600,
        '&::before': {
          content: '"# "',
        },
      }}
    >
      {displayName}
    </Link>
  )
}

export { NavbarLink }
