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
    // Behöver sätta en Array of Post
    const [ posts, setPosts ] = useState<Post[]>([
        { title: "React rocks 🤘🏻", likes: 1337 },
        { title: "JSX rocks even more 🤘🏻", likes: 999 },
        { title: "Got state?", likes: 1337 },
    ]) // Det är helt ok med vanliga variabler om man inte vill att dem ska överleva rendeingarna
    
    const [ msg, setMsg ] = useState<string>("Hi you, i'm stateful!")

    // input State
    const [ newPostTitle, setNewPostTitle] = useState<string>("")


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

   
    const handleFormSubmit = (e: React.FormEvent) => {
        // Strop form from submitting
        e.preventDefault()

        // Add a nwe post to be post state
        const newPost: Post = { 
            title: newPostTitle,
            likes: 0
        }

        // Måste skapa en ny post och göra en spread, så måste göra en ny array när du ska göra en post
        setPosts([...posts, newPost])

        //Clear a newPostTitle state
        setNewPostTitle("")
    }

  

  return (
    <div className="App">
        <h1>React basic</h1>
        <h2>{msg}</h2>
       
        <ClickCounter /> 

        <button className='btn btn-warning btn-lg' onClick={() => {setMsg("Hey you")}}> Hey you!</button>

        <hr/>
      
        <Salary />

        <hr />

        <h2>Post</h2>

        <form onSubmit={handleFormSubmit}>
            <div className='input-group mb-3'>
                <input 
                    type="text" 
                    className='form-control' 
                    placeholder='Post title'
                    onChange={(e) => setNewPostTitle(e.target.value)} // Denna körs för varje ändring som görs. 
                    value={newPostTitle}
                    required
                    />
                <button 
                    type='submit' 
                    className='btn btn-primary bg-white text-black'
                    >
                        Create
                </button>
                { newPostTitle.length > 0 && newPostTitle.length < 5 && (
                    <div className="form-text text-warning d-block">Title has to be at leats 5 chars</div>
                )

                }
            </div>
        </form>

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
