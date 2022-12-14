import React from 'react'
import { FormLabel } from '@chakra-ui/react'

interface IProps {
  name: string
  label?: string
  isRequired?: boolean
}

export function Label({ name, label, isRequired }: IProps) {
  return (
    <>
      {label && isRequired ? (
        <FormLabel htmlFor={name} mb="0">
          {label}
          <span style={{ color: 'red' }}> *</span>
        </FormLabel>
      ) : (
        <FormLabel htmlFor={name} mb="0">
          {label}
        </FormLabel>
      )}
    </>
  )
}
