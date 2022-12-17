import React from 'react'
import dynamic from 'next/dynamic'
import { Skeleton } from '@chakra-ui/react'
import { Container, ContainerTable, PageTitle, PageBodyTitle } from '@componentsShared/exports'
import { ButtonNew } from '@componentsUI/exports'
import { useUsers } from '@services/hooks/user/useUsers'
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
          <ButtonNew onClick={() => onOpenModalCreateUpdate({ type: 'Novo usuário' })}>
            Criar novo
          </ButtonNew>
        </PageBodyTitle>
      </Container>

      <ContainerTable>
        <MUITable data={dataUser?.users || []} count={dataUser?.totalCount} />
      </ContainerTable>
    </>
  )
}

export default function RegistrationUser() {
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
