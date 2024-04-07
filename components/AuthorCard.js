import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

function AuthorCard({ authorObj }) {
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{authorObj.first_name} {authorObj.last_name}</Card.Title>
        <p>{authorObj.email}</p>
        <p>{authorObj.favorite}</p>
      </Card.Body>
    </Card>
  );
}

AuthorCard.propTypes = {
  authorObj: PropTypes.shape({
    email: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    timestamp: PropTypes.number,
    uid: PropTypes.string,

  }).isRequired,
};

export default AuthorCard;
