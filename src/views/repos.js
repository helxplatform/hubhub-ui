import { useMemo } from 'react'
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useApp } from '../context'

const columns = [
  {
    field: 'id',
    headerName: 'Repository',
    width: 300,
  },
]

export const ReposView = () => {
  const { projects, setCurrentProjectID } = useApp()

  const tableData = useMemo(() => projects
    ? Object.keys(projects)
      .map(key => ({ id: projects[key].repository_name }))
    : [], [projects])

  const handleClickRow = data => {
    setCurrentProjectID(data.id)
  }

  return (
    <Box sx={{ height: 800, width: '100%' }}>
      <DataGrid
        rows={ tableData }
        columns={ columns }
        onRowClick={ handleClickRow }
      />
    </Box>
  )
}