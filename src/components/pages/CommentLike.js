import React, { useState } from 'react';
import { createComment, likePost } from './api';

function PostItem({ post }) {
  const [comment, setComment] = useState('');
  const [liked, setLiked] = useState(false);

  const handleCommentSubmit = async () => {
    try {
      await createComment(post.id, { body: comment });
      // Clear the comment input after submission
      setComment('');
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  const handleLike = async () => {
    try {
      await likePost(post.id);
      setLiked(true);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <div className="post">
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <button onClick={handleLike} disabled={liked}>
        {liked ? 'Liked' : 'Like'}
      </button>
      <div className="comment-section">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={handleCommentSubmit}>Add Comment</button>
      </div>
    </div>
  );
}

export default PostItem;