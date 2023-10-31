import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { BiLoaderCircle } from "react-icons/bi";
import "./Compose.css";

function Compose() {
  const [show, setShow] = useState(true);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [mailBody, setMailBody] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMailBody(editorState.getCurrentContent().getPlainText());
  }, [editorState]);

  const senderEmail = localStorage.getItem("email");
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${day}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
  };
  const formattedDate = formatDate(new Date());

  const handleSend = async () => {
    setLoading(true);
    const changedSenderMail = senderEmail.replace(/[@.]/g, "");
    const mailData = {
      to: to,
      subject: subject,
      message: mailBody,
      read: true,
      time: formattedDate,
      send: true,
      receive: false,
    };
    try {
      const response = await fetch(
        `https://mailbox-6e7cd-default-rtdb.firebaseio.com/${changedSenderMail}SentMail.json`,
        {
          method: "POST",
          body: JSON.stringify(mailData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let data = await response;
      console.log(data);
    } catch (err) {
      console.log(err);
    }
    try {
      const mail = to.replace(/[@.]/g, "");
      const response = await fetch(
        `https://mailbox-6e7cd-default-rtdb.firebaseio.com/${mail}Inbox.json`,
        {
          method: "POST",
          body: JSON.stringify({
            from: senderEmail,
            subject: subject,
            message: mailBody,
            read: false,
            time: formattedDate,
            send: false,
            receive: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let data = await response;
      console.log(data);
      setLoading(false);
    } catch (err) {
      alert(err);
    }

    setTo("");
    setSubject("");
    setEditorState(EditorState.createEmpty());
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleClear = () => {
    setEditorState(EditorState.createEmpty());
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl">
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
                <Form.Control
                  type="email"
                  placeholder="Recipient's email"
                  value={to} // Add value and onChange to bind the input value
                  onChange={(e) => setTo(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Subject:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="Subject"
                  value={subject} // Add value and onChange to bind the input value
                  onChange={(e) => setSubject(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group>
              <Editor
                editorState={editorState}
                onEditorStateChange={(newEditorState) =>
                  setEditorState(newEditorState)
                }
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
          {loading && (
            <div className="loader-container">
              <BiLoaderCircle className="loader-icon" />
              <span className="loader-text">Sending...</span>
            </div>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Compose;
