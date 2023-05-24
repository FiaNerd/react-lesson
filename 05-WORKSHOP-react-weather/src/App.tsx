import { useState } from 'react'
import Forecast from './components/Forecast'
import SearchCity from './components/SearchCity'
import { getCurrentWeather } from './services/owmapi'
import { ICurrentWeather } from './types'
import Airplane from './assets/images/747.svg'
import './assets/scss/App.scss'


function App() {
    const [ weather, setWeather ] = useState<ICurrentWeather | null>(null)
    const [ isLoading, setIsLoading ] = useState(false)
    const [ isError, setIsError ] = useState("")

    const handleSearch = async (location: string) => {

        setIsError("")
        setIsLoading(true)

        try {
            const response = await getCurrentWeather(location)

            setWeather(response)

            setIsLoading(false)
            
        } catch (err){
            console.log(err)
            setIsError("Sorry, can't find the city!")
            setIsLoading(false)
        }
    }

	return (

        <div id="app" className="container">
            { isLoading ? (
                <img src={Airplane} alt="airplane" />
              
            ): (
            <>
                <SearchCity onSearchCity={handleSearch}/>

                { isError && <div className="alert alert-danger">{isError}</div>}

                { weather && !isError &&  <Forecast currentWeather={weather} /> }
            </>
            )}
		</div>
    )
}

export default App
