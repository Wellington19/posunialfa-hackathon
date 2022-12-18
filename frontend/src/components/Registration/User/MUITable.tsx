import React, { memo, useEffect, useMemo, useState } from 'react'
import MUIDataTable, { SelectableRows } from 'mui-datatables'
import { ThemeProvider } from '@material-ui/core/styles'
import { Badge } from '@chakra-ui/react'
import { ButtonDelete, ButtonEdit, PopoverConfirm } from '@componentsUI/exports'
import { executeSort, textLabels, getTheme } from '@utils/configMuiTable'
import { useAuthContext } from '@contexts/AuthContext'
import { useModalContext } from '@contexts/ModalContext'
import { useMUITableContext } from '@contexts/MUITableContext'
import { formatDateptBR } from '@utils/format'
import { getColorSituation } from '@utils/functions'
import { deleteUser } from './services/deleteUser'

const theme = getTheme()

const columnsTable = ['', 'Nome', 'Usuário', 'Perfil', 'Situação', 'Data cadastro']

interface IProps {
  data: any[]
  count: number
}

function MUITable({ data, count }: IProps) {
  const { user } = useAuthContext()
  const { onOpenModalOne: onOpenModalCreateUpdate } = useModalContext()
  const { page, rowsPerPage, setCurrentPage, setCurrentRowsPerPage } = useMUITableContext()

  const [dataState, setDataState] = useState([])
  const [sortOrder, setSortOrder] = useState({
    name: '',
    direction: ''
  })

  useEffect(() => {
    executeSort({
      column: sortOrder.name,
      order: sortOrder.direction,
      data,
      columnsTable
    }).then(data => {
      setDataState(data)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const options = {
    tableBodyHeight: '100%',
    download: false,
    print: false,
    search: false,
    filter: false,
    jumpToPage: true,
    serverSide: true,
    page,
    rowsPerPage,
    count,
    selectableRows: 'none' as SelectableRows,
    viewColumns: false,
    rowsPerPageOptions: [10, 25, 50, 100],
    selectToolbarPlacement: 'none' as TMUITableSelectToolbarPlacement,
    textLabels,
    setTableProps: () => {
      return {
        size: 'small'
      }
    },
    onChangePage: (currentPage: number) => {
      setCurrentPage(currentPage)
    },
    onChangeRowsPerPage: (numberOfRows: number) => {
      setCurrentPage(0)
      setCurrentRowsPerPage(numberOfRows)
    },
    onColumnSortChange: (changedColumn: string, direction: string) => {
      executeSort({
        column: changedColumn,
        order: direction,
        data: dataState,
        columnsTable
      }).then(data => {
        setDataState(data)
        setSortOrder({
          name: changedColumn,
          direction
        })
      })
    }
  }

  const columns = useMemo(() => {
    return [
      {
        name: 'Object',
        options: {
          display: false,
          filter: false
        }
      },
      'Nome',
      'Usuário',
      'Perfil',
      {
        name: 'Situação',
        options: {
          customBodyRenderLite: (dataIndex: number) => {
            return (
              <Badge colorScheme={getColorSituation(dataState[dataIndex][4])}>
                {dataState[dataIndex][4]}
              </Badge>
            )
          }
        }
      },
      {
        name: 'Data cadastro',
        options: {
          customBodyRenderLite: (dataIndex: number) => {
            return formatDateptBR(dataState[dataIndex][5])
          }
        }
      },
      {
        name: 'Ações',
        options: {
          display: user?.profile !== 'Aluno',
          filter: false,
          sort: false,
          empty: true,
          customBodyRenderLite: (dataIndex: number) => {
            const canDelete =
              dataState[dataIndex][2] !== 'admin' && user?.profile === 'Administrador'
            const canEdit =
              (user?.profile === 'Administrador' && dataState[dataIndex][2] !== 'admin') ||
              (dataState[dataIndex][2] !== 'admin' &&
                dataState[dataIndex][3] === 'Aluno' &&
                ['Administrador', 'Professor'].includes(user?.profile))

            return (
              <>
                <ButtonEdit
                  mr="1"
                  size="xs"
                  isDisabled={!canEdit}
                  onClick={() =>
                    onOpenModalCreateUpdate({
                      type: 'Editar usuário',
                      id: dataState[dataIndex][0].id,
                      name: dataState[dataIndex][1],
                      username: dataState[dataIndex][2],
                      profile: dataState[dataIndex][3],
                      situation: dataState[dataIndex][4] === 'Ativo' ? 'A' : 'I'
                    })
                  }
                >
                  Editar
                </ButtonEdit>

                <PopoverConfirm
                  actionConfirm={() => deleteUser(dataState[dataIndex][0].id)}
                  messageBody="Tem certeza que deseja excluir o usuário?"
                >
                  <ButtonDelete size="xs" isDisabled={!canDelete}>
                    Excluir
                  </ButtonDelete>
                </PopoverConfirm>
              </>
            )
          }
        }
      }
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataState])

  return (
    <ThemeProvider theme={theme}>
      <MUIDataTable title="" data={dataState} columns={columns} options={options} />
    </ThemeProvider>
  )
}

export default memo(MUITable)
