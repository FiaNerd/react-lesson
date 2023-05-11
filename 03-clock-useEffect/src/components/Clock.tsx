import { useEffect, useState } from "react";

const Clock = () => {

    const [ time, setTime ] = useState(() => { 
        console.log("I'm initing");
        return new Date().toLocaleTimeString()}) // En funktion i useState()

        // Här startar vi upp timerns
    useEffect(() => {
        console.log("Starting clock");

        setInterval(() => {
            setTime(new Date().toLocaleTimeString())
            console.log("tick")
        }, 1000 )
    },[] ) 

    // userEffect körs efetr den har renderat färdigt 
    useEffect(() => {
        document.title = time
    }, [ time ])


  return(
    <>
    <p>I am a Tic Toc</p>
    <div className="display-1 text-center">
				{ time }
			</div>
    </>
  )
}

export default Clock
