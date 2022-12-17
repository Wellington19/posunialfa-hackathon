/* eslint-disable prettier/prettier */
import { createTheme, Theme } from '@material-ui/core/styles'

export const textLabels = {
  body: {
    noMatch: 'Nenhum registro correspondente encontrado',
    toolTip: 'Ordenar',
    columnHeaderTooltip: column => `Ordenar por ${column.label}`
  },
  pagination: {
    next: 'Próxima página',
    previous: 'Voltar página',
    rowsPerPage: 'Linhas por página:',
    displayRows: 'de',
    jumpToPage: 'Página:'
  },
  toolbar: {
    search: 'Procurar',
    downloadCsv: 'Download CSV',
    print: 'Imprimir',
    viewColumns: 'Ver colunas',
    filterTable: 'Filtrar tabela'
  },
  filter: {
    all: 'Todos',
    title: 'Filtros',
    reset: 'Resetar'
  },
  viewColumns: {
    title: 'Ver colunas',
    titleAria: 'Ver/Esconder colunas tabela'
  },
  selectedRows: {
    text: 'linha(s) selecionadas',
    delete: 'Deletar',
    deleteAria: 'Deletar linha selecionadas'
  }
}

export function getTheme(config?: TConfigTheme): Theme {
  return createTheme({
    palette: {
      primary: {
        main: '#0064B0'
      }
    },
    overrides: {
      ...(config?.boxShadowPaper
        ? {
          MuiPaper: {
            elevation4: {
              boxShadow: config.boxShadowPaper
            }
          }
        }
        : {}),
      MuiTableHead: {
        root: {
          wordBreak: 'normal',
          whiteSpace: 'nowrap'
        }
      },
      MuiTableCell: {
        body: {
          fontSize: config?.fontSizeBody ? config.fontSizeBody : '0.800rem',
          wordBreak: 'normal',
          whiteSpace: 'nowrap'
        }
      },
      MUIDataTableHeadCell: {
        fixedHeader: {
          zIndex: 0
        }
      },
      ...(config?.bgColorTableRowSelected
        ? {
          MuiTableRow: {
            root: {
              '&$selected': {
                backgroundColor: config.bgColorTableRowSelected
              }
            }
          }
        }
        : {}),
      MuiCheckbox: {
        root: {
          height: '0.750rem'
        }
      },
      MUIDataTableSelectCell: {
        ...(config?.displaySelectCell
          ? {
            root: {
              display: config.displaySelectCell
            }
          }
          : {}),
        expandDisabled: {
          visibility: 'hidden'
        }
      }
    }
  })
}

export function executeSort({ column, order, data, columnsTable }: TExecuteSort): Promise<any> {
  return new Promise((resolve, reject) => {
    if (order) {
      const sortCol = columnsTable.indexOf(column)

      if (order === 'asc') {
        data.sort((a, b) => {
          if (a[sortCol] < b[sortCol]) return -1
          if (a[sortCol] > b[sortCol]) return 1
          return 0
        })
      } else {
        data.sort((a, b) => {
          if (a[sortCol] < b[sortCol]) return 1
          if (a[sortCol] > b[sortCol]) return -1
          return 0
        })
      }
    }

    setTimeout(() => {
      resolve(data)
    }, 50)
  })
}
