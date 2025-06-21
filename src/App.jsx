import { useEffect, useState, useCallback } from 'react'

function debounce(callback, delay) {
  let timer;
  return (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(value)
    }, delay)
  }
}

// import './App.css'

function App() {

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestion] = useState([]);


  const eseguiFetch = useCallback(debounce((query) => {
    fetch(`http://localhost:3333/products?search=${query}`)
      .then(res => res.json())
      .then(data => setSuggestion(data))
      .catch(error => console.error(error))
    console.log("API call:", query)
  }, 300), [])


  useEffect(() => {
    if (!query.trim()) {
      setSuggestion([]);
      return;
    }
    eseguiFetch(query)
  }, [query])


  return (
    <>
      <input
        type="text"
        placeholder="Cerca un prodotto..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {suggestions.length > 0 && (
        <div className='dropdown-menu'>
          {suggestions.map((product) => (
            <p key={product.id}>{product.name}</p>
          ))}
        </div>
      )}
    </>
  )
}

export default App
