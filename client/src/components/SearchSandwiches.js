import React, { useContext, useEffect, useState } from "react";
import ThemeContext from "./ThemeContext";
import SearchBar from "./SearchBar";
import SearchByRestaurant from "./SearchByRestaurant";
import { Link, useLocation, useNavigate } from "react-router-dom";


function SearchSandwiches({loggedIn}) {
// ./sandwiches

    // user ID state management
    // let location = useLocation()
    // let userID = location.state.loggedIn
    // const Navigate = useNavigate()
    // user ID state management

    const value = useContext(ThemeContext)
    const [sandwiches, setSandwiches] = useState([])
    

    useEffect(() => {
        fetch('/sandwiches')
        .then((r) => r.json())
        .then((data) => {
            setSandwiches(data)
        })
    }, [])

    

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