import React, {useState} from "react";

const Subscription = ({isLoading, setIsLoading, setSubscribe}) => {
  
  const [value, setValue] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [hasError, setHasError] = useState(null)
  
  const handleChange = (e) => {
    const value = e.target.value
    setValue(value)
    if (value.includes('@') && value.includes('.')) {
      setIsValid(true)
    }
  }

  const handleSubmit = async () => {
    try {
      setIsLoading(true)
      const response = await fetch("https://seriescharacters.com/api/newsletter", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "email": value
        })
      })
      const subscribe = await response.json()
      setHasError(!subscribe.done)
    } catch (error) {
      setHasError(true)
    } finally {
      setIsLoading(false)
      setTimeout(() => setSubscribe(false), 5000)
    }
  }

  return (
  <div className="subscribe">
    { hasError === null && <h2>Subscribe to our newsletter</h2>}
    { hasError === null && !isLoading && 
      (<form onSubmit={handleSubmit}>
        <input onChange={handleChange} placeholder="Email" value={value} />
        <button disabled={!isValid} >Subscribe</button>
      </form>)
    }
    {hasError === true && <p className="message">Oops, something happened</p>}
    {hasError === false &&  <p className="message">Subscribed</p>}
    
  </div>
)};

export default Subscription;