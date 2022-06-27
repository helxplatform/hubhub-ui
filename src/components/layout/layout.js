import { Fragment, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import helxLogo from '../../images/helx-logo.png'
import { Menu } from './menu'
import './layout.scss'

const SIDEBAR = {
  MAX_WIDTH: '200px',
  MIN_WIDTH: '0',
}

export const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const sidebarClasses = useMemo(() => {
    let classes = ['sidebar']
    if (sidebarOpen) {
      classes.push('open')
    }
    return classes.join(' ')
  }, [sidebarOpen])

  return (
    <Fragment>
      <div
        className="sidebar"
        style={{ width: sidebarOpen ? SIDEBAR.MAX_WIDTH : SIDEBAR.MIN_WIDTH }}
      >
        <Menu />
      </div>
      <div
        className="content"
        style={{ marginLeft: sidebarOpen ? SIDEBAR.MAX_WIDTH : SIDEBAR.MIN_WIDTH }}
      >
        <header>
          <button onClick={ () => setSidebarOpen(!sidebarOpen) }>
            { sidebarOpen ? 'x' : '☰' }
          </button>
          <Link to="/"><img src={ helxLogo } width="75" alt="" /></Link>
        </header>
        <main>
          { children }
        </main>
      </div>
    </Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
}
