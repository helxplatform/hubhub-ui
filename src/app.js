import { Layout } from './components/layout'
import { Routes, Route } from 'react-router-dom'
import {
  ProjectsView,
} from './views'

export const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={ <ProjectsView /> } />
      </Routes>
    </Layout>
  )
}
