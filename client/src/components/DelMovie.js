import './Movie.css'
import React from "react";
import MovieCard from "./MovieCard"

const DelMovie = () => {
    return (
        <div className="container mt-5 movie_container">
            <div className="movie_cards">
                <MovieCard data={"Delete Movie"} />
            </div>
        </div >
    )
}

export default DelMovie