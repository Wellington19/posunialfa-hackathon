import React, { ReactNode } from 'react'
import { Divider, Flex, Heading, Spinner } from '@chakra-ui/react'

interface IProps {
  title: string
  isLoading?: boolean
  isFetching?: boolean
  children?: ReactNode
}

export function PageBodyTitle({ title, isLoading, isFetching, children }: IProps) {
  return (
    <>
      <Flex mb="0.5" justifyContent="space-between" align="center">
        <Heading size="lg" fontWeight="normal">
          {title}
          {(isFetching || isLoading) && (
            <Spinner size="md" color="gray.500" ml="2" thickness="3px" />
          )}
        </Heading>

        {children}
      </Flex>

      <Divider mb="1.5" borderColor="gray.700" />
    </>
  )
}
