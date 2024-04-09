import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useAuth } from '../utils/context/authContext';
import { signOut } from '../utils/auth';

function User() {
  const { user } = useAuth();
  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',
    }}
    >
      <div style={{
        backgroundColor: 'white', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', maxWidth: '500px', width: '100%',
      }}
      >
        <Card>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Card.Img variant="top" src={user.photoURL} alt="(ノಠ益ಠ)ノ" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
          </div>
          <Card.Body>
            <Card.Title>{user.displayName}</Card.Title>
            <p>{user.email}</p>
            <p>{user.metadata.lastSignInTime}</p>
            <Button variant="danger" onClick={signOut}>Logout</Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

User.propTypes = {
  user: PropTypes.shape({
    photoURL: PropTypes.string,
    displayName: PropTypes.string,
    email: PropTypes.string,
    metadata: PropTypes.shape({
      lastSignInTime: PropTypes.string,
    }),
  }).isRequired,
};

export default User;
