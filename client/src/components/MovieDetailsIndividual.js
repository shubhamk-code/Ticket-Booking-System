import React, { useState, useEffect } from "react";
import Axios from "axios";

export default function MovieDetailsIndividual(movieId) {
    // const [data, setData] = useState(
    //     []
    // );

    const [data, setData] = useState([]);
    useEffect(() => {
        const url = `/moviedetails/${movieId.id}`;
        Axios.get(url).then((res) => {
            setData(res.data.data);
        }).catch(err => console.log(err));
    }
        , []);

    // const getMovies = async () => {
    //     try {
    //         const dbMovies = await Axios.get('/movies')
    //         setData(dbMovies.data)
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }
    // useEffect(() => {
    //     const interval = setInterval(async () => {
    //         const url = `/moviedetails/${movieId.id}`;
    //         const dbMovies = await Axios.get(url)
    //         setData(dbMovies.data)
    //         console.log(dbMovies.data)
    //     }, 500)
    //     return () => clearInterval(interval)
    // }, [])
    // console.log(movieId)
    // console.log(movieId.id)
    // const movieid = movieId.id
    // console.log(movieid)
    // console.log("world" + id)

    // useEffect(() => {
    //     // const url = `/movies`;
    //     // console.log(url)
    //     Axios.get('/movies').then((res) => {
    //         setData(res.data);
    //         console.log(res.data)
    //     }).catch(err => console.log(err));
    // }
    //     , []);

    // useEffect(() => {
    //     // const url = `;
    //     // console.log(url)
    //     Axios.get(`/moviedetails/${movieid}`).then((res) => {
    //         setData(res.data);
    //     }).catch(err => console.log(err));
    // }
    //     , []);
    console.log("end")
    console.log(data);
    return data;

}

