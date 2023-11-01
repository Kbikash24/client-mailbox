import React, { useState,useEffect } from 'react';
import { Offcanvas, ListGroup } from 'react-bootstrap';
import { BsFillPenFill,BsInboxesFill} from "react-icons/bs";
import Compose from '../Mailbox/Compose';
import { MdAutoDelete } from "react-icons/md";
import { BiLogOut} from "react-icons/bi";
import { useDispatch } from 'react-redux';
import { authAction } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = ({ show, onHide }) => {
  const [showCompose, setShowCompose] = useState(false);
  const [mailCount, setMailCount] = useState(0);
  const email = localStorage.getItem("email");
  const inboxMails = useSelector((state) => state.email.unreadMails);
 const dispatch =useDispatch()
 const navigate=useNavigate()
 const logoutHandler=()=>{
  dispatch(authAction.logout());
  localStorage.removeItem("email");
  localStorage.removeItem("token");
  localStorage.removeItem("numberOfMails");
    navigate('/login');
}

 
 useEffect(() => {
  setMailCount(inboxMails);
}, [email, inboxMails]);


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
              <BsInboxesFill /> <div style={{ marginLeft: '35px', alignItems: 'center', marginTop: '-35px' }}>Inbox ({(mailCount)})</div>
            </ListGroup.Item>
            <ListGroup.Item action  href ='/outbox' style={{ fontSize: '22px',marginBottom:'20px'  }}>
              <BsInboxesFill /> <div style={{ marginLeft: '35px', alignItems: 'center', marginTop: '-35px' }}>Outbox</div>
            </ListGroup.Item>
            <ListGroup.Item action href='/inbox/deletedMails/:id' style={{ fontSize: '22px',marginBottom:'20px'  }}>
              <MdAutoDelete /> <div style={{ marginLeft: '35px', alignItems: 'center', marginTop: '-35px' }}>Deleted Message</div>
            </ListGroup.Item>
            <ListGroup.Item action  onClick={logoutHandler} style={{ fontSize: '22px',marginBottom:'20px'  }}>
              <BiLogOut /> <div style={{ marginLeft: '35px', alignItems: 'center', marginTop: '-35px' }}>Logout</div>
            </ListGroup.Item>
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Sidebar;
