import React from 'react'
import Image from 'next/image'

export function Logo() {
  return (
    <>
      <Image src="/static/logo.png" alt="Logo UniALFA" width={247} height={64} style={{ width: 'auto', height: 'auto' }} priority />
    </>
  )
}
