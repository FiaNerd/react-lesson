import './assets/scss/App.scss'
import Container from 'react-bootstrap/Container';
import { Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import TodosPage from './pages/TodosPage';
import Navigation from './components/partials/Navigation';

const App = () => {
	
    //path är som properties, den som laddas in när man går in på sidan. 
    //Element är den sidan som man vill visa
	return (
        <div id="App">
            {/* Navigation */}
            <Navigation />
            <Container className='py-3'>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path='/todos' element={<TodosPage />} />
                </Routes>
            </Container>
        </div>
	)
}

export default App
