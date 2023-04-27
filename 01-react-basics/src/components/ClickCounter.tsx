import { useState } from 'react'
const ClickCounter = () => {
    const [ clicks, setClicks ] = useState<number>(0)


    const handleBtnClick = () => {

        // Innan så när vi skickade in clicks + 1 blev det 0 + 1, så sätt klickat kallades på talet 1. Men när man skickar in en funktion så kommer den att köra denna funktionen, så det nuvarande värdet kommer att ändras vid varje funktion. Den väntar på funktionen retur värde. Det blir som en kö till state uppdateringen. 
        setClicks((prevState) => {return prevState + 1}) // prevState = 0, reurn 1
        setClicks((prevState) => {return prevState + 1}) // prevState = 1, reurn 2

        // Så behöver prevState för att kunna göra dubbla klick
       // setClicks(clicks + 1)
        //setClicks(clicks + 1) // För att du har kopierat två cklikc, så gör det inte att det blir fler klick pper gång, detta för att den inte har hunnit uppdateras, så blir fortfarande bara ett klick
    }


    return (
        <>
        <h2>Click Counter</h2>
        <p>U have cliked the button {clicks} times </p>

        <button className='btn btn-success btn-lg' onClick={handleBtnClick}> Click Me!</button>
        </>
    )

}

export default ClickCounter