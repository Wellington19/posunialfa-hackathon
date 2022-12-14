import React, { forwardRef, ForwardRefRenderFunction } from 'react'
import { Input, InputProps } from '@chakra-ui/react'

interface IProps extends InputProps {
  name: string
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, IProps> = ({ name, ...rest }, ref) => {
  return (
    <Input
      ref={ref}
      type="text"
      id={name}
      name={name}
      size="lg"
      variant="outline"
      focusBorderColor="blue.700"
      cursor="not-allowed"
      bgColor="gray.50"
      _hover={{
        bgColor: 'gray.50'
      }}
      isDisabled
      _disabled={{
        opacity: '0.8'
      }}
      {...rest}
    />
  )
}

export const InputDisabled = forwardRef(InputBase)
