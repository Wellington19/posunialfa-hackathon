import React from 'react'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ChakraProvider } from '@chakra-ui/react'
import { ToastContainer } from 'react-toastify'
import { queryClient } from '@services/queryClient'
import { ProgressLoading } from '@componentsShared/exports'
import Layout from '@components/shared/UI/Layout'
import { AuthProvider } from '@contexts/AuthContext'
import { SideBarProvider } from '@contexts/SideBarContext'

import 'react-toastify/dist/ReactToastify.css'
import theme from 'styles/theme'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  if (router.pathname === '/') {
    return (
      <ChakraProvider theme={theme}>
        <ProgressLoading />
        <ToastContainer />

        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ChakraProvider>
    )
  }
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <ProgressLoading />
        <ToastContainer />

        <AuthProvider>
          <SideBarProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SideBarProvider>
        </AuthProvider>
      </ChakraProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default MyApp
