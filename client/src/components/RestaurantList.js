import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import Image from 'react-bootstrap/Image'
import Container from "react-bootstrap/Container";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { GiSandwich } from "react-icons/gi";

function RestaurantList() {

    const user = useSelector((state) => state.currentUser)
    // user ID state management
    // const { state } = useLocation()
    // const { currentUser: initialUser } = state
    const navigate = useNavigate()
    // user ID state management

    // const [user, setUser] = useState(initialUser || null)

    // useEffect(() => {
    //     const storedUser = localStorage.getItem('currentUser')
    //     if (storedUser) {
    //         setUser(JSON.parse(storedUser))
    //     }
    // }, [])

    // useEffect(() => {
    //     if (user) {
    //         localStorage.setItem('currentUser', JSON.stringify(user))
    //     }
    // }, [user])

    const [restaurant, setRestaurant] = useState({})
    const params = useParams()
    const restaurantId = params.id

    useEffect(() => {
        fetch(`/restaurants/${restaurantId}`)
        .then(r => r.json())
        .then(data => setRestaurant(data))
    }, [])

    if (!restaurant.restaurant_name) {
        return <h1>Loading...</h1>
    }

    function handleProfileNav() {
        navigate(`/user_profile/${user.id}`)
        // navigate(`/user_profile/${user.id}`, { state: { currentUser: user }})
    }

    function handleSearchSandwichNav() {
        navigate('/sandwiches')
        // navigate('/sandwiches', { state: { currentUser: user }})
    }

    return (
        <div>
            {/* <div class="fixed-top"> */}
                <Navbar expand="" className="bg-body-transparent">
                    <Container>
                        <Navbar.Brand>Welcome {user.username}!</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link onClick={handleSearchSandwichNav}>Search by Sandwiches</Nav.Link>
                                <Nav.Link onClick={handleProfileNav}>Profile</Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link href={'/'}>Log Out</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            {/* </div> */}
            <h1 className = "title"><GiSandwich style={{ fontSize: '50px' }}/> Unhinged <GiSandwich style={{ fontSize: '50px' }}/></h1>
            <div className="restaurant-menu">
                <div className="restaurant-name">
                    <h1>{restaurant.restaurant_name} - {restaurant.restaurant_location}</h1>
                </div>
                <div className="restaurant-sandwich-div">
                    <div className="sandwich-container">
                        {restaurant.sandwich.map((value, key) => {
                            return(
                                <a onClick={(() => {
                                        navigate(`/sandwiches/${value.id}`, { state: { currentUser: user }})})}>
                                    <div>
                                        <Image
                                            className="restaurant-sandwich-image"
                                            src={value.image}
                                            alt = {value.sandwich_name}
                                            rounded
                                        ></Image>
                                    </div>
                                    <div>
                                        {value.sandwich_name}
                                    </div>
                                </a>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
    
    export default RestaurantList
    // <div className="Restaurant-Profile">
    //     <div className="main">
    //         <div className="header">
    //             <header className="header-container">
    //                 <span>Welcome, {user.username}!</span>
    //                 <div className="header-buttons" class="d-grid gap-2 d-md-flex justify-content-md-end">
    //                     <button onClick={handleProfileNav} class="btn btn-primary me-md-2" type="button">Profile</button>
    //                     <button class="btn btn-primary" type="button"><Link className ="link-to-log-out" to={'/'} >Log Out</Link></button>
    //                 </div>
    //             </header>
    //         </div>
    //         <br />
    //         <div>
    //             <button onClick={handleSearchSandwichNav} className="searchSandwichesBtn">Search by Sandwiches</button>
    //         </div>
            // <h1>{restaurant.restaurant_name}</h1>
    //         <div className="restaurant-sandwich-div">
    //             <div className="sandwich-container">
    //                 {restaurant.sandwich.map((value, key) => {
    //                     return(
    //                         <a onClick={(() => {
    //                                 navigate(`/sandwiches/${value.id}`, { state: { currentUser: user }})})}>
    //                             <div>
    //                                 <Image
    //                                     className="restaurant-sandwich-image"
    //                                     src={value.image}
    //                                     alt = {value.sandwich_name}
    //                                     rounded
    //                                 ></Image>
    //                             </div>
    //                             <div>
    //                                 {value.sandwich_name}
    //                             </div>
    //                         </a>
    //                     )
    //                 })}
    //             </div>
    //         </div>
    //     </div>
    // </div>