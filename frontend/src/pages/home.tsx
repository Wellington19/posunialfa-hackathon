import React from 'react'
import { PageTitle } from '@componentsShared/exports'
import { withSSRAuth } from '@utils/withSSRAuth'

export default function Home() {
  return <PageTitle title="Início" />
}

export const getServerSideProps = withSSRAuth(async ctx => {
  return {
    props: {}
  }
})
