import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";

function UserProfile() {

    // user ID state management
    const { state } = useLocation()
    const { currentUser } = state
    const navigate = useNavigate()
    console.log(currentUser)
    // user ID state management

    const [checkins, setCheckins] = useState([])
    const params = useParams()
    const checkinId = params.id

    useEffect(() => {
        fetch('/checkin/' + currentUser.id)
        .then(r => r.json())
        .then((data) => {
            setCheckins(data)
        })
    }, [])

    function handleSearchSandwichNav() {
        navigate('/sandwiches', { state: { currentUser }})
    }

    return (
        <div className="User-Profile">
            <header>Welcome, {currentUser.username}
            <br />
                <button onClick={handleSearchSandwichNav}>Search for Sandwiches</button>
                <button><Link className ="link-to-log-out" to={'/'} >Log Out</Link></button>
            </header>
            <br />
            <div>
                {checkins.map((checkin) => {
                    return (
                        <a>
                            <img
                                src={checkin.sandwich.image}
                                alt={checkin.sandwich.sandwich_name}
                            ></img>
                            <p>{checkin.sandwich.sandwich_name}</p>
                        </a>
                        );
                })}
            </div>
        </div>
    )
}

export default UserProfile