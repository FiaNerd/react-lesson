import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './themes/theme'
import './App.css'
import TodoList from './components/TodoList';
import { Typography } from '@mui/material';


function App() {
  return (
    <>
     <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>  
        <Typography component="h1" variant="h2">
             Todos
      </Typography>
            <TodoList />
      </main>
    </ThemeProvider>
    </>
  )
}

export default App
