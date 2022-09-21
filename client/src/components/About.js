import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const About = () => {
    let navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: "", email: "", phone: "", work: ""
    });

    function handleChange(evt) {
        const value = evt.target.value;
        setUserData({
            ...userData,
            [evt.target.name]: value
        });
    }

    useEffect(() => {
        const callAboutPage = async () => {
            try {
                const res = await fetch("/about", {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                });
                const data = await res.json();
                setUserData(data);
                if (!res.status === 200) {
                    const error = new Error(res.error);
                    throw error;
                } else if (res.status === 401) {
                    navigate("/login")
                }
            } catch (error) {
                console.log(error);
                navigate("/login")
            }
        }
        callAboutPage();
    }, [navigate]);

    const updateUser = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/update/${userData._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: userData.name,
                    phone: userData.phone,
                    work: userData.work
                })
            });
            if (res.status === 200) {
                console.log("update successful")
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
            <form method="GET">
                <div div className="card p-5 mt-5 about" style={{ width: "40vw" }}>
                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Email</span>
                        <input type="text" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" disabled
                            value={userData.email}
                        />
                    </div>
                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Name</span>
                        <input type="text" name="name" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
                            value={userData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Phone</span>
                        <input type="text" name="phone" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
                            value={userData.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group input-group-sm mb-3">
                        <span className="input-group-text" id="inputGroup-sizing-sm">Role </span>
                        <input type="text" name="work" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"
                            value={userData.work}
                            onChange={handleChange}
                            disabled
                        />
                    </div>
                    {/* {`/product-details/${props.loopItem.id}`} */}
                    <button className="btn btn-primary" onClick={updateUser}>Save</button>
                </div>
                <div>
                </div>
            </form>
        </div >
    )
}

export default About