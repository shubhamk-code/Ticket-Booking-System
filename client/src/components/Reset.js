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
        fetch("/forgot-password", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({ email })
        }).then((response) => response.json()).then((data) => {
            alert(data.status)
        })
    }

    render() {
        return (
            <>
                <div className="main d-flex align-items-center justify-content-center mt-5 p-5 shadow m-5">
                    <div className="container col-6" style={{ width: "30vw" }}>
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
                            <div className="text-center mt-4">
                                <p className="forgot-password text-right">
                                    <NavLink to="/signup">Signup</NavLink>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}
