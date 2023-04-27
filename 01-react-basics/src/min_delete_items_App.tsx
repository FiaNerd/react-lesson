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
    const [ showSalary, setShowSalary ] = useState<boolean>(false)
    
   
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


    const handleDeleteLikes = (post: Post) => {
        // setPosts(posts.filter(item => item.title !== post.title))
        setPosts([...posts.filter(item => item.title !== post.title)])

        console.log(post.title);
    }
      
    const postEmpty = posts ? 'No posts': 'POST empty' 

    const handleBtnClick = () => {

        // Innan så när vi skickade in clicks + 1 blev det 0 + 1, så sätt klickat kallades på talet 1. Men när man skickar in en funktion så kommer den att köra denna funktionen, så det nuvarande värdet kommer att ändras vid varje funktion. Den väntar på funktionen retur värde. Det blir som en kö till state uppdateringen. 
        setClicks((prevState) => {return prevState + 1}) // prevState = 0, reurn 1
        setClicks((prevState) => {return prevState + 1}) // prevState = 1, reurn 2

        // Så behöver prevState för att kunna göra dubbla klick
       // setClicks(clicks + 1)
        //setClicks(clicks + 1) // För att du har kopierat två cklikc, så gör det inte att det blir fler klick pper gång, detta för att den inte har hunnit uppdateras, så blir fortfarande bara ett klick
    }

    // let msg = 'Welcome to my application'
    // console.log(msg);


    const buttonSalary = showSalary ? 'Hide salary' :  'Show salary';

    const [ salary, setSalary ] = useState(10)

    const handleChangeSalary = (amount: number) => {
        if(salary + amount < 5){
            setSalary(5)
            return
        }

        setSalary(salary + amount)
    }


  return (
    <div className="App">
        <h1>React basic</h1>
        <h2>{msg}</h2>
        <p>U have cliked the button {clicks} times </p>

        <button className='btn btn-success btn-lg' onClick={handleBtnClick}> Click Me!</button>

        <button className='btn btn-warning btn-lg' onClick={() => {setMsg("Hey you")}}> Hey you!</button>

        <hr/>
        <button className='btn btn-primary' onClick={() => setShowSalary(!showSalary)}>{buttonSalary}</button>

        { showSalary && (
            <>
                <h2>Salary</h2>

                <p>Salary per hour: {salary} &euro;</p>

                { salary < 10 && (
                    <div className="alert alert-warning">You got very low payed</div>
                )}
        
                    <div className="buttons">
                        <div className="mb-1">
                            <button
                                className="btn btn-primary btn-lg"
                            onClick={() => handleChangeSalary (+ 1)}>Raise 1 &euro; 🤑</button>
                            <button
                                className="btn btn-warning btn-lg"
                                onClick={() => handleChangeSalary( - 1)}>Decrease 1 &euro; 😢</button>
                        </div>
        
                        <div className="mb-1">
                            <button
                                className="btn btn-success btn-lg"
                                onClick={() => handleChangeSalary( + 5)}>Raise 5 &euro; 🤑🤑🤑</button>
                            <button
                                className="btn btn-danger btn-lg"
                                onClick={() => handleChangeSalary( - 5)}>Decrease 5 &euro; 😢😢😢</button>
                        </div>
                    </div>
                </>
            )
        }

        <hr />

        <h2>Post</h2>

    { posts.length > 0  ? (
        <ul>
            { posts.map( (posts, index) => (
                //Måste skriva när du har lista av array och ska mappa över så måset det finns en key (nucker). När man kör map så måste det fösta elementet i ha en key: Så den första föräldren inut map()
         <li key={index}>{ posts.title} ({posts.likes} {postEmpty})
            <button 
            className='btn btn-success btn-sm ms-4'
            onClick={() => handleAddLike(posts)} //Hittar Rätt post när man klickar
            >🤍</button>
            <button className='btn btn-danger btn-sm ms-4' onClick={() => handleDeleteLikes(posts) }>🗑️</button>
            </li>
            
            ))
        }
        
        </ul>
        ): <h3>No post yet</h3>}
    </div>
  )
}

export default App
