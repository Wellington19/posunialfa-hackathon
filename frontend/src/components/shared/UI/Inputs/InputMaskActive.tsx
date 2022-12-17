import React, { forwardRef, ForwardRefRenderFunction } from 'react'
import { Input, InputProps } from '@chakra-ui/react'
import InputMask from 'react-input-mask'

interface IProps extends InputProps {
  name: string
  mask?: string
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, IProps> = (
  { name, mask, ...rest },
  ref
) => {
  return (
    <Input
      as={InputMask}
      mask={mask}
      type="text"
      id={name}
      name={name}
      autoComplete="off"
      variant="outline"
      focusBorderColor="blue.700"
      size="lg"
      ref={ref}
      {...rest}
    />
  )
}

export const InputMaskActive = forwardRef(InputBase)
