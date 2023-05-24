import { useState } from 'react'
import Forecast from './components/Forecast'
import SearchCity from './components/SearchCity'
import { getCurrentWeather } from './services/owmapi'
import { ICurrentWeather } from './types'
import Airplane from './assets/images/747.svg'
import './assets/scss/App.scss'

function App() {
  const [weather, setWeather] = useState<ICurrentWeather | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState<string | null>(null)

  const handleSearch = async (location: string) => {
    setIsLoading(true)
    setIsError(null)

    try {
      const response = await getCurrentWeather(location)
      setWeather(response)
    } catch (err) {
      console.log(err)
      setIsError(`Sorry, can't find the city "${location}"!`)
    }

    setIsLoading(false)
  }

  return (
    <div id="app" className="container">
      {isLoading ? (
        <img src={Airplane} alt="airplane" />
      ) : (
        <>
          <SearchCity onSearchCity={handleSearch} />

          {isError && (
              <div className="alert alert-danger">{isError}</div>
          )}

          {!isError && weather && <Forecast currentWeather={weather} />}
        </>
      )}
    </div>
  )
}

export default App
