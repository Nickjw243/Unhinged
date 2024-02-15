import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { GiSandwich } from "react-icons/gi";


function SearchSandwiches() {
// ./sandwiches

    const user = useSelector((state) => state.currentUser)
    // console.log(user)
    // user ID state management
    // const { state } = useLocation()
    // const { currentUser: initialUser } = state
    const navigate = useNavigate()
    // console.log(currentUser)
    // user ID state management

    // const [user, setUser] = useState(initialUser || null)

    // console.log(user)
    // useEffect(() => {
    //     const storedUser = localStorage.getItem('user')
    //     console.log('Stored user', storedUser)
    //     if (storedUser) {
    //         setUser(JSON.parse(storedUser))
    //     }
    // }, [])

    // useEffect(() => {
    //     if (user) {
    //         localStorage.setItem('currentUser', JSON.stringify(user))
    //     }
    // }, [user])

    console.log(user)
    const [sandwiches, setSandwiches] = useState([])

    useEffect(() => {
        fetch('/sandwiches')
        .then((r) => r.json())
        .then((data) => {
            setSandwiches(data)
        })
    }, [])

    function handleSandwichProfileNav() {
        navigate('/sandwiches/:id')
        // navigate('/sandwiches/:id', { state: { currentUser: user }})
    }

    function handleProfileNav() {
        // navigate(`/user_profile/${user.id}`)
        navigate(`/user_profile/${user.id}`, { state: { currentUser: user }})
    }

    function handleRestaurantNav() {
        navigate('/restaurants', { state: { currentUser: user }})
    }

    return (
        <div>
            <Navbar expand="" className="bg-body-transparent">
                <Container>
                    <Navbar.Brand>Welcome {user.username}!</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link onClick={handleRestaurantNav}>Search by Restaurant</Nav.Link>
                            <Nav.Link onClick={handleProfileNav}>Profile</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href={'/'}>Log Out</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div>
                <h1 className = "title"><GiSandwich style={{ fontSize: '50px' }}/> Unhinged <GiSandwich style={{ fontSize: '50px' }}/></h1>
                <div class="container">
                    <SearchBar placeholder="Search for Sandwich..." sandwiches={sandwiches} handleSandwichProfileNav = {handleSandwichProfileNav}/>
                </div>
            </div>
        </div>
    )
}

export default SearchSandwiches