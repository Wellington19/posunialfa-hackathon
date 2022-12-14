import React from 'react'
import { PageTitle } from '@componentsUI/exports'
import { withSSRAuth } from '@utils/withSSRAuth'

export default function Dashboard() {
  return <PageTitle title="Início" />
}

export const getServerSideProps = withSSRAuth(async ctx => {
  return {
    props: {}
  }
})
