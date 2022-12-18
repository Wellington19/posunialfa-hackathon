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
import { ButtonCancel, ButtonSave, Input, InputPassword, Select } from '@componentsUI/exports'
import { useModalContext } from '@contexts/ModalContext'
import { situations } from '@utils/variables'
import { useAuthContext } from '@contexts/AuthContext'
import { getProfiles } from './utils/functions'
import { createUser } from './services/createUser'
import { updateUser } from './services/updateUser'

interface IFormData {
  name: string
  username: string
  password: string
  password_confirmation: string
  profile: string
  situation: string
}

const createFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório').max(60),
  username: yup.string().required('Usuário obrigatório').max(60),
  password: yup.string().required('Senha obrigatória').min(8, 'No mínimo 8 caracteres'),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais')
})

const updateFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório').max(60),
  username: yup.string().required('Usuário obrigatório').max(60),
  password: yup
    .string()
    .test(
      'empty-or-8-characters-check',
      'No mínimo 8 caracteres',
      password => !password || password.length >= 8
    ),
  password_confirmation: yup
    .string()
    .oneOf([null, yup.ref('password')], 'As senhas precisam ser iguais')
})

interface IProps {
  isOpen: boolean
  onClose: () => void
}

function ModalCreateUpdate({ isOpen, onClose }: IProps) {
  const { user } = useAuthContext()
  const { modalOneData: modalCreateUpdateData } = useModalContext()

  const formSchema =
    modalCreateUpdateData?.type === 'Novo usuário' ? createFormSchema : updateFormSchema
  const profiles = user?.profile !== 'Administrador' ? getProfiles(['Aluno']) : getProfiles()

  const { handleSubmit, formState, reset, setValue, register } = useForm({
    resolver: yupResolver(formSchema)
  })
  const { errors, isSubmitting } = formState

  const onCloseModal = useCallback(() => {
    onClose()
    reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSave: SubmitHandler<IFormData> = async values => {
    if (modalCreateUpdateData?.type === 'Novo usuário') {
      try {
        await createUser({
          name: values.name,
          username: values.username,
          profile: values.profile,
          password: values.password,
          situation: values.situation
        })
        onCloseModal()
      } catch (error) {
        //
      }
    } else if (modalCreateUpdateData?.type === 'Editar usuário') {
      try {
        await updateUser(
          {
            id: modalCreateUpdateData?.id,
            name: values.name,
            username: values.username,
            profile: values.profile,
            password: values.password,
            situation: values.situation
          },
          {
            name: modalCreateUpdateData?.name,
            username: modalCreateUpdateData?.username,
            profile: modalCreateUpdateData?.profile,
            situation: modalCreateUpdateData?.situation
          }
        )
        onCloseModal()
      } catch (error) {
        //
      }
    }
  }

  useEffect(() => {
    if (modalCreateUpdateData?.type === 'Editar usuário') {
      setValue('name', modalCreateUpdateData?.name ?? '')
      setValue('username', modalCreateUpdateData?.username ?? '')
      setValue('profile', modalCreateUpdateData?.profile ?? '')
      setValue('situation', modalCreateUpdateData?.situation ?? '')
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
              <Input
                name="name"
                label="Nome completo"
                size="md"
                isRequired
                maxLength={60}
                {...register('name')}
                error={errors.name}
              />

              <Input
                name="username"
                label="Usuário"
                size="md"
                isRequired
                maxLength={60}
                {...register('username')}
                error={errors.username}
              />

              <InputPassword
                name="password"
                label="Senha"
                size="md"
                isRequired={modalCreateUpdateData?.type === 'Novo usuário'}
                minLength={8}
                placeholder="Mínimo 8 caracteres"
                {...register('password')}
                error={errors.password}
              />

              <InputPassword
                name="password_confirmation"
                label="Confirmação de senha"
                size="md"
                isRequired={modalCreateUpdateData?.type === 'Novo usuário'}
                placeholder="Mínimo 8 caracteres"
                {...register('password_confirmation')}
                error={errors.password_confirmation}
              />

              <Select
                name="profile"
                label="Perfil"
                size="md"
                isRequired
                options={profiles}
                {...register('profile')}
                error={errors.profile}
              />

              <Select
                name="situation"
                label="Situação"
                size="md"
                isRequired
                options={situations}
                {...register('situation')}
                error={errors.situation}
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
