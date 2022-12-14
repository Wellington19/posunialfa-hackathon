import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Box } from '@chakra-ui/react'
import NProgress from 'nprogress'
import ScaleLoader from 'react-spinners/ScaleLoader'

export function ProgressLoading() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleStart = url => {
      NProgress.start()
      setLoading(true)
    }
    const handleStop = () => {
      NProgress.done()
      setLoading(false)
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

  return (
    <Box
      style={{
        position: 'fixed',
        left: '50%',
        top: '50%',
        zIndex: 1000
      }}
    >
      <ScaleLoader color="#0064B0" loading={loading} width={8} height={48} />
    </Box>
  )
}
