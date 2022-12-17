import React, { ReactNode } from 'react'
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  useDisclosure
} from '@chakra-ui/react'
import { ButtonOK } from '@componentsUI/exports'

interface IProps {
  children: ReactNode
  actionConfirm: () => void
  messageHeader?: string
  messageBody?: string
}

export function PopoverConfirm({ children, actionConfirm, messageHeader, messageBody }: IProps) {
  const { onOpen, onClose, isOpen } = useDisclosure()

  return (
    <Popover
      returnFocusOnClose={false}
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      placement="left"
      closeOnBlur={false}
      isLazy
    >
      <PopoverTrigger>{children}</PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverHeader fontWeight="semibold">{messageHeader || 'Confirmação'}</PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody fontSize="sm">
            {messageBody || 'Tem certeza de que deseja continuar com sua ação?'}
          </PopoverBody>
          <PopoverFooter d="flex" justifyContent="flex-end">
            <ButtonOK
              onClick={() => {
                actionConfirm()
                onClose()
              }}
            >
              Confirmar
            </ButtonOK>
          </PopoverFooter>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}
