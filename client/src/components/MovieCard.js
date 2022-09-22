import React from "react";
import { NavLink, Routes, Route } from 'react-router-dom'
import MovieData from "./MovieData";
import MovieDetails from "./MovieDetails";

function MovieCard() {

    const movies = MovieData();
    try {
        const allMovies = movies.data.map(function (data) {
            const id = data._id;
            const name = data.movie_name;
            const actors_name = data.actors.actor_name.join(", ");
            const director = data.director;
            var base64 = btoa(
                new Uint8Array(data.poster_img.data.data)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            return (
                <>
                    <div className="card mt-5">
                        <img src={`data:image/png;base64,${base64}`} className="card-img-top card_image" alt="Not found" />
                        <div className="card-body shadow">
                            <p className="text-capitalize"><label className="me-2 fw-bold">Movie:</label>{name}</p>
                            <p><label className="me-2 fw-bold">Actors:</label>{actors_name}</p>
                            <p><label className="me-2 fw-bold">Director:</label>{director}</p>
                            <NavLink to={`/moviedetails/${id}`} className="btn btn-primary">Movie Details</NavLink>
                        </div>
                    </div>
                </>
            );
        })
        return [allMovies];
    }
    catch (e) { return null; }
}

export default MovieCard;















// import React, { useEffect, useState } from 'react'
// import { NavLink } from 'react-router-dom'

// export default function Movie() {
//     const [movies, setMovies] = useState({});
//     console.log(movies)
//     // console.log(movies.data[0].movie_name)
//     // console.log(movies.data[0].poster_img.data)
//     // console.log(movies[1].movie_name)
//     // console.log(movies)

//     // movies.forEach(function (movie) {

//     // })

//     useEffect(() => {
//         const getMovies = async () => {
//             try {
//                 const res = await fetch("/movies", {
//                     method: "GET",
//                     headers: {
//                         Accept: "application/json",
//                         "Content-Type": "application/json"
//                     },
//                     credentials: "include"
//                 });
//                 const data = await res.json();
//                 setMovies(data)
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         getMovies();
//     }, []);
//     return (
//         <>
//             <div className="movie_component mt-5 p-5 d-flex justify-content-around flex-wrap">
//                 <div className="card mt-4 p-3 col-3">
//                     <img src={image} className="card-img-top card_image" alt="" />

//                     <div className="card-body">
//                         {/* <h5 className="card-title">{movies[0].movie_name}</h5>
//                         <p className="card-text">{movies[1].movie_name}</p> */}
//                         <NavLink to="/contact" className="btn btn-primary">Movie Details</NavLink>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

