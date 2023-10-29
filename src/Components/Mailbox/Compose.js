import React, { useState } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function Compose() {
  const [show, setShow] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleSend = () => {
    // Handle sending the email here
    handleClose();
  };

  const handleClear = () => {
    setEditorState(EditorState.createEmpty());
  };

  return (
    <>
      <Button onClick={handleShow}>Compose</Button>
      <Modal show={show} onHide={handleClose} size="xl" >
        <Modal.Header closeButton>
          <Modal.Title>Compose Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                To:
              </Form.Label>
              <Col sm="10">
                <Form.Control type="email" placeholder="Recipient's email" />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Subject:
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" placeholder="Subject" />
              </Col>
            </Form.Group>

            <Form.Group>
              <Editor 
                editorState={editorState}
                onEditorStateChange={(newEditorState) => setEditorState(newEditorState)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
         <Button variant="primary" onClick={handleClear}>
            Clear
          </Button>
          <Button variant="primary" onClick={handleSend}>
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Compose;
