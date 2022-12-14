import React, { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

interface IContextData {
  isOpen: boolean
  onOpenCloseSideBar: () => void
}

interface IProps {
  children: ReactNode
}

export const SideBarContext = createContext({} as IContextData)

export function SideBarProvider({ children }: IProps) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const onOpenCloseSideBar = useCallback(() => {
    setIsOpen(!isOpen)
  }, [isOpen])

  useEffect(() => {
    setIsOpen(false)
  }, [router.asPath])

  return (
    <SideBarContext.Provider value={{ isOpen, onOpenCloseSideBar }}>
      {children}
    </SideBarContext.Provider>
  )
}

export const useSideBarContext = () => useContext(SideBarContext)
