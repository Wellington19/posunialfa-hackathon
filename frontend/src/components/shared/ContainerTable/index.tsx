import React, { ReactNode } from 'react'
import { Box, BoxProps } from '@chakra-ui/react'

interface IProps extends BoxProps {
  children: ReactNode
}

export function ContainerTable({ children, ...props }: IProps) {
  return (
    <Box mx="auto" pl="6" pr="6" pt="0" pb="6" maxWidth={1480} {...props}>
      {children}
    </Box>
  )
}
