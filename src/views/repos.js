import { useMemo } from 'react'
import { useQuery } from 'react-query'
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

const columns = [
  {
    field: 'id',
    headerName: 'Repository',
    width: 300,
  },
]

export const ReposView = () => {
  const { isLoading, error, data } = useQuery('projects', () => 
    fetch('https://hubhub-jeffw.apps.renci.org/app/current')
      .then(response => response.json())
  )

  const tableData = useMemo(() => data
    ? Object.keys(data.projects)
      .map(key => ({ id: data.projects[key].repository_name }))
    : [], [data])

  return (
    <div>
      { isLoading && <div>Loading repositories...</div> }
      {
        !isLoading && (
          <Box sx={{ height: 800, width: '100%' }}>
            <DataGrid
              rows={ tableData }
              columns={ columns }
            />
          </Box>
        )
      }
    </div>
  )
}