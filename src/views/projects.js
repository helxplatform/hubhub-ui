import { useMemo, useState } from 'react'
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useApp } from '../context'

const columns = [
  {
    field: 'id',
    headerName: 'Repository',
    width: 300,
  },
  {
    field: 'tags',
    headerName: 'Latest Tag',
    width: 300,
  }
]

export const ProjectsView = () => {
  const { projects, setCurrentProjectID } = useApp()
  const [pageSize, setPageSize] = useState(25)

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
      />
    </Box>
  )
}