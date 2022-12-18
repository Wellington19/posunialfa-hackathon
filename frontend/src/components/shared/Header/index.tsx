import React from 'react'
import { Flex, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react'
import { RiMenuLine } from 'react-icons/ri'
import { Logo } from '@componentsShared/exports'
import { useSideBarContext } from '@contexts/SideBarContext'
import { Profile } from './Profile'

export function Header({ childVisible }) {
  const { onOpenCloseSideBar } = useSideBarContext()

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  return (
    <Flex
      as="header"
      w="100%"
      h="20"
      mx="auto"
      px="1"
      align="center"
      borderBottom="1px"
      borderColor="gray.200"
    >
      {childVisible && (
        <IconButton
          aria-label="Open navigation"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpenCloseSideBar}
          mr="2"
        />
      )}

      <Logo />

      <Flex align="center" ml="auto">
        {childVisible && <Profile showProfileData={isWideVersion} />}
      </Flex>
    </Flex>
  )
}
