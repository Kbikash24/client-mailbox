import React from 'react';

const About = () => {
  return (
    <div className="container mt-5" style={{marginTop:'220px',fontSize:'20px',width:'100%'}}>
      <div className="row">
        <div className="col-md-9 offset-md-2">
          <h2>About</h2>
          <p style={{marginTop:'50px'}}>
            MailBox is a feature-rich email management application that helps you stay organized and efficient with your emails. It provides a user-friendly interface for composing, sending, receiving, and managing your emails.
          </p>
          <p>
            Whether you're a professional or an individual, MailBox makes it easy to keep your inbox clutter-free and ensures that you never miss an important email. It offers features such as real-time email updates, easy email composition, and a user-friendly inbox with intuitive controls.
          </p>
          <p>
            Our mission is to simplify email management and enhance your email experience. We are dedicated to providing a secure and efficient platform for all your email needs.
          </p>
          <p>
            Thank you for choosing MailBox for your email management. If you have any questions or feedback, please feel free to contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
