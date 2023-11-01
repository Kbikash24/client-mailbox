import React, { useCallback, useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../../store/mailSlice";
import { Link } from "react-router-dom";
import { FiDelete } from "react-icons/fi";

const Inbox = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const data = useSelector((state) => state.email.recieved);
  const [unreadMails, setUnreadMails] = useState(0); // New state for unread mails

  const email = localStorage.getItem("email");
  const changedMail = email.replace(/[@.]/g, "");
  localStorage.setItem("numberOfMails", data.length);

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      let res = await fetch(
        `https://mailbox-6e7cd-default-rtdb.firebaseio.com/${changedMail}Inbox.json`
      );
      let inboxData = await res.json();
      let arr = [];
      let unreadMailsCount = 0;

      for (let i in inboxData) {
        if (inboxData[i].read === false) {
          unreadMailsCount++;
        }
        const id = i;
        arr = [{ id: id, ...inboxData[i] }, ...arr];
      }
      
      dispatch(mailActions.recievedMail([...arr]));
      dispatch(mailActions.unreadMessage(unreadMailsCount));
      setUnreadMails(unreadMailsCount);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, [changedMail, dispatch]);

  useEffect(() => {
    getData();
  }, [getData]);

  // Use setInterval to periodically check for new emails
  useEffect(() => {
    const intervalId = setInterval(() => {
      getData();
    }, 3000); // Adjust the interval as needed

    return () => {
      clearInterval(intervalId);
    };
  }, [getData]);

  const DeleteHandler = async (id) => {
    setLoading(true);
    console.log(id);
    const mail = data.filter((item) => item.id === id);
    dispatch(mailActions.deleteMail(mail));
    console.log(mail);
    const res = await fetch(
      `https://mailbox-6e7cd-default-rtdb.firebaseio.com/${changedMail}Inbox/${id}.json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    let response = await res;
    console.log(response);
    setLoading(false);
  };

  return (
    <>
      <Card bg="light">
        <h2 style={{ textAlign: "center", textDecoration: "underline" }}>
          Inbox
        </h2>
        <span>Unread Mails-{unreadMails}</span>
        <ListGroup>
          {data.length === 0 && (
            <h5 style={{ textAlign: "center", margin: "1rem auto" }}>
              No Mails in Inbox!!
            </h5>
          )}
          

          {!loading &&
            data !== null &&
            Object.keys(data).map((email, index) => {
              return (
                <ListGroup.Item
                  key={index}
                  className="bg"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Link
                    key={index}
                    style={{
                      textDecoration: "none",
                      color: "black",
                      alignItems: "center",
                    }}
                    to={`/inbox/${data[email].id}`}
                  >
                    {data[email].read === false && (
                      <p
                        className="mt-3 me-3 ms-0"
                        style={{ marginRight: "10px", float: "left" }}
                      >
                        🟢
                      </p>
                    )}{" "}
                    <span style={{ textDecoration: "none", color: "black" }}>
                      <b>From:</b> {data[email].from}
                    </span>{" "}
                    <span>({data[email].time})</span>
                    <br />
                    <span>
                      <b>Subject: </b>
                      {data[email].subject}
                    </span>
                  </Link>
                
                  <FiDelete
                    onClick={() => DeleteHandler(data[email].id)}
                    key={data[email].id}
                    style={{ float: "right", fontSize: "30px" }}
                    variant="danger"
                  >
                    Delete
                  </FiDelete>
                </ListGroup.Item>
              );
            })}
        </ListGroup>
      </Card>
    </>
  );
};

export default Inbox;
