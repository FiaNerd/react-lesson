import { useEffect, useState } from "react";

const Clock = () => {

    const [ time, setTime ] = useState(() => { 
        console.log("I'm initing");
        return new Date().toLocaleTimeString()}) // En funktion i useState()

       
    useEffect(() => {
        console.log("Clock is mounted. Tsarting clock");
         // Här startar vi upp timerns
        // This will only be executed when the componen it mounted
        // and only AFTER the component has been render
        const intervalId = setInterval(() => {
            setTime(new Date().toLocaleTimeString())
            console.log("tick")
        }, 1000 )

        {/* Stoppar klockan genom att returnera den, så behöver inte kalla på den. Så endast retunerar en funktion som aldrig kallas på. Retunerar en funktion */}
        return () => {
            // This cleanup funtion will be executed when 
            // the component is about to be unmounted
            console.log("Clock is beeing unmonthed. Stopping timer")
            clearInterval(intervalId)
            console.log(intervalId);
        } 
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
