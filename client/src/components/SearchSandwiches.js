import React, { useContext, useEffect, useState } from "react";
// import { useUser } from "./UserContext";
import SearchBar from "./SearchBar";
import SearchByRestaurant from "./SearchByRestaurant";
import { Link, useLocation, useNavigate } from "react-router-dom";


function SearchSandwiches({loggedIn}) {
// ./sandwiches

    // user ID state management
    console.log(loggedIn)
    let location = useLocation()
    let userID = location.state.loggedIn
    const navigate = useNavigate()
    // user ID state management

    
    const [sandwiches, setSandwiches] = useState([])
    

    useEffect(() => {
        fetch('/sandwiches')
        .then((r) => r.json())
        .then((data) => {
            setSandwiches(data)
        })
    }, [])

    function handleSandwichProfileNav() {
        navigate('/sandwiches/:id', { state: { loggedIn: userID}})
    }
    

    return (
        <div className = "Sandwich-main">
            <h1>Sandwich Search</h1>
            <div>
                <button>
                    <Link className="link-to-restaurant-search" to={'/restaurants'}>Search by Restaurant</Link>
                </button>
            </div>
            <div>
                <SearchBar placeholder="Search for Sandwich..." sandwiches={sandwiches} />
            </div>
        </div>
    )
}

export default SearchSandwiches