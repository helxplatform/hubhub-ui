import { Layout } from './components/layout'
import { Routes, Route } from 'react-router-dom'
import {
  DeploymentsView,
  HomeView,
  ReposView
} from './views'

export const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={ <HomeView /> } />
        <Route path="/repos" element={ <ReposView /> } />
        <Route path="/deployments" element={ <DeploymentsView /> } />
      </Routes>
    </Layout>
  )
}
