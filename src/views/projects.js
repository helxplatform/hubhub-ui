import { useMemo } from 'react'
import { Box, LinearProgress } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
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
  const { projects, setCurrentProjectID, isLoading } = useApp()

  const tableData = useMemo(() => projects
    ? Object.keys(projects)
      .map(key => ({
        id: projects[key].repository_name,
        tags: Object.keys(projects[key].tags)[0],
      }))
    : [], [projects])

  const handleClickRow = data => {
    setCurrentProjectID(data.id)
  }

  return (
    <Box sx={{ height: 1200, width: '100%' }}>
      <DataGrid
        rows={ tableData }
        columns={ columns }
        onRowClick={ handleClickRow }
        autoPageSize
        loading={ isLoading }
        components={{
          LoadingOverlay: LinearProgress,
        }}
        componentsProps={{
          row: { style: {
            cursor: 'pointer',
            border: 0,
          }}
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