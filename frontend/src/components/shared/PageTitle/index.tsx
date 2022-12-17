import React from 'react'
import Head from 'next/head'

interface IProps {
  title: string
}

export function PageTitle({ title }: IProps) {
  return (
    <Head>
      <title>{`Hackathon | ${title}`}</title>
    </Head>
  )
}

