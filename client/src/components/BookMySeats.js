import React, { useState, useEffect } from 'react'
import Seats from './Seats'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import axios from 'axios'

const BookMySeats = () => {
  const movieId = useParams()
  const [getData, setGetData] = useState([])
  const [showData, setShowData] = useState([])
  const [numberOfSeats, setNumberOfSeats] = useState(0)
  const [ticketDate, setTicketDate] = useState(new Date().toISOString().slice(0, 10))
  const [platinumSeats, setPlatinumSeats] = useState([])
  const [silverSeats, setSilverSeats] = useState([])
  const [goldSeats, setGoldSeats] = useState([])
  const [unAvailableSeats, setUnAvailableSeats] = useState([])
  const [availableSeats, setAvailableSeats] = useState([])
  const [bookedSeats, setBookedSeats] = useState([])
  const [bookedStatus, setBookedStatus] = useState('')

  useEffect(() => {
    const url = `/showdetails/${movieId.id}`
    Axios.get(url)
      .then((res) => {
        setGetData(res.data.data)
      })
      .catch((err) => console.log(err))
  }, [])
  const movie_shows = getData.map(data => {
    return data.movie_shows
  })

  const getShowDetails = () => {
    if (movie_shows !== null) {
      movie_shows.map(shows => {
        shows.map(show => {
          if (show.show.split('T')[0] == ticketDate) {
            setShowData(show)
            setPlatinumSeats(show.platinumRows)
            setSilverSeats(show.silverRows)
            setGoldSeats(show.goldRows)
            setUnAvailableSeats(show.bookedSeats)
          }
        });
      })
    }
  }
  console.log(showData)

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

    try {
      if (bookedSeats.length > 0) {
        axios.post(`/bookseats/${showData._id}`, {
          bookedSeats: bookedSeats
        }).then((response) => {
          console.log(response);
        }, (err) => console.log(err))
      }
    } catch (error) {
      console.log(error);
    }
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

  return (
    <React.Fragment>
      <div className="row">
        <p>How many seats would you like to book?</p>
        <input
          value={numberOfSeats}
          onChange={(event) => setNumberOfSeats(event.target.value)}
        />
        <p>Select Date?</p>
        <input
          type="date"
          value={ticketDate}
          onChange={(event) => setTicketDate(event.target.value)}
          onClick={getShowDetails}
        />
      </div>
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
