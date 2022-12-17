import React, { forwardRef, ForwardRefRenderFunction } from 'react'
import { FieldError, FieldErrors } from 'react-hook-form'
import {
  FormControl,
  FormLabel,
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
  FormErrorMessage
} from '@chakra-ui/react'

interface IOptions {
  key?: string | number
  value: string | number
  description: string | number
}

interface ISelectProps extends ChakraSelectProps {
  name: string
  options: IOptions[]
  label?: string
  error?: FieldError | FieldErrors
  isRequired?: boolean
  isDisabled?: boolean
  bgColor?: string
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, ISelectProps> = (
  { name, options, label, error = null, isRequired = false, isDisabled = false, ...rest },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
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

      {isDisabled ? (
        <ChakraSelect
          id={name}
          name={name}
          size="lg"
          autoComplete="off"
          variant="outline"
          focusBorderColor="blue.900"
          isDisabled
          cursor="not-allowed"
          bgColor="gray.50"
          _hover={{
            bgColor: 'gray.50'
          }}
          _disabled={{
            opacity: '0.8'
          }}
          ref={ref}
          {...rest}
        >
          {options.map(item => {
            return (
              <option key={item.key ? item.key : item.value} value={item.value}>
                {item.description}
              </option>
            )
          })}
        </ChakraSelect>
      ) : (
        <ChakraSelect
          name={name}
          id={name}
          autoComplete="off"
          variant="outline"
          focusBorderColor="blue.900"
          size="lg"
          ref={ref}
          {...rest}
        >
          {options.map(item => {
            return (
              <option key={item.key ? item.key : item.value} value={item.value}>
                {item.description}
              </option>
            )
          })}
        </ChakraSelect>
      )}

      {!!error && <FormErrorMessage mt="1">{error.message}</FormErrorMessage>}
    </FormControl>
  )
}

export const Select = forwardRef(SelectBase)
