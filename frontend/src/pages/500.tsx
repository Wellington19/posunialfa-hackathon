import React from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'

export default function Custom500() {
  return (
    <Flex w="100%" h="100%" align="center" justify="center" textAlign="center" p="2">
      <Box maxWidth="410px" p="6" mt="-20">
        <Text fontSize="90" fontWeight="bold">
          Oops!
        </Text>

        <Text fontSize="25" fontWeight="medium" mt="-4">
          500 - Erro interno no servidor
        </Text>

        <Text fontSize="18" fontWeight="hairline" mb="3">
          Você será redirecionado para o login em instantes.
        </Text>
      </Box>
    </Flex>
  )
}
