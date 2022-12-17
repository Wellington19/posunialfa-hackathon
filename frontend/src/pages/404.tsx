import React from 'react'
import { useRouter } from 'next/router'
import { Box, Flex, Text } from '@chakra-ui/react'
import { ButtonBlue } from '@componentsUI/exports'

export default function Custom404() {
  const router = useRouter()

  return (
    <Flex w="100%" h="100%" align="center" justify="center" textAlign="center" p="2">
      <Box maxWidth="410px" p="6" mt="-20">
        <Text fontSize="90" fontWeight="bold">
          Oops!
        </Text>

        <Text fontSize="25" fontWeight="medium" mt="-4">
          404 - Página não encontrada
        </Text>

        <Text fontSize="17" fontWeight="hairline" mb="3">
          A página que você está procurando não existe ou está temporariamente indisponível.
        </Text>

        <ButtonBlue size="md" onClick={() => router.push('/home')}>
          Voltar para o início
        </ButtonBlue>
      </Box>
    </Flex>
  )
}
