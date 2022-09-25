import { useState, useEffect } from "react";
import Axios from "axios";

export default function MovieDetailsIndividual(movieId) {

    const [data, setData] = useState();
    const [movieData, setMovieData] = useState({});
    const [user, setUser] = useState({ user: '' });

    useEffect(() => {
        const url = `/moviedetails/${movieId.id}`;
        Axios.get(url).then((res) => {
            setMovieData(res.data.data);
        }).catch(err => console.log(err));
        const getUser = async () => {
            try {
                const res = await fetch("/about", {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                });
                const data = await res.json();
                setUser({ user: data.work });
            } catch (error) {
                console.log(error);
            }
        }
        getUser();
    }
        , []);;
    return { ...movieData, ...user };

}

