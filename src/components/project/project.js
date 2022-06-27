import PropTypes from 'prop-types'
import './project.scss'

const Tag = ({ tag }) => {
  const { tag_name } = tag
  return (
    <div className="tag">
      <span>- { tag_name }</span>
    </div>
  )
}

Tag.propTypes = {
  tag: PropTypes.object.isRequired,
}

//

export const Project = ({ project }) => {
  const { repository_name, tags } = project
  return (
    <div className="project">
      <h3 className="project-name">{ repository_name }</h3>
      <div className="details">
        {
          Object.keys(tags).length > 0 && (
            <div className="tags-list">
              <strong>TAGS</strong><br />
              {
                Object.keys(tags).map(key => (
                  <Tag key={ `${ repository_name }-${ key }` } tag={ tags[key] } />
                ))
              }
            </div>
          )
        }
      </div>
      
      <div className="debug">
        <details>
          <summary>RAW</summary>
          <pre className="project-json">
            { JSON.stringify(project, null, 2) }
          </pre>
        </details>
      </div>
    </div>
  )
}

Project.propTypes = {
  project: PropTypes.shape({
    repository_name: PropTypes.string.isRequired,
    tags: PropTypes.object.isRequired,
  })
}
