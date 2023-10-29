import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { authAction } from '../../store/authSlice';
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authAction.logout());
    navigate('/login');
  }

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
          <div style={{ color: 'white', fontSize: '20px',marginRight:'-80px' }}>
            <a onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</a>
          </div>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
