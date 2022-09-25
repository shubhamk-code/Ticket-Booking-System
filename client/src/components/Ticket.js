import React, { useState, useEffect } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import Axios from 'axios'
import BookMySeats from './BookMySeats';

const Ticket = () => {
    const param = useParams();
    const [user, setUser] = useState();
    const [movie, setMovie] = useState();
    useEffect(() => {
        //user details
        const getUserDetails = async () => {
            try {
                const res = await fetch(`/bookticket/${param.id}`, {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                });
                const data = await res.json();
                setUser(data);
            } catch (error) {
                console.log(error);
            }
        }
        //movie details
        // const url = `/moviedetails/${param.id}`;
        // Axios.get(url).then((res) => {
        //     setMovie(res.data.data);
        // }).catch(err => console.log(err));
        getUserDetails();
    }, []);
    console.log(movie)
    console.log(user)
    return (
        <div>
            <h3>Ticket</h3>
            <div className="">
                {/* <Seatbooking /> */}
                <BookMySeats />
            </div>
        </div>
    )
}

export default Ticket