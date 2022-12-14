import React, { ReactNode } from 'react'
import { Flex } from '@chakra-ui/react'

interface IProps {
  children: ReactNode
}

export function ContainerCenter({ children }: IProps) {
  return (
    <Flex w="100vw" h="100vh" align="center" justify="center" p="4">
      {children}
    </Flex>
  )
}
