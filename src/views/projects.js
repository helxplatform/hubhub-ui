import { useMemo } from 'react'
import { Box, LinearProgress, useTheme } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { useApp } from '../context'

const columns = [
  {
    field: 'id',
    headerName: 'Repository',
    flex: 1,
  },
  {
    field: 'tags',
    headerName: 'Latest Tag',
    width: 300,
  },
]

export const ProjectsView = () => {
  const theme = useTheme()
  const { isLoading, onlyConnected, projects, setCurrentProjectID } = useApp()

  const tableData = useMemo(() => projects
    ? Object.keys(projects)
      .filter(key => onlyConnected
        ? Object.keys(projects[key].tags).some(tag => Object.keys(projects[key].tags) && projects[key].tags[tag].is_connected)
        : key
      )
      .map(key => ({
        id: projects[key].repository_name,
        tags: Object.keys(projects[key].tags)[0],
      }))
    : [], [onlyConnected, projects])

  const handleClickRow = data => {
    setCurrentProjectID(data.id)
  }

  return (
    <Box sx={{
      width: '100%',
      '& .MuiDataGrid-toolbarContainer': {
        alignItems: 'stretch',
        backgroundColor: theme.palette.background.paper,
        transition: 'background-color 300ms',
        padding: '4px 0 0 0',
        borderBottom: '1px solid #333',
        '& > button': {
          padding: '0 1rem',
        },
        '& .MuiFormControl-root': {
          // flex: 1,
          minWidth: '200px',
          '& .MuiFormControl-root': {
            border: 0,
          },
        },
      },
      '& .MuiDataGrid-root': {
        border: 0,
      },
    }}>
      <DataGrid
        rows={ tableData }
        columns={ columns }
        onRowClick={ handleClickRow }
        autoPageSize
        disableColumnSelector
        loading={ isLoading }
        components={{
          LoadingOverlay: LinearProgress,
          Toolbar: GridToolbar,
        }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: {
              debounceMs: 500,
            },
          },
          row: { style: {
            cursor: 'pointer',
            border: 0,
          }},
        }}
        sx={{
          '& .MuiDataGrid-cell': {
            border: 0,
            '&:focus': {
              outline: 'none',
            },
          },
          '& .MuiDataGrid-row:hover': { backgroundColor: 'rgba(25, 118, 210, 0.04)', },
        }}
      />
    </Box>
  )
}