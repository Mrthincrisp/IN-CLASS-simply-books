import React, { useEffect, useState } from 'react';
import { getAuthors } from '../api/authorData';
import { useAuth } from '../utils/context/authContext';
import AuthorCard from '../components/AuthorCard';

function Authors() {
  const [authors, setAuthors] = useState([]);

  const { user } = useAuth();

  const getAuthorList = () => {
    getAuthors(user.uid).then(setAuthors);
  };

  useEffect(() => {
    getAuthorList();
  });

  return (

    <div className="d-flex flex-wrap">
      {authors.map((author) => (
        <AuthorCard key={author.firebaseKey} authorObj={author} onUpdate={getAuthorList} />
      ))}
    </div>
  );
}

export default Authors;
