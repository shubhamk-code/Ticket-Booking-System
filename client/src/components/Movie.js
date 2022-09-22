// import '../styles/Movie.css'
import './Movie.css'
import React from "react";
import MovieCard from "./MovieCard"
// import React from 'react'

const Movie = () => {
    return (
        <div className="container mt-5 movie_container">
            <div className="movie_cards">
                <MovieCard />
            </div>
        </div >
    )
}

export default Movie