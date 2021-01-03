import React, { useState, useEffect } from "react";
import { FaQuestion } from "react-icons/fa";
import { Modal, ModalHeader, ModalFooter, ModalBody, Button, Label, Alert } from "reactstrap";

const Info = () => {    
    const [modal, setModal] = useState(false); 
    const toggle = () => setModal(!modal);

    return(
        <div className="bg-light d-table p-3 rounded-circle border m-3 shadow-lg" 
            style={{position: "fixed", bottom: "0", right: "0"}} role="button"
            onClick={toggle}>
            <FaQuestion size={40}/>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Commands</ModalHeader>
                <ModalBody>
                    <Label>To Start Composing...</Label>
                    <Alert color="secondary">Say <em>"Dear Diary Get Started"</em></Alert>

                    <Label>Diary will read your composition...</Label>
                    <Alert color="secondary">Say <em>"Dear Diary Read It To Me"</em></Alert>

                    <Label>To delete a single word... (this may take a second)</Label>
                    <Alert color="secondary">Say <em>"Dear Diary Backspace"</em></Alert>
                    <br></br>
                    <p><em>This web app is developed by <a target="_blank" href="https://github.com/eesayas">eesayas</a> and <a target="_blank" href="https://github.com/amreesalmonte">amrees</a></em></p>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={toggle}>CLOSE</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default Info;