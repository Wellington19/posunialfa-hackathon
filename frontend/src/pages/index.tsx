import React, { useContext } from 'react'
import { Box, Flex, Stack } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { ContainerCenter, Logo, PageTitle } from '@componentsShared/exports'
import { ButtonSignIn, Input, InputPassword } from '@componentsUI/exports'
import { AuthContext } from '@contexts/AuthContext'
import { withSSRGuest } from '@utils/withSSRGuest'

interface IFormData {
  username: string
  password: string
}

const formSchema = yup.object().shape({
  username: yup.string().required('Usuário obrigatório'),
  password: yup.string().required('Senha obrigatória')
})

export default function Login() {
  const { signIn } = useContext(AuthContext)

  const { register, handleSubmit, formState, getValues } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })
  const { errors, isSubmitting } = formState

  const handleSignIn: SubmitHandler<IFormData> = async values => {
    await signIn({
      username: values.username,
      password: values.password
    })
  }

  return (
    <>
      <PageTitle title="Login" />

      <ContainerCenter>
        <Flex
          as="form"
          width="100%"
          maxWidth={400}
          bg="white"
          p="8"
          border="1px"
          borderRadius={8}
          borderColor="gray.200"
          boxShadow="2xl"
          flexDir="column"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Stack spacing="5">
            <Box alignSelf="center">
              <Logo />
            </Box>

            <Input
              name="username"
              label="Usuário"
              isRequired
              bgColor="white"
              error={errors.username}
              {...register('username')}
            />

            <InputPassword
              name="password"
              label="Senha"
              isRequired
              maxLength={60}
              error={errors.password}
              {...register('password')}
            />

            <ButtonSignIn type="submit" mt="6" size="lg" isLoading={isSubmitting}>
              Entrar
            </ButtonSignIn>
          </Stack>
        </Flex>
      </ContainerCenter>
    </>
  )
}

export const getServerSideProps = withSSRGuest(async ctx => {
  return {
    props: {}
  }
})
