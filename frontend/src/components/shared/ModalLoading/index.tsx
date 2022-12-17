import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  CircularProgress,
  Flex
} from '@chakra-ui/react'

interface IProps {
  isOpen: boolean
  messageHeader: string
  onClose?: () => void
}

export default function ModalLoading({ isOpen, onClose, messageHeader }: IProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnEsc={false}
      closeOnOverlayClick={false}
      motionPreset="slideInBottom"
      blockScrollOnMount={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{messageHeader}</ModalHeader>
        <ModalBody>
          <Flex justifyContent="center">
            <CircularProgress size="100px" isIndeterminate color="blue.700" />
          </Flex>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  )
}
