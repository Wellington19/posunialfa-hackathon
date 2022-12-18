import React, { useEffect, memo, useCallback } from 'react'
import {
  Box,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid
} from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ButtonCancel, ButtonSave, Input, InputMask, Select } from '@componentsUI/exports'
import { useModalContext } from '@contexts/ModalContext'
import { queryClient } from '@services/queryClient'
import { IResponse } from '@services/hooks/user/useUsersCombo'
import { createRating } from './services/createRating'
import { updateRating } from './services/updateRating'

interface IFormData {
  height: string
  weight: string
  user_rating_id: string
  user_student_id: string
}

const formSchema = yup.object().shape({
  height: yup
    .string()
    .required('Altura obrigatório')
    .test('incomplet', 'Preenchimento incompleto', value => {
      if (value.replace(/\D/g, '') && value.replace(/\D/g, '').length < 3) return false
      return true
    }),
  weight: yup
    .number()
    .required('Peso obrigatório')
    .positive('Peso deve ser maior que 0')
    .max(1000, 'Peso máximo 1000')
    .typeError('Peso inválido'),
  user_student_id: yup.string().required('Aluno obrigatório'),
  user_rating_id: yup.string().required('Professor obrigatório')
})

interface IProps {
  isOpen: boolean
  onClose: () => void
}

function ModalCreateUpdate({ isOpen, onClose }: IProps) {
  const { modalOneData: modalCreateUpdateData } = useModalContext()

  const { handleSubmit, formState, reset, setValue, register } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      height: '',
      weight: '',
      user_student_id: '',
      user_rating_id: ''
    }
  })
  const { errors, isSubmitting } = formState

  const dataUserStudentCombo =
    (queryClient.getQueryData(['usersCombo', 'Aluno']) as IResponse)?.usersCombo || []
  const dataUserTeacherCombo =
    (queryClient.getQueryData(['usersCombo', 'Professor']) as IResponse)?.usersCombo || []

  const onCloseModal = useCallback(() => {
    onClose()
    reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSave: SubmitHandler<IFormData> = async values => {
    if (modalCreateUpdateData?.type === 'Nova avaliação') {
      const success = await createRating({
        height: Number(values.height),
        weight: Number(values.weight),
        user_rating_id: values.user_rating_id,
        user_student_id: values.user_student_id
      })

      if (success) onCloseModal()
    } else if (modalCreateUpdateData?.type === 'Editar avaliação') {
      const success = await updateRating(
        {
          id: modalCreateUpdateData?.id,
          height: Number(values.height),
          weight: Number(values.weight),
          user_rating_id: values.user_rating_id,
          user_student_id: values.user_student_id
        },
        {
          height: Number(modalCreateUpdateData?.height),
          weight: Number(modalCreateUpdateData?.weight),
          user_rating_id: modalCreateUpdateData?.user_rating_id,
          user_student_id: modalCreateUpdateData?.user_student_id
        }
      )

      if (success) onCloseModal()
    }
  }

  useEffect(() => {
    if (modalCreateUpdateData?.type === 'Editar avaliação') {
      setValue('height', modalCreateUpdateData?.height ?? '')
      setValue('weight', modalCreateUpdateData?.weight ?? '')
      setValue('user_student_id', modalCreateUpdateData?.user_student_id ?? '')
      setValue('user_rating_id', modalCreateUpdateData?.user_rating_id ?? '')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalCreateUpdateData])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCloseModal}
      closeOnOverlayClick={false}
      motionPreset="slideInBottom"
      size="3xl"
    >
      <Box as="form" onSubmit={handleSubmit(handleSave)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalCreateUpdateData?.type}</ModalHeader>

          <Divider mt="-3" />

          <ModalCloseButton tabIndex={-1} />

          <ModalBody>
            <SimpleGrid columns={[1, 1, 2, 2, 2]} spacingX="2" spacingY="1">
              <InputMask
                name="height"
                mask="9.99"
                label="Altura"
                size="md"
                isRequired
                {...register('height')}
                error={errors.height}
              />

              <Input
                name="weight"
                mask="weight"
                label="Peso"
                size="md"
                isRequired
                {...register('weight')}
                error={errors.weight}
              />

              <Select
                name="user_student_id"
                label="Aluno"
                size="md"
                placeholder="Selecione um aluno..."
                isRequired
                options={dataUserStudentCombo}
                {...register('user_student_id')}
                error={errors.user_student_id}
              />

              <Select
                name="user_rating_id"
                label="Professor"
                size="md"
                placeholder="Selecione um professor..."
                isRequired
                options={dataUserTeacherCombo}
                {...register('user_rating_id')}
                error={errors.user_rating_id}
              />
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <ButtonCancel size="sm" mr="3" onClick={onCloseModal}>
              Cancelar
            </ButtonCancel>

            <ButtonSave type="submit" size="sm" isLoading={isSubmitting}>
              Salvar
            </ButtonSave>
          </ModalFooter>
        </ModalContent>
      </Box>
    </Modal>
  )
}

export default memo(ModalCreateUpdate)
