import { Layout } from './components/layout'
import { Routes, Route } from 'react-router-dom'
import {
  ReposView,
} from './views'

export const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={ <ReposView /> } />
      </Routes>
    </Layout>
  )
}
