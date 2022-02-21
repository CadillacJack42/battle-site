import React from 'react';

export default function Comment({ comment }) {
  return (
    <>
      {comment.comments.map((comment, i) => {
        const newComment = JSON.parse(comment);
        return (
          <p key={newComment.username + i}>{`${newComment.username} : ${newComment.comment} `}</p>
        );
      })}
    </>
  );
}
