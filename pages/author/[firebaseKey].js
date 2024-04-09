import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { viewAuthorDetails } from '../../api/mergedData';
import BookCard from '../../components/BookCard';
import { updateAuthor } from '../../api/authorData';

export default function ViewAuthor(onUpdate) {
  const [authorDetails, setAuthorDetails] = useState({});
  const router = useRouter();

  const toggleFavorite = () => {
    if (authorDetails.favorite) {
      updateAuthor({ ...authorDetails, favorite: false }).then(onUpdate);
    } else {
      updateAuthor({ ...authorDetails, favorite: true }).then(onUpdate);
    }
  };

  const { firebaseKey } = router.query;

  useEffect(() => {
    viewAuthorDetails(firebaseKey).then(setAuthorDetails);
  }, [firebaseKey]);

  return (
    <>
      <div className="mt-5 d-flex flex-column align-items-center">
        <div className="text-white details mb-3">
          <h5>
            {authorDetails.first_name} {authorDetails.last_name} <Button onClick={toggleFavorite} style={{ borderColor: 'white', backgroundColor: 'white' }}><span>{authorDetails.favorite ? '❤️' : '🩶'}</span></Button>
          </h5>
          Author Email: <a href={`mailto:${authorDetails?.email}`}>{authorDetails?.email}</a>
          <hr />
        </div>
        <div className="d-flex flex-wrap justify-content-center">
          { authorDetails.books?.map((book) => (
            <BookCard key={book.firebaseKey} bookObj={book} onUpdate={viewAuthorDetails} />
          ))}
        </div>
      </div>
    </>
  );
}
