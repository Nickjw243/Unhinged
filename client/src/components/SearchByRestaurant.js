import React, { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useLocation, useNavigate } from "react-router-dom";

function SearchByRestaurant() {

    // user ID state management
    const { state } = useLocation()
    const { currentUser } = state
    const navigate = useNavigate()
    // console.log(currentUser)
    // user ID state management

    const [restaurants, setRestaurants] = useState([])
    const [filteredRestaurants, setFilteredRestaurants] = useState([])
    const [wordEntered, setWordEntered] = useState("")


    useEffect(() => {
        fetch('/restaurants')
        .then(r => r.json())
        .then(data => {
            setRestaurants(data)
        })
    }, [])

    const handleFilter = (e) => {
        const searchWord = e.target.value
        setWordEntered(searchWord)
        const newFilter = restaurants.filter((value) => {
            return value.restaurant_name.toLowerCase().includes(searchWord.toLowerCase())
        })
        if (searchWord === ""){
            setFilteredRestaurants([])
        } else {
            setFilteredRestaurants(newFilter)
        }
    }

    const clearInput = () => {
        setFilteredRestaurants([])
        setWordEntered("")
    }

    function handleProfileNav() {
        navigate(`/user_profile/${currentUser.id}`, { state: { currentUser }})
    }

    function handleSearchSandwichNav() {
        navigate('/sandwiches', { state: { currentUser }})
    }

    return (
        <div className="restaurant-search">
            <header className="header-container">
                <span>Welcome, {currentUser.username}!</span>
                <div className="header-buttons">
                    <button onClick={handleProfileNav}>Profile</button>
                    <button><Link className ="link-to-log-out" to={'/'} >Log Out</Link></button>
                </div>
            </header>
            <br />
            <div>
                <button onClick={handleSearchSandwichNav}>Search by Sandwiches</button>
            </div>
            <div className="searchInputs">
                <input type="text" placeholder="Search by Restaurants" value={wordEntered} onChange={handleFilter} />
                <div className="searchIcon">
                    {filteredRestaurants.length === 0 ? <SearchIcon /> : <CloseIcon id="clearBtn" onClick={clearInput}/>}
                </div>
            </div>
            {filteredRestaurants.length != 0 && (
            <div className="dataResult">
                {filteredRestaurants.slice(0, 15).map((value, key) => {
                    return (
                    <a className="restaurantItem"> 
                        <p onClick={(() => {
                            navigate(`/restaurants/${value.id}`, { state: { currentUser }})})}>{value.restaurant_name}
                        </p>
                    </a>)
                })}
            </div>
            )}
        </div>
    )
}

export default SearchByRestaurant