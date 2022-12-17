import React from 'react'
import { Flex, Box, Text, Avatar } from '@chakra-ui/react'
import { useAuthContext } from '@contexts/AuthContext'

interface IProps {
  showProfileData?: boolean
}

export function Profile({ showProfileData = true }: IProps) {
  const { user } = useAuthContext()

  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>{user?.name}</Text>
          <Text color="gray.300" fontSize="small" textTransform="lowercase">
            {user?.username}
          </Text>
        </Box>
      )}

      <Avatar size="md" name={user?.name} />
    </Flex>
  )
}
