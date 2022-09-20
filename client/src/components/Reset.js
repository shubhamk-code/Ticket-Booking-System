import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
export default class Reset extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        const { email } = this.state;
        console.log(email);
        fetch("/forgot-password", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({ email })
        }).then((response) => response.json()).then((data) => {
            console.log(data, "userRegister");
            alert(data.status)
        })
    }

    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <h3>Forgot Password</h3>
                    <div className="mb-3">
                        <label>Email Address</label>
                        <input type="email" className="form-control" placeholder="Enter email address"
                            onChange={(e) => this.setState({ email: e.target.value })} />
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                    <p className="forgot-password text-right">
                        <NavLink to="/signup">Signup</NavLink>
                    </p>
                </form>
            </>
        )
    }
}
