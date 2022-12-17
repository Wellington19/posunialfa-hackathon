import React, { ReactNode } from 'react'
import { Box, BoxProps } from '@chakra-ui/react'

interface IProps extends BoxProps {
  children: ReactNode
}

export function Section({ children, ...rest }) {
  return (
    <Box p="2" borderRadius={8} bg="white" boxShadow="lg" mb="2" {...rest}>
      <Box p="2" borderRadius={8} borderColor="gray.200" borderWidth="1px">
        {children}
      </Box>
    </Box>
  )
}
