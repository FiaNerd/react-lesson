// Allt i react är uppbbyggt med HOOKS
import { useState } from 'react'
import './App.css'

type Post = {
    // id: number,
    title: string,
    likes: number,
}

const App = () => {

    // Stateful variabel
    // Array destructer 
    const [ msg, setMsg ] = useState<string>("Hi you, im't stateful!")
    const [ clicks, setClicks ] = useState<number>(0)

    // Behöver sätta en Array of Post
    const [ post, setPost ] = useState<Post[]>([
        { title: "React rocks 🤘🏻", likes: 1337 },
        { title: "JSX rocks even more 🤘🏻", likes: 999 },
        { title: "Got state?", likes: 1337 },
    ]) // Det är helt ok med vanliga variabler om man inte vill att dem ska överleva rendeingarna
    // const [ post, setPost ] = useState<Post[]>([
    //     {id: 1, title: "React rocks 🤘🏻", likes: 1337},
    //     {id: 2, title: "JSX rocks even more 🤘🏻", likes: 999},
    //     {id: 3, title: "Got state?", likes: 1337},
    // ]) // Det är helt ok med vanliga variabler om man inte vill att dem ska överleva rendeingarna



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

        <button className='btn btn-warning btn-lg' onClick={() => {setMsg("Hey you")}}> Hey you!</button>

        <h2>Post</h2>
        <ul>
            { post.map( (post, index) => (
                //Måste skriva när du har lista av array och ska mappa över så måset det finns en key (nucker). När man kör map så måste det fösta elementet i ha en key: Så den första föräldren inut map()
            <li key={index}>{post.title} ({post.likes})</li>
            ))
         }
        </ul>
    </div>
  )
}

export default App
