import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import EditUsername from "./EditUsername";
import { loginSuccess } from "./userActions";
// import updateCurrentUser from "./Redux/userActions";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/Container";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'
import { GiSandwich } from "react-icons/gi";
import Image from "react-bootstrap/esm/Image";


function UserProfile() {

    // const isAuthenticated = useSelector((state) => state.isAuthenticated)
    const user = useSelector((state) => state.currentUser)
    // const dispatch = useDispatch()

    console.log(user)
    // user ID state management
    // const { state } = useLocation()
    // const { currentUser } = state
    const navigate = useNavigate()
    // console.log(currentUser)
    // user ID state management


    // const { currentUser: initialUser} = state
    // const [user, setUser] = useState(initialUser || null)

    // console.log(user)
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

    const [checkins, setCheckins] = useState([])

    const uniqueSandwichNames = Array.from(new Set(checkins.map((checkin) => checkin.sandwich.sandwich_name)));

    useEffect(() => {
        fetch('/checkin/' + user.id)
        .then(r => r.json())
        .then((data) => {
            setCheckins(data)
        })
    }, [user.id])

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
        fetch(`/checkin/${user.id}/${sandwichID}`, {
            method:'DELETE'
        })
        .then(r => {
            if (r.ok) {
                removeCheckinSandwich(sandwichID)
            }
        })
    }

    function handleSearchSandwichNav() {
        navigate('/sandwiches', { state: { currentUser: user }})
    }

    // function updateUsername(newUsername) {
    //     dispatch(loginSuccess(newUsername))
    // }

    return (
        <div>
            <Navbar expand="" className="bg-body-transparent">
                <Container>
                    <Navbar.Brand>Welcome {user.username}!</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link> 
                                <EditUsername />
                            </Nav.Link>
                            <Nav.Link onClick={handleSearchSandwichNav}>Search by Sandwich</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href={'/'}>Log Out</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <h1 className = "title"><GiSandwich style={{ fontSize: '50px' }}/> Unhinged <GiSandwich style={{ fontSize: '50px' }}/></h1>
            <div className="UserProfile-checkin-title">
                <h2>Check Ins</h2>
            </div>
            <div className="sandwich-list">
                    {uniqueSandwichNames.map((uniqueSandwichName) => {
                    // Find the first checkin with the unique sandwich name
                    const firstCheckinWithSameSandwich = checkins.find(
                        (checkin) => checkin.sandwich.sandwich_name === uniqueSandwichName
                    );
                    return (
                        <ul>
                            <div key={uniqueSandwichName} className="sandwich-item">
                                    <Image
                                        className="userprofile-pictures"
                                        src={firstCheckinWithSameSandwich.sandwich.image}
                                        alt={uniqueSandwichName}
                                        rounded
                                        ></Image>
                                    <div>
                                        <p 
                                            className="sandwich-name">
                                                {uniqueSandwichName}
                                        </p>
                                        <p>
                                            {firstCheckinWithSameSandwich.sandwich.restaurant.restaurant_name} - {firstCheckinWithSameSandwich.sandwich.restaurant.restaurant_location}
                                        </p>
                                        <Button variant="danger" onClick={() => handleSandwichDelete(firstCheckinWithSameSandwich.sandwich.id)}>Delete Sandwich</Button>{' '}
                                    </div>
                            </div>
                        </ul>
                    );
                })}
            </div>
        </div>
        )
    }
    
    export default UserProfile