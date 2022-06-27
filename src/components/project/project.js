import { Fragment } from 'react'
import PropTypes from 'prop-types'
import './project.scss'

const Artifacts = ({ containers, dockerhub }) => {
  return (
    <div className="artifacts-list">
      {
        dockerhub && (
          <div className="artifact dockerhub">
            + DockerHub: <a
              href={ `https://hub.docker.com/r/helxplatform/${ dockerhub.repository_name }` }
              target="_blank"
              rel="noopener noreferrer"
            >{ dockerhub.repository_name }</a>
          </div>
        )
      }
      {
        containers && (
          <div className="artifact containers">
            + Containers: <a
              href={ `https://containers.renci.org/helxplatform/${ containers.repository_name }` }
              target="_blank"
              rel="noopener noreferrer"
            >{ containers.repository_name }</a>
          </div>
        )
      }
    </div>
    )
}

Artifacts.propTypes = {
  containers: PropTypes.shape({
    repository_name: PropTypes.string.isRequired,
    digest: PropTypes.string.isRequired,
  }),
  dockerhub: PropTypes.shape({
    repository_name: PropTypes.string.isRequired,
    digest: PropTypes.string.isRequired,
  }),
}

//

const Tag = ({ tag }) => {
  const {
    tag_name,
    github_commit_hash,
    github_repository_name,
    artifacts,
  } = tag

  return (
    <div className="tag">
      <div className="tag-name">
        {
          github_repository_name && tag_name ? (
            <Fragment>
              <a
                href={ `https://github.com/helxplatform/${ github_repository_name }/releases/tag/${ tag_name }` }
                target="_blank"
                rel="noopener noreferrer"
              >
                { tag_name }
              </a>
              <span className="github-hash"> - { github_commit_hash }</span>
            </Fragment>
          ) : tag_name
        }
      </div>
      <Artifacts { ...artifacts } />
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
              <h4 className="tags-list-heading">
                <strong>TAGS</strong> ({ Object.keys(tags).length })
              </h4>
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
