import { useMemo } from 'react'
import { Box, LinearProgress, useTheme } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { useApp } from '../context'

export const ProjectsView = () => {
  const theme = useTheme()
  const { isLoading, isError, settings, projects, setCurrentProjectID } = useApp()

  const countTags = (params, connected) => {
    if (connected) {
      return Object.keys(projects[params.row.id].tags)
        .filter(tag => projects[params.row.id].tags[tag].is_connected)
        .length
    }
    return Object.keys(projects[params.row.id].tags).length
  }

  const columns = useMemo(() => [
    {
      field: 'id',
      headerName: 'Repository',
      flex: 1,
    },
    {
      field: 'latestTag',
      headerName: 'Latest Tag',
      width: 200,
      // valueGetter: params => {
      //   const lastDate = Object.keys(projects[params.row.id].tags)
      //     .filter(tag => projects[params.row.id].tags[tag].github_tag_date)
      //     .map(tag => {
      //       const { tag_name, github_tag_date } = projects[params.row.id].tags[tag]
      //       return { tag_name, github_tag_date }
      //     })
      //     // .sort((t, u) => t.github_tag_date < u.github_tag_date ? -1 : 1)
      //   console.table(lastDate)
      //   return 'WIP'
      // },
    },
    {
      field: 'tag-count',
      headerName: '# Tags',
      width: 125,
      valueGetter: params => countTags(params),
    },
    {
      field: 'connections',
      headerName: '# Connections',
      width: 175,
      valueGetter: params => countTags(params, true),
    },
  ], [projects])

  const tableData = useMemo(() => projects
    ? Object.keys(projects)
      .filter(key => settings.onlyConnected
        ? Object.keys(projects[key].tags).some(tag => Object.keys(projects[key].tags) && projects[key].tags[tag].is_connected)
        : key
      )
      .map(key => ({
        id: projects[key].repository_name,
        latestTag: Object.keys(projects[key].tags)[0],
      }))
    : [], [settings.onlyConnected, projects])

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
        error={ isError || null }
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