import { useQuery } from 'react-query'
import { Project } from '../components/project'

export const ReposView = () => {
  const { isLoading, error, data } = useQuery('projects', () => 
    fetch('https://hubhub-jeffw.apps.renci.org/app/current')
      .then(response => response.json())
  )

  console.log('error?', error)

  return (
    <div>
      { isLoading && <div>Loading repositories...</div> }
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {
          !isLoading && (
            Object.keys(data.projects).map(key => (
              <Project
                key={ key }
                project={ data.projects[key] }
              />
            ))
          )
        }
      </div>
    </div>
  )
}