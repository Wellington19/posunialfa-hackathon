import React from 'react'
import { forwardRef, Button, ButtonProps, Icon } from '@chakra-ui/react'
import { FaSignInAlt, FaTrashAlt } from 'react-icons/fa'
import { RiAddLine, RiFilterLine, RiPencilLine } from 'react-icons/ri'
import { MdCancel, MdDone, MdSave } from 'react-icons/md'

export const ButtonBlue = forwardRef<ButtonProps, 'button'>((props, ref) => (
  <Button
    size="sm"
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
    size="sm"
    color="white"
    bgColor="blue.600"
    leftIcon={<Icon as={FaSignInAlt} fontSize="20" />}
    _hover={{
      bgColor: 'blue.700'
    }}
    ref={ref}
    {...props}
  />
))

export const ButtonFilter = forwardRef<ButtonProps, 'button'>((props, ref) => (
  <Button
    size="sm"
    textColor="white"
    bgColor="blue.600"
    leftIcon={<Icon as={RiFilterLine} fontSize="20" />}
    _hover={{
      bgColor: 'blue.700'
    }}
    ref={ref}
    {...props}
  />
))

export const ButtonNew = forwardRef<ButtonProps, 'button'>((props, ref) => (
  <Button
    size="sm"
    textColor="white"
    bgColor="blue.600"
    leftIcon={<Icon as={RiAddLine} fontSize="20" />}
    _hover={{
      bgColor: 'blue.700'
    }}
    ref={ref}
    {...props}
  />
))

export const ButtonEdit = forwardRef<ButtonProps, 'button'>((props, ref) => (
  <Button
    size="sm"
    colorScheme="blue"
    leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
    ref={ref}
    {...props}
  />
))

export const ButtonDelete = forwardRef<ButtonProps, 'button'>((props, ref) => (
  <Button
    size="sm"
    colorScheme="red"
    leftIcon={<Icon as={FaTrashAlt} fontSize="16" />}
    ref={ref}
    {...props}
  />
))

export const ButtonOK = forwardRef<ButtonProps, 'button'>((props, ref) => (
  <Button
    size="sm"
    textColor="white"
    bgColor="blue.600"
    leftIcon={<Icon as={MdDone} fontSize="20" />}
    _hover={{
      bgColor: 'blue.700'
    }}
    ref={ref}
    {...props}
  />
))

export const ButtonCancel = forwardRef<ButtonProps, 'button'>((props, ref) => (
  <Button
    size="sm"
    colorScheme="red"
    leftIcon={<Icon as={MdCancel} fontSize="20" />}
    ref={ref}
    {...props}
  />
))

export const ButtonSave = forwardRef<ButtonProps, 'button'>((props, ref) => (
  <Button
    size="xs"
    textColor="white"
    bgColor="blue.600"
    leftIcon={<Icon as={MdSave} fontSize="20" />}
    _hover={{
      bgColor: 'blue.700'
    }}
    ref={ref}
    {...props}
  />
))
