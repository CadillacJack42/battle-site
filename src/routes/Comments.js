import React, { useEffect } from 'react';
import { fetchComments } from '../services/fetch-utils';
import UploadComment from './UploadComment';
import { useState } from 'react';
import Comment from './Comment';
import './Comments.css';

export default function Comments({ battle, opponent, userProfile }) {
  console.log(opponent);
  const [comments, setComments] = useState('');

  useEffect(() => {
    const getComments = async () => {
      const commentArray = await fetchComments(battle.id);
      setComments(commentArray);
    };
    getComments();
  }, [battle.id]);
  return (
    <div className="comment-container">
      {battle.response ? (
        <div>
          <h4 className="comment-header">Comments Section</h4>
          <div className="comments-section">
            {comments ? (
              comments.map((comment, i) => {
                return (
                  <>
                    <Comment key={`battle${comment.battle}-${i}`} comment={comment} />
                    <br></br>
                  </>
                );
              })
            ) : (
              <p>Comments Loading</p>
            )}
          </div>

          <UploadComment
            comments={comments}
            battle={battle}
            setComments={setComments}
            opponent={opponent}
            userProfile={userProfile}
          />
        </div>
      ) : (
        <div>
          <h3>Comment section will open when a response has been posted</h3>
        </div>
      )}
    </div>
  );
}
