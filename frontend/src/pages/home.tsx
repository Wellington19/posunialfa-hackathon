import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Box, Divider, SimpleGrid, Skeleton } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Container, PageBodyTitle, PageTitle, Section } from '@componentsShared/exports'
import { ButtonNew, ButtonRefresh, Select } from '@componentsUI/exports'
import { useAuthContext } from '@contexts/AuthContext'
import { ModalProvider, useModalContext } from '@contexts/ModalContext'
import { MUITableProvider, useMUITableContext } from '@contexts/MUITableContext'
import { useUsersCombo } from '@services/hooks/user/useUsersCombo'
import { useRatings } from '@services/hooks/rating/useRatingImc'
import { getDataChart } from '@components/Rating/utils/functions'
import { optionsChart } from '@components/Rating/utils/variables'
import { queryClient } from '@services/queryClient'
import { withSSRAuth } from '@utils/withSSRAuth'

const MUITable = dynamic(() => import('@components/Rating/MUITable'), {
  ssr: false,
  loading: () => <Skeleton height="300px" />
})

const ModalLoading = dynamic(() => import('@componentsShared/ModalLoading'))

const ModalCreateUpdate = dynamic(() => import('@components/Rating/ModalCreateUpdate'))

const Chart = dynamic(() => import('react-google-charts'), {
  ssr: false
})

interface IFormData {
  user_student_id: string
}

function Main() {
  const { user } = useAuthContext()
  const {
    modalOneOpen: modalCreateUpdateOpen,
    onOpenModalOne: onOpenModalCreateUpdate,
    onCloseModalOne: onCloseModalCreateUpdate
  } = useModalContext()
  const { page, rowsPerPage } = useMUITableContext()

  const [dataChart, setDataChart] = useState<any[]>([['', 'IMC']])

  const { register, watch, formState, handleSubmit, setValue } = useForm({
    defaultValues: { user_student_id: '' }
  })
  const { isSubmitting } = formState
  const watchForm = watch(['user_student_id'])

  const {
    data: dataUserStudentCombo,
    isLoading: isLoadingUserStudentCombo,
    isFetching: isFetchingUserStudentCombo
  } = useUsersCombo({ profile: 'Aluno' })

  const { isLoading: isLoadingUserTeacherCombo, isFetching: isFetchingUserTeacherCombo } =
    useUsersCombo({ profile: 'Professor' })

  const {
    data: dataRating,
    isLoading: isLoadingRating,
    isFetching: isFetchingRating
  } = useRatings({ user_student_id: watchForm[0], page, limit: rowsPerPage })

  const isLoading = isLoadingUserStudentCombo || isLoadingUserTeacherCombo || isLoadingRating
  const isFetching = isFetchingUserStudentCombo || isFetchingUserTeacherCombo || isFetchingRating

  const handleRunFilter: SubmitHandler<IFormData> = async values => {
    queryClient.invalidateQueries(['ratings', values.user_student_id])
  }

  useEffect(() => {
    queryClient.invalidateQueries(['ratings', watchForm[0]])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchForm[0]])

  useEffect(() => {
    setDataChart(getDataChart({ student_id: watchForm[0], page, limit: rowsPerPage }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataRating])

  useEffect(() => {
    if (user?.profile === 'Aluno') setValue('user_student_id', user?.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <>
      <PageTitle title="Início" />

      <ModalLoading
        isOpen={isFetching || isLoading}
        messageHeader="Buscando dados, aguarde por favor..."
      />

      <ModalCreateUpdate isOpen={modalCreateUpdateOpen} onClose={onCloseModalCreateUpdate} />

      <Container>
        <PageBodyTitle title="Avaliações" isLoading={isLoading} isFetching={isFetching}>
          {user?.profile !== 'Aluno' && (
            <ButtonNew onClick={() => onOpenModalCreateUpdate({ type: 'Nova avaliação' })}>
              Criar nova
            </ButtonNew>
          )}
        </PageBodyTitle>

        <Section as="form" onSubmit={handleSubmit(handleRunFilter)}>
          <SimpleGrid columns={[1, 1, 1, 2, 3]} spacingX="2" spacingY="1" mb="2">
            <Select
              name="user_student_id"
              label="Aluno"
              size="md"
              placeholder="Selecione um aluno..."
              isDisabled={user?.profile === 'Aluno'}
              options={dataUserStudentCombo?.usersCombo || []}
              {...register('user_student_id')}
            />
          </SimpleGrid>

          <ButtonRefresh
            type="submit"
            isLoading={isSubmitting || isLoading || isFetching}
            size="sm"
            mb="2"
          >
            Atualizar
          </ButtonRefresh>

          {dataChart.length > 1 && (
            <Box pb="2" px="2">
              <Chart
                chartType="Bar"
                width="100%"
                height="200px"
                data={dataChart}
                options={optionsChart}
              />
            </Box>
          )}

          <Divider />

          <MUITable data={dataRating?.ratings || []} count={dataRating?.totalCount} />
        </Section>
      </Container>
    </>
  )
}

export default function Home() {
  return (
    <ModalProvider>
      <MUITableProvider>
        <Main />
      </MUITableProvider>
    </ModalProvider>
  )
}

export const getServerSideProps = withSSRAuth(async ctx => {
  return {
    props: {}
  }
})
