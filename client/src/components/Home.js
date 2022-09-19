import React from 'react'
import Movie from './Movie'
import { Routes, Route } from 'react-router-dom'
import Contact from './Contact'

const Home = () => {
    return (
        <>
            <Movie />
            <Routes>
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </>
    )
}

export default Home