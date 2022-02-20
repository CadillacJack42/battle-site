import React from 'react';
import { useState } from 'react/cjs/react.development';
import { submitComment, fetchComments } from '../services/fetch-utils';

export default function UploadComment({ comments, profile, battle, setComments, opponent }) {
  const [comment, setComment] = useState('');
  console.log(profile);

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const commentObject = {
      username: opponent.username,
      comment: comment,
    };
    let newComment;
    comments.length > 0
      ? (newComment = [...comments[0].comments, commentObject])
      : (newComment = [commentObject]);
    console.log(battle);
    await submitComment(battle, newComment);
    const updatedComments = await fetchComments(battle.id);

    // THIS SETTER IS FROM PROPS. IT SETS STATE IN PARENT COMPONENT
    setComments(updatedComments);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Submit comment <input type="text" onChange={handleChange}></input>
      </label>
      <button>Submit comment</button>
    </form>
  );
}
