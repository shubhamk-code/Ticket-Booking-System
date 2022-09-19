import React, { useState } from 'react'
//useHistory replaced by useNavigate
import { useNavigate } from 'react-router-dom'
import signup from '../images/signup.jpg'

const Signup = () => {
    const navigate = useNavigate()
    const [user, setuser] = useState({
        name: "", email: "", phone: "", work: "", password: "", cpassword: ""
    });

    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setuser({ ...user, [name]: value });
    }

    const postData = async (e) => {
        e.preventDefault();
        //object destucturing
        const { name, email, phone, work, password, cpassword } = user;
        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, work, password, cpassword
            })
        });

        // const data = await res.json();
        const exists = res.status;
        console.log(res.status)
        if (exists === 422) {
            window.alert("Invalid Registration");
        } else if (exists === 400) {
            window.alert("already exists")
        }
        else {
            navigate("/login");
        }
        console.clear();
    }

    return (
        <div className="main">
            <section className="signup">
                <div className="container mt-5">
                    <div className="content shadow">
                        <div className="signupCont">
                            <h2>Signup</h2>
                            <div className="signupForm">
                                <form method="POST">
                                    <div className="form-group mt-3" >
                                        {/* <label for="name">Enter Name</label> */}
                                        <input type="text" name="name" className="form-control" id="exampleInputName" placeholder="Enter name" value={user.name}
                                            onChange={e => handleInputs(e)} required />
                                    </div>
                                    <div className="form-group mt-2" >
                                        {/* <label for="email">Enter Email</label> */}
                                        <input type="text" name="email" className="form-control" id="exampleInputEmail" placeholder="Enter email" value={user.email}
                                            required onChange={e => handleInputs(e)} />
                                    </div>
                                    <div className="form-group mt-2" >
                                        {/* <label for="phone">Enter Phone no.</label> */}
                                        <input type="text" name="phone" className="form-control" id="exampleInputPhone" placeholder="Enter phone no." value={user.phone}
                                            onChange={e => handleInputs(e)} />
                                    </div>
                                    <div className="form-group mt-2" >
                                        {/* <label for="profession">Enter Profession</label> */}
                                        <input type="text" name="work" className="form-control" id="exampleInputProfession" placeholder="Enter profession" value={user.work}
                                            onChange={e => handleInputs(e)} />
                                    </div>
                                    <div className="form-group mt-2">
                                        {/* <label for="exampleInputPassword1">Password</label> */}
                                        <input name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" value={user.password}
                                            onChange={e => handleInputs(e)} autoComplete="off" />
                                    </div>
                                    <div className="form-group mt-2">
                                        {/* <label for="exampleInputPassword2">Confirm Password</label> */}
                                        <input name="cpassword" type="password" className="form-control" id="exampleInputPassword2" placeholder="Confirm Password" value={user.cpassword}
                                            onChange={e => handleInputs(e)} autoComplete="off" />
                                    </div>
                                    <button type="submit" value="signup" className="btn btn-primary mt-3" onClick={postData}>Signup</button>
                                </form>
                            </div>
                        </div>
                        <div className="signupImg">
                            <img src={signup} alt="signup" />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Signup