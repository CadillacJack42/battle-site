import React from 'react';
import { useState } from 'react/cjs/react.development';
import { submitComment } from '../services/fetch-utils';

export default function UploadComment({ comments, profile, battle }) {
  const [comment, setComment] = useState('');

  const handleChange = (e) => {
    setComment(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const commentObject = {
      username: profile.username,
      comment: comment,
    };
    const newComment = [...comments[0].comments, commentObject];
    console.log(battle);
    submitComment(battle, newComment);
  };

  return <form onSubmit={handleSubmit}>
    <label>
          Submit comment {' '}
      <input type='text' onChange={handleChange}></input>
    </label>
    <button>Submit comment</button>
  </form>;
}
