import React, { ReactNode } from 'react'
import { Box, BoxProps } from '@chakra-ui/react'

interface IProps extends BoxProps {
  children: ReactNode
}

export function Container({ children, ...props }: IProps) {
  return (
    <Box mx="auto" pl="6" pr="6" pt="2" pb="0" maxWidth={1480} {...props}>
      {children}
    </Box>
  )
}
