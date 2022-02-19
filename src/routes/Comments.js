import React, { useEffect } from 'react';
import Comment from './Comment';
import UploadComment from './UploadComment';
import { fetchComments } from '../services/fetch-utils';
import './Comments.css';
import { useState } from 'react';

export default function Comments({ battle, profile }) {
  console.log(profile);
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
          {profile && (
            <UploadComment
              comments={comments}
              profile={profile}
              battle={battle}
              setComments={setComments}
            />
          )}
        </div>
      ) : (
        <div>
          <h3>Comment section will open when a response has been posted</h3>
        </div>
      )}
    </div>
  );
}
