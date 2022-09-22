import React from "react";
import { useParams } from 'react-router-dom'
import MovieDetailsIndividual from "./MovieDetailsIndividual";


const MovieDetails = () => {
    const params = useParams();
    const movieDetails = MovieDetailsIndividual(params);
    console.log(movieDetails)
    try {
        const name = movieDetails.name;
        console.log(name)
        const actors_name = movieDetails.actors;
        const certification = movieDetails.certification;
        const director = movieDetails.director;
        const genre = movieDetails.genre;
        const movie_length = movieDetails.length;
        const release_date = movieDetails.release_date.split("T")[0];
        const start_date = movieDetails.start_date.split("T")[0];
        const end_date = movieDetails.end_date.split("T")[0];
        const first_show = movieDetails.first_show;
        const second_show = movieDetails.second_show;
        var base64 = btoa(
            new Uint8Array(movieDetails.image.data.data)
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
                                <p className="card-text"><label className="me-2 fw-bold">Movie Availabe Date:</label>{start_date}</p>
                                <p className="card-text"><label className="me-2 fw-bold">Movie End Date:</label>{end_date}</p>
                                <p className="card-text"><label className="me-2 fw-bold">First show:</label>{first_show}</p>
                                <p className="card-text"><label className="me-2 fw-bold">Second show:</label>{second_show}</p>
                                <p className="card-text"><small class="text-muted">Released on: {release_date}</small></p>
                                <button className="btn btn-primary">Book Tickets</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    catch (e) { console.log(e); }
}

export default MovieDetails


