import React, { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function SearchByRestaurant() {

    // const user = useSelector((state) => state.currentUser)
    // console.log(user)
    // user ID state management
    const { state } = useLocation()
    const { currentUser: initialUser } = state
    const navigate = useNavigate()
    // console.log(currentUser)
    // user ID state management

    const [user, setUser] = useState(initialUser || null)
    const [restaurants, setRestaurants] = useState([])
    const [filteredRestaurants, setFilteredRestaurants] = useState([])
    const [wordEntered, setWordEntered] = useState("")

    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    useEffect(() => {
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user))
        }
    }, [])

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
        navigate(`/user_profile/${user.id}`, { state: { currentUser: user }})
    }

    function handleSearchSandwichNav() {
        navigate('/sandwiches', { state: { currentUser: user }})
    }

    return (
        <div className="restaurant-search">
            <div className="main">
                <header className="header-container">
                    <span>Welcome, {user.username}!</span>
                    <div className="header-buttons" class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button onClick={handleProfileNav} class="btn btn-primary me-md-2" type="button">Profile</button>
                        <button class="btn btn-primary" type="button"><Link className ="link-to-log-out" to={'/'} >Log Out</Link></button>
                    </div>
                </header>
                <br />
                <div>
                    <button onClick={handleSearchSandwichNav} className="searchSandwichesBtn">Search by Sandwiches</button>
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
                                navigate(`/restaurants/${value.id}`, { state: { currentUser: user }})})}>{value.restaurant_name}
                            </p>
                        </a>)
                    })}
                </div>
                )}
            </div>
        </div>
    )
}

export default SearchByRestaurant