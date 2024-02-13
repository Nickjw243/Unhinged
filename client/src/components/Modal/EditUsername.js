import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess, updateUsername } from '../userActions';


function EditUsername() {

    const dispatch = useDispatch()
    const [show, setShow] = useState(false);
    const [newUsername, setNewUsername] = useState('')
    const params = useParams()
    const userId = params.id

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
                username: newUsername })
        })
        .then(r => {
            if (r.ok) {
                console.log(newUsername)
                const userObject = {'username': newUsername}
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
        <Button variant="primary" onClick={handleShow}>
            Edit Username
        </Button>

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