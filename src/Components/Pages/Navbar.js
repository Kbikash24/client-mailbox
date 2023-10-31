import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BsList } from "react-icons/bs";
import { Button } from 'react-bootstrap';
import Sidebar from './Sidebar'; // Import the Sidebar component

const NavBar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const openSidebar = () => {
    setShowSidebar(true);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark" style={{ position: 'relative' }}>
        <Container className='d-flex' style={{ justifyContent: 'space-between' }}>
          <Navbar.Brand href="#home" style={{ marginLeft: '-90px', marginRight:'50px', fontWeight:'600', fontSize:'22px'}}>MailBox</Navbar.Brand>
          <Nav className="me-auto" style={{ fontSize: '20px' }}>
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          <Button style={{ fontSize: '28px', position: 'absolute', right: '20px', fontWeight: '700' }} onClick={openSidebar}><BsList /></Button>
        </Container>
      </Navbar>

      {/* Render the Sidebar component and pass showSidebar and closeSidebar as props */}
      <Sidebar show={showSidebar} onHide={closeSidebar} />
    </>
  );
}

export default NavBar;
