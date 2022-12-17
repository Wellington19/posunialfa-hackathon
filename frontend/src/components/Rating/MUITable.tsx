import React, { memo, useEffect, useMemo, useState } from 'react'
import MUIDataTable, { SelectableRows } from 'mui-datatables'
import { ThemeProvider } from '@material-ui/core/styles'
import { Badge } from '@chakra-ui/react'
import { ButtonDelete, ButtonEdit, PopoverConfirm } from '@componentsUI/exports'
import { executeSort, textLabels, getTheme } from '@utils/configMuiTable'
import { useModalContext } from '@contexts/ModalContext'
import { useMUITableContext } from '@contexts/MUITableContext'
import { formatDateptBR } from '@utils/format'
import { getColorSituation } from '@utils/functions'

const theme = getTheme({ boxShadowPaper: 'none' })

const columnsTable = [
  '',
  'Nome aluno',
  'Altura',
  'Peso',
  'IMC',
  'Classificação',
  'Grau',
  'Avaliador',
  'Data avaliação'
]

interface IProps {
  data: any[]
  count: number
}

function MUITable({ data, count }: IProps) {
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
      'Nome aluno',
      'Altura',
      'Peso',
      'IMC',
      'Classificação',
      'Grau',
      'Avaliador',
      {
        name: 'Data avaliação',
        options: {
          customBodyRenderLite: (dataIndex: number) => {
            return formatDateptBR(dataState[dataIndex][8])
          }
        }
      },
      {
        name: 'Ações',
        options: {
          filter: false,
          sort: false,
          empty: true,
          customBodyRenderLite: (dataIndex: number) => {
            return (
              <>
                <ButtonEdit
                  mr="1"
                  size="xs"
                  onClick={() =>
                    onOpenModalCreateUpdate({
                      type: 'Editar avaliação'
                    })
                  }
                >
                  Editar
                </ButtonEdit>

                <PopoverConfirm
                  actionConfirm={() => console.log('')}
                  messageBody="Tem certeza que deseja excluir o usuário?"
                >
                  <ButtonDelete size="xs">Excluir</ButtonDelete>
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
