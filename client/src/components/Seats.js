import React from 'react';
import classes from './BookMySeats.css';

const Seats = (props) => {

    return (
        <div className="row mt-2">
            {props.values.map(seat => {
                const isAvailable = props.availableSeats.includes(seat);
                const isBooked = props.bookedSeats.includes(seat);
                let seatClass;
                if (!isAvailable) {
                    seatClass = "btn btn-primary";
                }
                if (isBooked) {
                    seatClass = "btn btn-danger";
                }
                return <div className="col"><div className={seatClass} onClick={props.addSeat} key={seat}>{seat}</div></div>;
            })}
        </div>
    );
}
export default Seats;