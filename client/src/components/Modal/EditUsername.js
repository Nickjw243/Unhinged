import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


function EditUsername() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                />
            </InputGroup>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary">Save Changes</Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default EditUsername;