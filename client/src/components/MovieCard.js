import React from "react";
import { NavLink } from 'react-router-dom'
import MovieData from "./MovieData";
// import MovieDetails from "./MovieDetails";
import Axios from "axios";

function MovieCard(props) {
    const button = props.data
    var button_class = "btn btn-primary"
    var url = "moviedetails"
    if (props.data !== "Movie Details") {
        button_class = "btn btn-danger"
        url = "delmovie"
    }
    const movies = MovieData();

    try {
        const allMovies = movies.data.map(function (data) {
            const id = data._id;
            const name = data.name;
            const actors_name = data.actors;
            const director = data.director;
            const image = data.image;
            // console.log(image);
            var base64 = btoa(
                new Uint8Array(data.image.data)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            const handleChange = event => {
                if (button !== "Movie Details") {
                    Axios.delete(`/delmovie/${id}`)
                }
            }
            if (props.data !== "Movie Details") {
                return (
                    <>
                        <div className="card mt-5 me-5">
                            {/* <img src={image} className="card-img-top card_image" alt="Not found" /> */}
                            {/* <img src={`data:image/jpeg;base64,${base64}`} className="card-img-top card_image" alt="Not found" /> */}
                            {/* <img width='500' height='200' src={`data:image/png;base64,${image}`} alt="Not found" /> */}
                            {/* <img width='500' height='200' src={URL.createObjectURL(`data:image/png;base64,${image}`)} alt="Not found" /> */}
                            <div className="card-body shadow">
                                <p className="text-capitalize"><label className="me-2 fw-bold">Movie:</label>{name}</p>
                                <p><label className="me-2 fw-bold">Actors:</label>{actors_name}</p>
                                <p><label className="me-2 fw-bold">Director:</label>{director}</p>
                                <button className={button_class} onClick={handleChange}>{button}</button>
                            </div>
                        </div>
                    </>
                );
            } else {
                return (
                    <>
                        <div className="card mt-5 me-5">
                            {/* <img src={`data:image/png;base64,${base64}`} className="card-img-top card_image" alt="Not found" /> */}
                            <img src={image} className="card-img-top card_image" alt="Not found" />
                            <div className="card-body shadow">
                                <p className="text-capitalize"><label className="me-2 fw-bold">Movie:</label>{name}</p>
                                <p><label className="me-2 fw-bold">Actors:</label>{actors_name}</p>
                                <p><label className="me-2 fw-bold">Director:</label>{director}</p>
                                <NavLink to={`/${url}/${id}`} className={button_class}>{button}</NavLink>
                            </div>
                        </div>
                    </>
                );
            }
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

