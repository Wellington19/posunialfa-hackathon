import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { Skeleton } from '@chakra-ui/react'
import { Container, ContainerTable, PageTitle, PageBodyTitle } from '@componentsShared/exports'
import { ButtonNew } from '@componentsUI/exports'
import { useUsers } from '@services/hooks/user/useUsers'
import { useAuthContext } from '@contexts/AuthContext'
import { ModalProvider, useModalContext } from '@contexts/ModalContext'
import { MUITableProvider, useMUITableContext } from '@contexts/MUITableContext'
import { withSSRAuth } from '@utils/withSSRAuth'

const MUITable = dynamic(() => import('@components/Registration/User/MUITable'), {
  ssr: false,
  loading: () => <Skeleton height="300px" />
})

const ModalLoading = dynamic(() => import('@componentsShared/ModalLoading'))

const ModalCreateUpdate = dynamic(() => import('@components/Registration/User/ModalCreateUpdate'))

function Main() {
  const { user } = useAuthContext()
  const {
    modalOneOpen: modalCreateUpdateOpen,
    onOpenModalOne: onOpenModalCreateUpdate,
    onCloseModalOne: onCloseModalCreateUpdate
  } = useModalContext()
  const { page, rowsPerPage } = useMUITableContext()

  const { data: dataUser, isLoading, isFetching } = useUsers({ page, limit: rowsPerPage })

  return (
    <>
      <ModalLoading
        isOpen={isFetching || isLoading}
        messageHeader="Buscando dados, aguarde por favor..."
      />

      <ModalCreateUpdate isOpen={modalCreateUpdateOpen} onClose={onCloseModalCreateUpdate} />

      <PageTitle title="Usuários" />

      <Container>
        <PageBodyTitle title="Usuários" isLoading={isLoading} isFetching={isFetching}>
          {user?.profile !== 'Aluno' && (
            <ButtonNew onClick={() => onOpenModalCreateUpdate({ type: 'Novo usuário' })}>
              Criar novo
            </ButtonNew>
          )}
        </PageBodyTitle>
      </Container>

      <ContainerTable>
        <MUITable data={dataUser?.users || []} count={dataUser?.totalCount} />
      </ContainerTable>
    </>
  )
}

export default function RegistrationUser() {
  const { user, isAuthenticated } = useAuthContext()
  const router = useRouter()

  useEffect(() => {
    if (user && isAuthenticated && user?.profile === 'Aluno') {
      router.push('/home')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isAuthenticated])

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
