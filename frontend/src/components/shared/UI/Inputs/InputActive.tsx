import React, { forwardRef, ForwardRefRenderFunction, useCallback } from 'react'
import { Input, InputProps } from '@chakra-ui/react'
import { cep, cpf, cnpj, currency, integer } from '@utils/masks'

interface IProps extends InputProps {
  name: string
  bgColor?: string
  mask?: TMaskInput
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, IProps> = (
  { name, bgColor, mask, ...rest },
  ref
) => {
  const handleKeyUp = useCallback(
    (value: React.FormEvent<HTMLInputElement>) => {
      if (mask === 'integer') integer(value)
      else if (mask === 'cep') cep(value)
      else if (mask === 'currency') currency(value)
      else if (mask === 'cpf') cpf(value)
      else if (mask === 'cnpj') cnpj(value)
    },
    [mask]
  )

  return (
    <Input
      ref={ref}
      type="text"
      id={name}
      name={name}
      autoComplete="off"
      variant="outline"
      bgColor={bgColor}
      focusBorderColor="blue.700"
      _hover={{
        bgColor: { bgColor }
      }}
      size="lg"
      onKeyUp={handleKeyUp}
      {...rest}
    />
  )
}

export const InputActive = forwardRef(InputBase)
