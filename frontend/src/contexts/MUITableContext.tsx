import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react'

interface IContextData {
  page: number
  setCurrentPage: (value: number) => void
  rowsPerPage: number
  setCurrentRowsPerPage: (value: number) => void
}

interface IProps {
  children: ReactNode
}

export const MUITableContext = createContext({} as IContextData)

export function MUITableProvider({ children }: IProps) {
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)

  const setCurrentPage = useCallback((value: number) => {
    setPage(value)
  }, [])

  const setCurrentRowsPerPage = useCallback((value: number) => {
    setRowsPerPage(value)
  }, [])

  return (
    <MUITableContext.Provider
      value={{
        page,
        setCurrentPage,
        rowsPerPage,
        setCurrentRowsPerPage
      }}
    >
      {children}
    </MUITableContext.Provider>
  )
}

export const useMUITableContext = () => useContext(MUITableContext)
