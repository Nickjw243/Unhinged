import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import Modal from "./Modal/Modal";
import EditUsername from "./Modal/EditUsername";

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
            <div className="main">
                <header className="header-container">
                    <span>Welcome, {currentUser.username}</span>
                    <EditUsername />
                    <div className="header-buttons" class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button onClick={handleSearchSandwichNav} class="btn btn-primary me-md-2" type="button">Search for Sandwiches</button>
                        <button class="btn btn-primary" type="button"><Link className ="link-to-log-out" to={'/'} >Log Out</Link></button>
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
        </div>
    )
}

export default UserProfile