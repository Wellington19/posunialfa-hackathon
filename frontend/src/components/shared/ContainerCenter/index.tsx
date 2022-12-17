import React, { ReactNode } from 'react'
import { Flex, FlexProps } from '@chakra-ui/react'

interface IProps extends FlexProps {
  children: ReactNode
}

export function ContainerCenter({ children, ...rest }: IProps) {
  return (
    <Flex w="100vw" h="100vh" align="center" justify="center" p="4" {...rest}>
      {children}
    </Flex>
  )
}
