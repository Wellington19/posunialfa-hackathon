import React, { forwardRef, ForwardRefRenderFunction } from 'react'
import { FieldError, FieldErrors } from 'react-hook-form'
import { FormControl, InputProps, FormErrorMessage } from '@chakra-ui/react'
import { Label } from './Label'
import { InputDisabled } from './InputDisabled'
import { InputMaskActive } from './InputMaskActive'

interface IProps extends InputProps {
  name: string
  label?: string
  error?: FieldError | FieldErrors
  isRequired?: boolean
  isDisabled?: boolean
  mask?: string
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, IProps> = (
  { name, label, error = null, isRequired = false, isDisabled = false, mask = '', ...rest },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      <>
        <Label name={name} label={label} isRequired={isRequired} />

        {isDisabled ? (
          <InputDisabled ref={ref} name={name} {...rest} />
        ) : (
          <InputMaskActive ref={ref} name={name} mask={mask} {...rest} />
        )}
      </>

      {!!error && <FormErrorMessage mt="1">{error.message}</FormErrorMessage>}
    </FormControl>
  )
}

export const InputMask = forwardRef(InputBase)
