import React, { useState, useEffect } from "react";
import { NavLink, useParams } from 'react-router-dom'
import Axios from "axios";
import MovieDetailsIndividual from "./MovieDetailsIndividual";


const MovieDetails = () => {
    const params = useParams();
    const movieDetails = MovieDetailsIndividual(params);
    try {
        const name = movieDetails.movie_name;
        const actors_name = movieDetails.actors.actor_name.join(", ");
        const certification = movieDetails.certification;
        const director = movieDetails.director;
        const genre = movieDetails.genre;
        const movie_length = movieDetails.movie_length;
        const release_date = movieDetails.release_date;
        const shows = movieDetails.shows.time.join(", ");
        var base64 = btoa(
            new Uint8Array(movieDetails.poster_img.data.data)
                .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
        return (
            <>
                <div className="jumbotron mt-5 p-2 d-flex justify-content-center align-items-center" style={{ height: "100%" }}>
                    <div className="conatiner mt-2 p-5" style={{ width: "45vw" }}>
                        <div className="card mb-3 p-2">
                            <img src={`data:image/png;base64,${base64}`} className="card-img-top p-2" alt="..." style={{ height: "200px", width: "250px" }} />
                            <div className="card-body">
                                <h5 className="card-title" style={{ "text-transform": "capitalize" }}><label className="me-2 fw-bold">Title:</label>{name}</h5>
                                <p className="card-text"><label className="me-2 fw-bold">Actors:</label>{actors_name}</p>
                                <p className="card-text"><label className="me-2 fw-bold">Director:</label>{director}</p>
                                <p className="card-text"><label className="me-2 fw-bold">Genre:</label>{genre}</p>
                                <p className="card-text"><label className="me-2 fw-bold">Certification:</label>{certification}</p>
                                <p className="card-text"><label className="me-2 fw-bold">Movie length:</label>{movie_length}</p>
                                <p className="card-text"><label className="me-2 fw-bold">Release Date:</label>{release_date}</p>
                                <p className="card-text"><label className="me-2 fw-bold">Shows:</label>{shows}</p>
                                <p className="card-text"><small class="text-muted">Released on: {release_date}</small></p>
                                <button className="btn btn-primary">Book Tickets</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    catch (e) { return null; }
}

export default MovieDetails


