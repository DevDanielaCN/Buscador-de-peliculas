import { useState } from "react"

const BuscadorPeliculas = () => {

  const urlBase = "https://api.themoviedb.org/3/search/movie"
  const APIKEY = "INSERT_API_KEY"

  const [busqueda, SetBusqueda] = useState('')

  const [peliculas, SetPeliculas] = useState([])

  const handleInputChange = (e) => {
    SetBusqueda(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    fetchPeliculas()
  }
  const fetchPeliculas = async () => {
    try{
      const response = await fetch(`${urlBase}?query=${busqueda}&api_key=${APIKEY}`)
      const data = await response.json()   
      console.log(data)
      SetPeliculas(data.results)
    }catch(error){
      console.error('Ha ocurrido un error: ' + error.message)
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador de Películas</h1>
      <form onSubmit={handleSubmit}>
        <input 
        type="text"
        placeholder="Escribe una película"
        value={busqueda}
        onChange={handleInputChange}
        />
        <button type="submit" className="search-button">Buscar</button>
      </form>

      <div className="movie-list">
      {peliculas.map((pelicula) => (
          <div key={pelicula.id} className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} alt={pelicula.title} />
            <h2>{pelicula.title}</h2>
            <p>{pelicula.overview}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BuscadorPeliculas
