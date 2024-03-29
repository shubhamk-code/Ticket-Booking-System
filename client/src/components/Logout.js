import React from 'react'
import { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App'

const Logout = () => {
    const { dispatch } = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        fetch('/logout', {
            method: 'GET',
            headers: {
                // Accept: "application/json",
                "Content-Type": "application/json"
            },
            // credentials: "include"
        }).then((res) => {
            dispatch({ type: "USER", payload: false })
            navigate('/login', { replace: true });
            if (res.status !== 200) {
                const error = new Error(res.error);
                throw error;
            }
        }).catch((error) => {
            console.error(error);
        })
    });


    return (
        <div></div>
    )
}

export default Logout
