import React, { useState, useEffect } from "react";
import Axios from "axios";

export default function MovieData() {
    const [data, setData] = useState(
        []
    );

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
    //         const dbMovies = await Axios.get('/movies')
    //         setData(dbMovies.data)
    //     }, 50000000)
    //     return () => clearInterval(interval)
    // })

    useEffect(() => {
        const url = `/movies`;
        Axios.get(url).then((res) => {
            setData(res.data);
        }).catch(err => console.log(err));
    }
        , []);

    useEffect(() => {
        const interval = setInterval(async () => {
            const dbMovies = await Axios.get('/movies')
            setData(dbMovies.data)
        }, 5000)
        return () => clearInterval(interval)
    }
        , []);
    return data;
} 