import React, { forwardRef, ForwardRefRenderFunction, useState } from 'react'
import { FieldError, FieldErrors } from 'react-hook-form'
import {
  FormControl,
  InputProps,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  IconButton
} from '@chakra-ui/react'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import { Label } from './Label'
import { InputActive } from './InputActive'

interface IProps extends InputProps {
  name: string
  label: string
  iconOpen?: boolean
  error?: FieldError | FieldErrors
  isRequired?: boolean
  bgColor?: string
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, IProps> = (
  { name, label, iconOpen = false, error = null, isRequired = false, bgColor = 'white', ...rest },
  ref
) => {
  const [isIconOpen, setIconOpen] = useState<boolean>(iconOpen)

  return (
    <FormControl isInvalid={!!error}>
      <Label name={name} label={label} isRequired={isRequired} />

      <InputGroup>
        <InputRightElement h="full">
          <IconButton
            tabIndex={-1}
            bg="transparent !important"
            color="blue.700"
            variant="ghost"
            aria-label={isIconOpen ? 'Esconder senha' : 'Mostrar senha'}
            icon={isIconOpen ? <HiEyeOff /> : <HiEye />}
            onClick={() => setIconOpen(!isIconOpen)}
          />
        </InputRightElement>

        <InputActive
          ref={ref}
          type={isIconOpen ? 'text' : 'password'}
          bgColor={bgColor}
          name={name}
          {...rest}
        />
      </InputGroup>

      {!!error && <FormErrorMessage mt="1">{error.message}</FormErrorMessage>}
    </FormControl>
  )
}

export const InputPassword = forwardRef(InputBase)
