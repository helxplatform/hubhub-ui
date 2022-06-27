import { useQuery } from 'react-query'

export const ReposView = () => {
  const { isLoading, error, data } = useQuery('projects', () => 
    fetch('https://hubhub-jeffw.apps.renci.org/app/current')
      .then(response => response.json())
  )

  console.log('error?', error)

  return (
    <p>
      { isLoading && <div>Loading repositories...</div> }
      <ul>
        {
          !isLoading && (
            Object.keys(data.projects).map(key => (
              <li key={ key }>{ key }</li>
            ))
          )
        }
      </ul>
    </p>
  )
}