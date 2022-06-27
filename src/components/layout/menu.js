import { Link } from 'react-router-dom'

const items = [
  { text: 'repos', path: '/' },
]

export const Menu = () => {
  return (
    <nav className="menu">
      <ul>
        {
          items.map(item => (
            <li key={ `menu-${ item.text }` }>
              <Link to={ item.path }>{ item.text }</Link>
            </li>
          ))
        }
      </ul>
    </nav>
  )
}
