import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

function UserProfile() {

    // user ID state management
    const { state } = useLocation()
    const { currentUser } = state
    const navigate = useNavigate()
    // console.log(currentUser)
    // user ID state management

    const [checkin, setCheckin] = useState({})
    // const params = useParams()
    // const checkinId = params.id

    useEffect(() => {
        fetch(`/checkin/${currentUser.id}`)
        .then(r => r.json())
        .then(data => {
            console.log(data)
            setCheckin(data)
        })
    }, [])

    if (!checkin.id) {
        return <h1>Loading...</h1>
    }

    function handleSearchSandwichNav() {
        navigate('/sandwiches', { state: { currentUser }})
    }

    return (
        <div className="User-Profile">
            <header>Welcome, {currentUser.username}
            <br />
                <button onClick={handleSearchSandwichNav}>Search for Sandwiches</button>
            </header>
            <div>

            </div>
        </div>
    )
}

export default UserProfile