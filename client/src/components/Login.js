import React, { useState, useContext } from 'react'
import login from '../images/login.jpg'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../App'

const Login = () => {

    const { state, dispatch } = useContext(UserContext);

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (e) => {
        e.preventDefault();
        const res = await fetch('/signin', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });
        const data = await res.json();
        if (res.status === 400 || !data) {
            window.alert("Invalid credentials")
        } else {
            dispatch({ type: "USER", payload: true })
            navigate("/");
        }
    }
    return (
        <>
            <div className="main">
                <section className="signin">
                    <div className="container mt-5">
                        <div className="content shadow">
                            <div className="signinCont">
                                <h2>signin</h2>
                                <div className="signinForm">
                                    <form method="POST">
                                        <div className="form-group mt-2" >
                                            {/* <label for="email">Enter Email</label> */}
                                            <input type="text" className="form-control" id="exampleInputEmail" placeholder="Enter email"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group mt-2">
                                            {/* <label for="exampleInputPassword1">Password</label> */}
                                            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" autoComplete="off"
                                                value={password}
                                                onChange={e => setPassword(e.target.value)}
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary mt-3"
                                            onClick={loginUser}
                                        >signin</button>
                                    </form>
                                    <NavLink to="/reset-password">Forgot password</NavLink>
                                </div>
                            </div>
                            <div className="signinImg">
                                <img src={login} alt="login" />
                                <div className="singupLink">
                                    <NavLink to="/signup" className="">Create an account</NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Login