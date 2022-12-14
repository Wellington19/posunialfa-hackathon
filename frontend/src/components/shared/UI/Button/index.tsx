import React from 'react'
import { forwardRef, Button, ButtonProps, Icon } from '@chakra-ui/react'
import { FaSignInAlt } from 'react-icons/fa'

export const ButtonBlue = forwardRef<ButtonProps, 'button'>((props, ref) => (
  <Button
    size="xs"
    textColor="white"
    bgColor="blue.600"
    _hover={{
      bgColor: 'blue.700'
    }}
    ref={ref}
    {...props}
  />
))

export const ButtonSignIn = forwardRef<ButtonProps, 'button'>((props, ref) => (
  <Button
    size="lg"
    color="white"
    bgColor="blue.600"
    leftIcon={< Icon as={FaSignInAlt} fontSize="20" />}
    _hover={{
      bgColor: 'blue.700'
    }}
    ref={ref}
    {...props}
  />
))
