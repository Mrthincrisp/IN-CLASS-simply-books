import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card } from 'react-bootstrap';
import { viewAuthorDetails } from '../../api/mergedData';
import BookCard from '../../components/BookCard';

export default function ViewAuthor() {
  const [authorDetails, setAuthorDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    viewAuthorDetails(firebaseKey).then(setAuthorDetails);
  }, [firebaseKey]);

  return (
    <>
      <div className="mt-5 d-flex flex-column align-items-center">
        <div className="text-white details mb-3">
          <Card.Title>
            {authorDetails.first_name} {authorDetails.last_name} {authorDetails.favorite ? '❤️' : '🩶'}
          </Card.Title>
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
