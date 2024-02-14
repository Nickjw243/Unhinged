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

    console.log(user)
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
            <Navbar expand="lg" className="bg-body-transparent">
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
                <GiSandwich style={{ fontSize: '20px' }}/> Unhinged <GiSandwich style={{ fontSize: '20px' }}/>
            </Navbar>
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
                                <Button variant="danger" onClick={() => handleSandwichDelete(firstCheckinWithSameSandwich.sandwich.id)}>Delete Sandwich</Button>{' '}
                            </div>
                        </ul>
                    );
                })}
            </div>
        </div>
        )
    }
    
    export default UserProfile
    // <div className="User-Profile">
    //     <div className="main">
    //         <header className="header-container">
    //             <span>Welcome, {user.username}!</span>
    //             <div className="header-buttons" class="d-grid gap-2 d-md-flex justify-content-md-end">
    //                 <EditUsername />
    //                 <button onClick={handleSearchSandwichNav} class="btn btn-primary me-md-2" type="button">Search for Sandwiches</button>
    //                 <button class="btn btn-primary" type="button"><Link className ="link-to-log-out" to={'/'} >Log Out</Link></button>
    //             </div>
    //         </header>
    //         <h1>Check Ins</h1>
    //         <div className="sandwich-list">
    //             {uniqueSandwichNames.map((uniqueSandwichName) => {
    //                 // Find the first checkin with the unique sandwich name
    //                 const firstCheckinWithSameSandwich = checkins.find(
    //                     (checkin) => checkin.sandwich.sandwich_name === uniqueSandwichName
    //                 );
    //                 return (
    //                     <ul>
    //                         <div key={uniqueSandwichName} className="sandwich-item">
    //                             <img
    //                                 className="userprofile-pictures"
    //                                 src={firstCheckinWithSameSandwich.sandwich.image}
    //                                 alt={uniqueSandwichName}
    //                             ></img>
    //                             <p>{uniqueSandwichName}</p>
    //                             <Button variant="danger" onClick={() => handleSandwichDelete(firstCheckinWithSameSandwich.sandwich.id)}>Delete Sandwich</Button>{' '}
    //                         </div>
    //                     </ul>
    //                 );
    //             })}
    //         </div>
    //     </div>
    // </div>