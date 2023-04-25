import { useState } from 'react'
import './App.css'
// Allt i react är uppbbyggt med HOOKS

const App = () => {

    // Stateful variabel
    // Array destructer 
    const [ msg, setMsg ] = useState<string>("Hi you, im't stateful!")
    const [ clicks, setClicks ] = useState<number>(0)

    // let msg = 'Welcome to my application'
    // console.log(msg);

    const handleBtnClick = () => {
        setClicks(clicks + 1)
    }

  return (
    <div className="App">
        <h1>React basic</h1>
        <h2>{msg}</h2>
        <p>U have cliked the button {clicks} times </p>

        <button className='btn btn-success btn-lg' onClick={handleBtnClick}> Click Me!</button>
    </div>
  )
}

export default App
