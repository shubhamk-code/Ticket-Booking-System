import React, { useState, useEffect } from 'react'
import Seats from './Seats'
import { useParams } from 'react-router-dom'
import Axios from 'axios'

const createMovieSeats = (rows, length, tclass) => {
  tclass = tclass.toLowerCase()
  let start = 'A'
  const section = []
  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= length; j++) {
      if (tclass === 'silver') {
        section.push('S-' + start + j)
      }
      if (tclass === 'gold') {
        section.push('G-' + start + j)
      }
      if (tclass === 'platinum') {
        section.push('P-' + start + j)
      }
    }
    start = String.fromCharCode(start.charCodeAt(0) + 1)
  }
  return section
}

const BookMySeats = () => {
  const movieId = useParams()
  const [showData, setShowData] = useState([])

  useEffect(() => {
    const url = `/showdetails/${movieId.id}`
    Axios.get(url)
      .then((res) => {
        setShowData(res.data)
      })
      .catch((err) => console.log(err))
  }, [])
  console.log(showData)
  console.log(showData.data.map(data => console.log(data)))

  const platinumSeats = createMovieSeats(1, 10, 'platinum')
  const silverSeats = createMovieSeats(4, 10, 'silver')
  const goldSeats = createMovieSeats(3, 10, 'gold')
  const [availableSeats, setAvailableSeats] = useState([])
  const [unAvailableSeats, setUnAvailableSeats] = useState(['P-A5'])
  const [bookedSeats, setBookedSeats] = useState([])
  const [bookedStatus, setBookedStatus] = useState('')

  const addSeat = (event) => {
    if (numberOfSeats && !event.target.className.includes('disabled')) {
      const seatsToBook = parseInt(numberOfSeats, 10)
      if (bookedSeats.includes(event.target.innerText)) {
        const newAvailable = bookedSeats.filter(
          (seat) => seat !== event.target.innerText,
        )
        setBookedSeats(newAvailable)
      } else if (bookedSeats.length < numberOfSeats) {
        setBookedSeats([...bookedSeats, event.target.innerText])
      } else if (bookedSeats.length === seatsToBook) {
        bookedSeats.shift()
        setBookedSeats([...bookedSeats, event.target.innerText])
      }
    }
  }

  const confirm_booking = () => {
    setBookedStatus('You have successfully booked the following seats:')
    setUnAvailableSeats([...unAvailableSeats, ...bookedSeats])
    bookedSeats.forEach((seat) => {
      console.log(unAvailableSeats)
      setBookedStatus((prevState) => {
        return prevState + seat + ' '
      })
    })
    const newAvailableSeats = availableSeats.filter(
      (seat) => !bookedSeats.includes(seat),
    )
    setAvailableSeats(newAvailableSeats)
    setBookedSeats([])
    setNumberOfSeats(0)
  }

  const [numberOfSeats, setNumberOfSeats] = useState(0)
  return (
    <React.Fragment>
      <p>How many seats would you like to book?</p>
      <input
        value={numberOfSeats}
        onChange={(event) => setNumberOfSeats(event.target.value)}
      />
      <div className="d-flex justify-content-center">
        <div className="card p-2" style={{ width: '80vw' }}>
          <div
            className="card d-flex justify-content-center align-items-center"
            style={{ width: '68vw' }}
          >
            <h4>Platinum</h4>
            <Seats
              values={platinumSeats}
              availableSeats={availableSeats}
              unAvailableSeats={unAvailableSeats}
              bookedSeats={bookedSeats}
              addSeat={addSeat}
            />
          </div>
          <div
            className="card d-flex justify-content-center align-items-center"
            style={{ width: '68vw' }}
          >
            <h4>Gold</h4>
            <Seats
              values={goldSeats}
              availableSeats={availableSeats}
              unAvailableSeats={unAvailableSeats}
              bookedSeats={bookedSeats}
              addSeat={addSeat}
            />
          </div>
          <div
            className="card d-flex justify-content-center align-items-center"
            style={{ width: '68vw' }}
          >
            <h4>Silver</h4>
            <Seats
              values={silverSeats}
              availableSeats={availableSeats}
              unAvailableSeats={unAvailableSeats}
              bookedSeats={bookedSeats}
              addSeat={addSeat}
            />
          </div>
        </div>
      </div>
      <button onClick={confirm_booking}>Book seats</button>
      <p>{bookedStatus}</p>
    </React.Fragment>
  )
}
export default BookMySeats
