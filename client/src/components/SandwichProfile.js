import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { GiSandwich } from "react-icons/gi";
import Button from "react-bootstrap/esm/Button";
import Image from "react-bootstrap/esm/Image";

function SandwichProfile() {

    const user = useSelector((state) => state.currentUser)
    // user ID state management
    // const { state } = useLocation()
    // const { currentUser: initialUser } = state
    const navigate = useNavigate()
    // console.log(currentUser)
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

    const [sandwich, setSandwich] = useState({})
    const params = useParams()
    const sandwichId = params.id

    useEffect(() => {
        fetch(`/sandwiches/${sandwichId}`)
        .then((r) => r.json())
        .then((data) => setSandwich(data))
    }, [sandwichId])

    if (!sandwich.sandwich_name) {
        return <h1>Loading...</h1>
    }

    const handleCheckIn = () => {
        fetch('/checkin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: user.id,
                sandwich_id: sandwichId,
            })
        })
        .then(r => r.json())
        .then(data => {
            console.log(data)
        })
    }
    

    console.log(user)
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
            <div className="sandwichProfile">
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
            </div>
            <h1 className = "title"><GiSandwich style={{ fontSize: '50px' }}/> Unhinged <GiSandwich style={{ fontSize: '50px' }}/></h1>
            <div className="sandwich-profile">
                <div className="sandwich-title">
                    <h2>{sandwich.sandwich_name}</h2>
                    <Button onClick={handleCheckIn} variant="success">Check In</Button>
                </div>
                <div className="sandwich-img-div">
                    <Image
                        className="sandwich-img"
                        src = {sandwich.image}
                        alt = {sandwich.sandwich_name}
                        rounded
                    ></Image>
                </div>
            </div>
        </div>
    )
}

export default SandwichProfile