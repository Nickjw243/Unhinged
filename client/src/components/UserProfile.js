import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";

function UserProfile() {

    // user ID state management
    const { state } = useLocation()
    const { currentUser } = state
    const navigate = useNavigate()
    // console.log(currentUser)
    // user ID state management

    const [checkins, setCheckins] = useState([])

    const uniqueSandwichNames = Array.from(new Set(checkins.map((checkin) => checkin.sandwich.sandwich_name)));

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
            <header className="header-container">
                <span>Welcome, {currentUser.username}</span>
                <div className="header-buttons">
                    <button onClick={handleSearchSandwichNav}>Search for Sandwiches</button>
                    <button><Link className ="link-to-log-out" to={'/'} >Log Out</Link></button>
                </div>
            </header>
            <h1>Check Ins</h1>
            <div className="sandwich-list">
                {uniqueSandwichNames.map((uniqueSandwichName) => {
                    // Find the first checkin with the unique sandwich name
                    const firstCheckinWithSameSandwich = checkins.find(
                        (checkin) => checkin.sandwich.sandwich_name === uniqueSandwichName
                    );
                    return (
                        <ul>
                            <div key={uniqueSandwichName} className="sandwich-item">
                                <img
                                    className="userprofile-pictures"
                                    src={firstCheckinWithSameSandwich.sandwich.image}
                                    alt={uniqueSandwichName}
                                ></img>
                                <p>{uniqueSandwichName}</p>
                            </div>
                        </ul>
                    );
                })}
            </div>
        </div>
    )
}

export default UserProfile