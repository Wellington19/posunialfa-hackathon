import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react'

interface IContextData {
  modalOneOpen: boolean
  modalTwoOpen: boolean
  modalOneData: any
  modalTwoData: any
  onCloseModalOne: () => void
  onCloseModalTwo: () => void
  onOpenModalOne: (data?: any) => void
  onOpenModalTwo: (data?: any) => void
}

interface IProps {
  children: ReactNode
}

export const ModalContext = createContext({} as IContextData)

export function ModalProvider({ children }: IProps) {
  const [modalOneOpen, setModalOneOpen] = useState<boolean>(false)
  const [modalTwoOpen, setModalTwoOpen] = useState<boolean>(false)
  const [modalOneData, setModalOneData] = useState<any>()
  const [modalTwoData, setModalTwoData] = useState<any>()

  const onCloseModalOne = useCallback(() => {
    setModalOneOpen(false)
  }, [])

  const onCloseModalTwo = useCallback(() => {
    setModalTwoOpen(false)
  }, [])

  const onOpenModalOne = useCallback((data?: any) => {
    setModalOneOpen(true)
    setModalOneData(data)
  }, [])

  const onOpenModalTwo = useCallback((data?: any) => {
    setModalTwoOpen(true)
    setModalTwoData(data)
  }, [])

  return (
    <ModalContext.Provider
      value={{
        modalOneOpen,
        modalTwoOpen,
        modalOneData,
        modalTwoData,
        onCloseModalOne,
        onCloseModalTwo,
        onOpenModalOne,
        onOpenModalTwo
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export const useModalContext = () => useContext(ModalContext)
