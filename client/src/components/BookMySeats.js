import React, { useState, useEffect } from 'react'
import Seats from './Seats'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Axios from 'axios'

const BookMySeats = () => {
  const movieId = useParams()
  const [getData, setGetData] = useState([])
  const [showData, setShowData] = useState([])
  const [numberOfSeats, setNumberOfSeats] = useState(0)
  const [ticketDate, setTicketDate] = useState(new Date().toISOString().slice(0, 10))
  const [platinumSeats, setPlatinumSeats] = useState([])
  const [silverSeats, setSilverSeats] = useState([])
  const [goldSeats, setGoldSeats] = useState([])
  const [platinumRate, setPlatinumRate] = useState([])
  const [goldRate, setGoldRate] = useState([])
  const [silverRate, setSilverRate] = useState([])
  const [ticketFare, setTicketFare] = useState([])
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
            setPlatinumRate(show.platinumRate)
            setGoldRate(show.goldRate)
            setSilverRate(show.silverRate)
          } else {
            setShowData([])
            setPlatinumSeats([])
            setSilverSeats([])
            setGoldSeats([])
            setUnAvailableSeats([])
            setPlatinumRate([])
            setGoldRate([])
            setSilverRate([])
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
  // const fare = 0;
  // const calculateTotalFare = () => {
  //   bookedSeats.forEach((seat) => {
  //     if (seat.split('-')[0] == 'P') {
  //       fare = fare + platinumRate;
  //     }
  //     else if (seat.split('-')[0] == 'S') {
  //       fare = fare + silverRate;
  //     }
  //     else if (seat.split('-')[0] == 'G') {
  //       fare = fare + goldRate;
  //     }
  //   })
  // return fare;
  // }

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
      setBookedStatus((prevState) => {
        return prevState + seat + ' '
      })
    })
    // setTicketFare(calculateTotalFare())
    const newAvailableSeats = availableSeats.filter(
      (seat) => !bookedSeats.includes(seat),
    )
    setAvailableSeats(newAvailableSeats)
    setBookedSeats('')
    setNumberOfSeats(0)
  }

  const showDetails = (e) => {
    getShowDetails()
  }

  return (
    <React.Fragment>
      <div className="row d-flex justify-content-center">
        <div className="col-3">
          <input type="text" className="form-control" id="exampleInputPassword1"
            placeholder="Enter seats"
            value={numberOfSeats}
            onChange={(event) => setNumberOfSeats(event.target.value)}
          />
        </div>
        <div className="col-3">
          <input type="date" className="form-control" id="exampleInputPassword1"
            value={ticketDate}
            onChange={(event) => setTicketDate(event.target.value)}
          />
        </div>
        <div className="col-3 d-flex justify-content-center">
          <button type="submit" className="btn btn-primary"
            style={{ width: "30vw" }}
            onClick={showDetails}>Check Availability</button>
        </div>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="d-flex justify-content-center">
          <div className="card p-2" style={{ width: '80vw' }}>
            <div
              className="card d-flex justify-content-center align-items-center"
              style={{ width: '68vw' }}
            >
              <h4>Platinum:{platinumRate}</h4>
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
              <h4>Gold:{goldRate}</h4>
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
              <h4>Silver:{silverRate}</h4>
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
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col-1">
          <button className="btn btn-primary" onClick={confirm_booking}>Book seats</button>
        </div>
        <div className="row text-center">
          <p>{bookedStatus}</p>
        </div>
      </div>
    </React.Fragment>
  )
}
export default BookMySeats
