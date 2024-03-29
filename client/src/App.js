import React, { createContext, useReducer } from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Login from './components/Login'
import Contact from './components/Contact'
import Signup from './components/Signup'
import Logout from './components/Logout'
import Reset from './components/Reset'
import { initalState, reducer } from '../src/reducer/UseReducer'
import "./App.css"
import AddMovie from './components/AddMovie'
import AddShows from './components/AddShows'
import DelMovie from './components/DelMovie'
import MovieDetails from './components/MovieDetails'
import Ticket from './components/Ticket'

export const UserContext = createContext();
const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/reset-password" element={<Reset />} />
      <Route path="/addmovies" element={<AddMovie />} />
      <Route path="/addshows/:id" element={<AddShows />} />
      <Route path="/delmovies" element={<DelMovie />} />
      <Route path="/moviedetails/:id" element={<MovieDetails />} />
      <Route path="/bookticket/:id" element={<Ticket />} />
    </Routes>
  )
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initalState)
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Routing />
      </UserContext.Provider>
    </>
  )
}

export default App