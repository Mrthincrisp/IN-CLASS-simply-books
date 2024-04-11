import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { updateAuthor } from '../api/authorData';
import { deleteAuthorBooks } from '../api/mergedData';

function AuthorCard({ authorObj, onUpdate }) {
  const toggleFavorite = () => {
    if (authorObj.favorite) {
      updateAuthor({ ...authorObj, favorite: false }).then(onUpdate);
    } else {
      updateAuthor({ ...authorObj, favorite: true }).then(onUpdate);
    }
  };

  const deleteAuthAndBooks = () => {
    if (window.confirm(`WHOA whoa whoa... Your about to delete ${authorObj.last_name}... you realize that right?  Like they'll be gone, and then you gotta add them, and depending on when we're reading this you might not be able to add another one.`)) {
      deleteAuthorBooks(authorObj.firebaseKey).then(() => onUpdate);
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title> {authorObj.first_name} {authorObj.last_name} <Button onClick={toggleFavorite} style={{ borderColor: 'white', backgroundColor: 'white' }}><span>{authorObj.favorite ? '❤️' : '🩶'}</span></Button></Card.Title>
        <p>{authorObj.email}</p>
        <Link href={`/author/${authorObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/author/edit/${authorObj.firebaseKey}`} passHref>
          <Button variant="info" className="m-2">EDIT</Button>
        </Link>
        <Button variant="danger" onClick={deleteAuthAndBooks} className="m-2">
          DELETE
        </Button>
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
  onUpdate: PropTypes.func.isRequired,
};

export default AuthorCard;
