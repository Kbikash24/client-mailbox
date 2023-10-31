import React, { useState } from 'react';
import { Offcanvas, ListGroup } from 'react-bootstrap';
import { BsFillPenFill,BsInboxesFill} from "react-icons/bs";
import Compose from '../Mailbox/Compose';
import { MdAutoDelete } from "react-icons/md";
import { BiLogOut} from "react-icons/bi";
import { useDispatch } from 'react-redux';
import { authAction } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ show, onHide }) => {
  const [showCompose, setShowCompose] = useState(false);
 const dispatch =useDispatch()
 const navigate=useNavigate()
 const handleLogout=()=>{
  dispatch(authAction.logout())
  navigate('/login')
 }

  const toggleCompose = () => {
    setShowCompose(!showCompose);
  }

  return (
    <>
     {showCompose && <Compose />}
      <Offcanvas show={show} onHide={onHide} placement='end' style={{color:'blue'}}>
       <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{ fontSize: '25px' }}>
            <div style={{ marginLeft: '18px'}}>MailBox</div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup>
            <ListGroup.Item action onClick={toggleCompose} style={{ fontSize: '22px',marginBottom:'15px' }}>
              <BsFillPenFill /> <div style={{ marginLeft: '35px', alignItems: 'center', marginTop: '-35px' }}>Compose</div>
            </ListGroup.Item>
            <ListGroup.Item action href='/inbox' style={{ fontSize: '22px',marginBottom:'20px'  }}>
              <BsInboxesFill /> <div style={{ marginLeft: '35px', alignItems: 'center', marginTop: '-35px' }}>Inbox</div>
            </ListGroup.Item>
            <ListGroup.Item action  href ='/outbox' style={{ fontSize: '22px',marginBottom:'20px'  }}>
              <BsInboxesFill /> <div style={{ marginLeft: '35px', alignItems: 'center', marginTop: '-35px' }}>Outbox</div>
            </ListGroup.Item>
            <ListGroup.Item action href='/inbox/deletedMails/:id' style={{ fontSize: '22px',marginBottom:'20px'  }}>
              <MdAutoDelete /> <div style={{ marginLeft: '35px', alignItems: 'center', marginTop: '-35px' }}>Deleted Message</div>
            </ListGroup.Item>
            <ListGroup.Item action  onClick={handleLogout} style={{ fontSize: '22px',marginBottom:'20px'  }}>
              <BiLogOut /> <div style={{ marginLeft: '35px', alignItems: 'center', marginTop: '-35px' }}>Logout</div>
            </ListGroup.Item>
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Sidebar;
