import React from 'react';
import classes from './BookMySeats.css';

const Seats = (props) => {
    return (
        <div className="d-flex justify-content-center align-items-center flex-wrap" style={{ width: '60vw' }}>
            {props.values.map(seat => {
                const isAvailable = props.availableSeats.includes(seat);
                const unAvailable = props.unAvailableSeats.includes(seat);
                const isBooked = props.bookedSeats.includes(seat);
                let seatClass;
                if (!isAvailable) {
                    seatClass = "btn btn-primary";
                }
                if (unAvailable) {
                    seatClass = "btn btn-danger disabled";
                }
                if (isBooked) {
                    seatClass = "btn btn-success";
                }
                return <div className="card p-3"><div className={seatClass} onClick={props.addSeat} key={seat} style={{ width: "3.7vw" }}>{seat}</div></div>;
            })}
        </div>
    );
}
export default Seats;