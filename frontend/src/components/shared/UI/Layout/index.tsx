import React, { ReactNode, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Box, Grid } from '@chakra-ui/react'
import { Header, SideBar } from '@componentsShared/exports'

interface IProps {
  children?: ReactNode
}

export default function Layout({ children }: IProps) {
  const router = useRouter()
  const [sideBarVisible, setSideBarVisible] = useState(true)
  const [headerVisible, setHeaderVisible] = useState(true)

  useEffect(() => {
    if (router.pathname === '/404' || router.pathname === '/500') {
      setSideBarVisible(false)
      setHeaderVisible(false)
    } else {
      setSideBarVisible(true)
      setHeaderVisible(true)
    }
  }, [router.pathname])

  return (
    <Box>
      <Grid
        gridTemplateColumns={{
          base: 'auto 1fr'
        }}
        gridTemplateRows={{
          base: 'auto 1fr'
        }}
        gridTemplateAreas={{
          base: `'header header header' 
               'sidebar main main'`
        }}
        h="100vh"
      >
        <Box gridArea="header">
          <Header childVisible={headerVisible} />
        </Box>

        <Box gridArea="sidebar">{sideBarVisible && <SideBar />}</Box>

        <Box gridArea="main" overflow="auto">
          {children}
        </Box>
      </Grid>
    </Box>
  )
}
