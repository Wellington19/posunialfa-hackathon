import React from 'react'
import dynamic from 'next/dynamic'
import { Divider, Skeleton } from '@chakra-ui/react'
import { Container, PageBodyTitle, PageTitle, Section } from '@componentsShared/exports'
import { ButtonNew } from '@componentsUI/exports'
import { withSSRAuth } from '@utils/withSSRAuth'

const MUITable = dynamic(() => import('@components/Rating/MUITable'), {
  ssr: false,
  loading: () => <Skeleton height="300px" />
})

export default function Home() {
  return (
    <>
      <PageTitle title="Início" />

      <Container>
        <PageBodyTitle title="Avaliações">
          <ButtonNew onClick={() => console.log('')}>Criar nova</ButtonNew>
        </PageBodyTitle>

        <Section>
          <Divider />

          <MUITable data={[]} count={0} />
        </Section>
      </Container>
    </>
  )
}

export const getServerSideProps = withSSRAuth(async ctx => {
  return {
    props: {}
  }
})
