import Container from 'react-bootstrap/Container'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import './assets/scss/App.scss';
import Navigation from './components/Navigation';
import NotFound from './pages/NotFound';
import SearchPage from './pages/SearchPage';


const App = () => {
  return (
    <>
      <div id="App">
        <Navigation/>

        <Container>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage/>} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Container>
      </div>
    </>
  )
}

export default App
