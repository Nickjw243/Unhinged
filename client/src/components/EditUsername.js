import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess, updateUsername } from './userActions';
import Nav from 'react-bootstrap/Nav'
import { useSelector } from 'react-redux';


function EditUsername() {

    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const [newUsername, setNewUsername] = useState('')
    const params = useParams()
    const userId = params.id
    const user = useSelector((state) => state.currentUser)

    console.log(user)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // const formOutline = {
    //     username: ""
    // }

    const handleChange = (e) => {
        setNewUsername(e.target.value)
    }

    const handleSubmit = () => {
        fetch(`/users/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                username: user.username })
        })
        .then(r => {
            if (r.ok) {
                console.log(newUsername)
                // ...user, username: newUsername
                const userObject = {...user, username: newUsername}
                console.log(userObject)
                dispatch(loginSuccess(userObject))
                handleClose()
            }
        })
        // .then((data) => {
        //     setNewUsername(data)
        // })
        .catch(error => {console.log(error)})
    }

    return (
        <>
        <Nav className="me-auto">
            <Nav.Link onClick={handleShow}>
                Edit Username
            </Nav.Link>
        </Nav>

        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
            <Modal.Title>Edit Username</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    value={newUsername}
                    onChange={handleChange}
                />
            </InputGroup>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default EditUsername;