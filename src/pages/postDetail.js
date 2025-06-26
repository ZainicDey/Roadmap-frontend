import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import CommentItem from '../components/commentItem';
import PostCard from '../components/postCard';
import Navbar from '../components/navbar';
import { useNavigate } from 'react-router-dom';
export default function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState('');
  // const [comments, setComments] = useState(post.comments || []);
  const navigate = useNavigate();
  useEffect(() => {
    if (!postId) return;
    api.get(`/feature/posts/${postId}/`)
      .then(res => setPost(res.data))
      .catch(err => console.error('Error loading post detail:', err));
  }, [postId]);

  const handleAddComment = () => {
    console.log('Adding comment:', newComment);
    if (!newComment.trim()) return;
    api.post(`/feature/comments/`, { post_id: postId, content: newComment })
      .then(res => {
        setPost(prev => ({
          ...prev,
          comments: [...prev.comments, res.data],
        }));
        setNewComment('');
      });
  };
function removeCommentById(comments, commentId) {
  return comments
    .filter(comment => comment.id !== commentId) 
    .map(comment => ({
      ...comment,
      replies: comment.replies ? removeCommentById(comment.replies, commentId) : [],
    }));
}
const handleDelete = (commentId) => {
  api.delete(`/feature/comments/${commentId}/`)
    .then(() => {
      setPost(prev => ({
        ...prev,
        comments: removeCommentById(prev.comments, commentId)
      }));
    })
    .catch(err => {
      console.error('Delete failed', err);
    });
};

  const handleEdit = (commentId, newContent) => {
    api.patch(`/feature/comments/${commentId}/`, { content: newContent })
      .then(res => {
        setPost(prev => ({
          ...prev,
          comments: prev.comments.map(c => (c.id === commentId ? res.data : c)),
        }));
      });
  };

  return (
  <>
    <Navbar/>
    <div className="bg-white p-6 shadow rounded">
      <button className="mb-4 text-sm text-blue-600" onClick={() => navigate('/')}>← Back</button>

      {post ? (
        <>
          <PostCard
            postId={post.id}
            title={post.title}
            content={post.description}
            author={post.author}
            time={post.time}
            initialvotes={post.score}
            category={post.category}
            status={post.status}
            your_reaction={post.your_reaction}
            comment_count={post.comment_count}
          />

          {/* Comments Section */}
          <div className="space-y-4 mt-6">
            {post.comments?.map(comment => (
              <CommentItem
                key={comment.id}
                comment={comment}
                onDelete={handleDelete}
                onEdit={handleEdit}
                parent={comment.parent}
                postId={postId}
                // setComments={setComments}
              />
            ))}
          </div>

          {/* Add New Comment */}
          <div className="mt-4">
            <textarea
              className="w-full border rounded p-2"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button className="mt-2 bg-blue-500 text-white px-4 py-1 rounded" onClick={handleAddComment}>
              Post Comment
            </button>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  </>
  );
}
