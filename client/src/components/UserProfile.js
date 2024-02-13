import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import EditUsername from "./Modal/EditUsername";
import { loginSuccess } from "./userActions";
// import updateCurrentUser from "./Redux/userActions";

function UserProfile() {

    // const isAuthenticated = useSelector((state) => state.isAuthenticated)
    const user = useSelector((state) => state.currentUser)
    // const dispatch = useDispatch()

    console.log(user)
    // user ID state management
    const { state } = useLocation()
    const { currentUser } = state
    const navigate = useNavigate()
    // console.log(currentUser)
    // user ID state management

    const [checkins, setCheckins] = useState([])

    const uniqueSandwichNames = Array.from(new Set(checkins.map((checkin) => checkin.sandwich.sandwich_name)));

    useEffect(() => {
        fetch('/checkin/' + user.id)
        .then(r => r.json())
        .then((data) => {
            setCheckins(data)
        })
    }, [])

    console.log(currentUser)

    const removeCheckinSandwich = (id) => {
        setCheckins(checkins.filter(el => {
            if (el.sandwich_id === id) {
                return false
            } else if (el.sandwich_id !== id) {
                return true
            }
        }))
    }

    const handleSandwichDelete = (sandwichID) => {
        fetch(`/checkin/${currentUser.id}/${sandwichID}`, {
            method:'DELETE'
        })
        .then(r => {
            if (r.ok) {
                removeCheckinSandwich(sandwichID)
            }
        })
    }

    function handleSearchSandwichNav() {
        navigate('/sandwiches', { state: { currentUser }})
    }

    // function updateUsername(newUsername) {
    //     dispatch(loginSuccess(newUsername))
    // }

    return (
        <div className="User-Profile">
            <div className="main">
                <header className="header-container">
                    <span>Welcome, {user.username}</span>
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
                                    <button onClick={() => handleSandwichDelete(firstCheckinWithSameSandwich.sandwich.id)}>Delete Sandwich</button>
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