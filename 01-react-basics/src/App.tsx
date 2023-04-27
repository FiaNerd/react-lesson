// Allt i react är uppbbyggt med HOOKS
import { useState } from 'react'
import './App.css'
import ClickCounter from './components/ClickCounter'
import Salary from './components/Salary'

type Post = {
    // id: number,
    title: string,
    likes: number,
}

const App = () => {

    // Stateful variabel
    // Array destructer 
    const [ msg, setMsg ] = useState<string>("Hi you, im't stateful!")

    
   
    // Behöver sätta en Array of Post
    const [ posts, setPosts ] = useState<Post[]>([
        { title: "React rocks 🤘🏻", likes: 1337 },
        { title: "JSX rocks even more 🤘🏻", likes: 999 },
        { title: "Got state?", likes: 1337 },
    ]) // Det är helt ok med vanliga variabler om man inte vill att dem ska överleva rendeingarna

    // const [ post, setPost ] = useState<Post[]>([
    //     {id: 1, title: "React rocks 🤘🏻", likes: 1337},
    //     {id: 2, title: "JSX rocks even more 🤘🏻", likes: 999},
    //     {id: 3, title: "Got state?", likes: 1337},
    // ]) // Det är helt ok med vanliga variabler om man inte vill att dem ska överleva rendeingarna

    // Hittar rätt post när man klickar på en post.. så när man klicjar på en post.. så hittar den rätt post
    const handleAddLike = (post:Post) => {
        post.likes++ // Ökar likes med 1
        console.log(post.likes);

        setPosts([...posts]); // Behöver skapa en ny array för att kunna skriva ut det i browsern, så kommer inte uppdateras om man endast gör setPosts(posts), måste göra en array desturcturing för att kunna uppdatera och rednera om dem efter varje like ändring. Om man sätter post så fattar inte React att den ska uppdateras, det som öagras i variabeln i post är egentligen bara en genväg till objektet. Den pekar på samma objekt, så man ändrar aldrig den, om man skapar en ny array och sprider ut post till den, så det som lagras i new post är en pekare som pekar på ett annat objekt, så nu pekar man på ett annat objekt så renderar den om appen, så ser React det och skriver om det. Varje gång man likar så blir posten en helt ny lista. Men det är fortfarand samma objekt. För att React ska fatta att det har skett en förändring så behöver man ändra staten på något sätt 
        console.log('Wabt to add like to post', post);
    }


    const handleDeletePost = (postToDelete: Post) => {
        // setPosts(posts.filter(item => item.title !== post.title)) // finns ingen anlednign att göra post.title för att då kommer alla med samma title raderas. Vil vill endast radera det vi klickar på oavsett om det är två som har samma titel
        // setPosts(posts.filter(postItem => postItem !== postToDelete))
        setPosts(prevPosts => prevPosts.filter(deleteItem => deleteItem !== postToDelete )) // Det är gamla post man filtrerar

        console.log("You have delete: ", postToDelete.title);
    }

    // let msg = 'Welcome to my application'
    // console.log(msg);


  

  return (
    <div className="App">
        <h1>React basic</h1>
       
        <ClickCounter /> 

        <button className='btn btn-warning btn-lg' onClick={() => {setMsg("Hey you")}}> Hey you!</button>

        <hr/>
      
        <Salary />


        <hr />

        <h2>Post</h2>

    { posts.length > 0  ? (
        <ul>
            { posts.map( (post, index) => (
                //Måste skriva när du har lista av array och ska mappa över så måset det finns en key (nucker). När man kör map så måste det fösta elementet i ha en key: Så den första föräldren inut map()
         <li key={index}>{ post.title} ({post.likes})
            <button 
            className='btn btn-success btn-sm ms-4'
            onClick={() => handleAddLike(post)} //Hittar Rätt post när man klickar
            >🤍</button>
            <button className='btn btn-danger btn-sm ms-4' onClick={() => handleDeletePost(post) }>🗑️</button>
            </li>
            
            ))
        }
        
        </ul>
        ) : (
            <h3>No post yet</h3>
        )}
    </div>
  )
}

export default App
