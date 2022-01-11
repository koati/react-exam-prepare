import React, {useState, useEffect} from "react";
import LoadingMask from './components/LoadingMask'
import Character from './components/Character'
import Subscription from './components/Subscription'

const App = () => {
  
  const chars = [
    {
      "name": "Ted Mosby",
      "details": "He is the main protagonist of the series..."
    },
    {
      "name": "Barney Stinson",
      "details": "He is best friend of the protagonist..."
    },
    {
      "name": "Marshall Eriksen",
      "details": "He is also the best friend of the protagonist..."
    }
  ]
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [subscribe, setSubscribe] = useState(false)
  const [characters, setCharacters] = useState([])

  const getChars = async () => {
    try {
      const response = await fetch("https://seriescharacters.com/api/howimetyourmother")
      const chars = await response.json()
      setCharacters(chars)
    } catch (error) {
      setHasError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => { 
    getChars()
    setTimeout(() => setSubscribe(true), 10000)
  }, [])
  
  return (
    <div>
      <h1>Series Api</h1>
      {!hasError && <div className="card-container">
        {characters.map(char => <Character key={char.name} char={char} />)}
      </div>}
      {hasError && <p>Oops, something happened</p>}
      {isLoading && <LoadingMask />}
      {subscribe && <Subscription isLoading={isLoading} setIsLoading={setIsLoading} setSubscribe={setSubscribe} />}
    </div>
  )
};

export default App;
