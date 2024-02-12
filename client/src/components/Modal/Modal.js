import React, { useState } from "react";
// import "./Modal.css"

function Modal() {

    const [modal, setModal] = useState(false)

    const toggleModal = () => {
        setModal(!modal)
    }

    return (
        <>
        <button 
        onClick={toggleModal}
        className="btn-modal">
            Open
        </button>

        {modal && (
            <div className="modal">
                <div onClick={toggleModal} className="overlay"></div>
                <div className="modal-content">
                    <h5>Hello Modal</h5>
                    <p>
                        Lorem ipsum
                    </p>
                    <button
                    className="close-modal"
                    onClick={toggleModal}>
                        Close
                    </button>
                </div>
            </div>
        )}
        
        
        </>
    )
}

export default Modal