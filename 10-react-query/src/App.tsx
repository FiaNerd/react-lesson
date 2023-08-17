import Container from 'react-bootstrap/Container'
import './assets/scss/App.scss'
import { Routes, Route } from 'react-router-dom'
import Navigation from './pages/partials/Navigation'
import HomePage from './pages/HomePage'
import PageNotFound from './pages/PageNotFound'
import RandomCatPage from './pages/RandomCatPage'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import GlobalFetchingSpinner from './components/GlobalFetchingSpinner'

const App = () => {

  return (
    <div id='App'>
        <Navigation />

        <GlobalFetchingSpinner />

        <Container className='py-3'>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/random-cat' element={<RandomCatPage />} />

                <Route path='*' element={<PageNotFound />} />
            </Routes>
        </Container>

        {/* Kör först i terminalen 
        npm i @tanstack/react-query-devtools  
        Sedan länka in denna så du får fram devTools i webbläsaren*/}
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right"/>
    </div>
  )
}

export default App
