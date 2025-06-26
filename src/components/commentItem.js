import { useState } from 'react';
import api from '../api/axios'; // your axios instance

export default function CommentItem({
  comment,
  postId,
  onDelete,
  onEdit,
  // setComments,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [replying, setReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [content, setContent] = useState(comment.content);

  const maxDepth = 3;

const handleSaveEdit = async () => {
  if (editContent.trim()) {
    setContent(editContent.trim());
    setIsEditing(false);
    try {
      const res = await api.patch(`/feature/comments/${comment.id}/`, {
        content: editContent.trim(),
      });
      onEdit(comment.id, res.data.content);
    } catch (err) {
      console.error('Edit failed', err.response?.data || err.message);
    }
  }
};

const handleDelete = () => {
  console.log(comment.id);
  onDelete(comment.id);
};

const handleSubmitReply = async () => {
  if (!replyContent.trim()) return;

  const payload = {
    post_id: postId,          
    comment_id: comment.id,
    content: replyContent.trim()
  };


  // setComments(prev => [...prev]);

  try {
    const res = await api.post('/feature/comments/', payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    comment.replies.push(res.data);
    // const newReply = res.data;
    setReplying(false);
    setReplyContent('');

  } catch (err) {
    console.error('Reply failed:', err.response?.data || err.message);
  }
};

  return (
    <div
      className="border-l-2 pl-4 my-2"
      style={{ marginLeft: comment.depth * 10 }}
    >
      <div className="text-sm text-gray-700">
        <strong>@{comment.author}</strong> •{' '}
        <span className="text-xs text-gray-400">
          {new Date(comment.created_at).toLocaleString()}
        </span>
      </div>

      {isEditing ? (
        <>
          <textarea
            className="w-full border rounded p-1 mt-1"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            rows={3}
          />
          <div className="space-x-2 mt-1">
            <button
              className="text-sm bg-green-500 text-white px-2 rounded"
              onClick={handleSaveEdit}
            >
              Save
            </button>
            <button
              className="text-sm bg-gray-300 px-2 rounded"
              onClick={() => {
                setIsEditing(false);
                setEditContent(comment.content);
              }}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <p className="mt-1 whitespace-pre-wrap">{content}</p>
      )}

      <div className="flex space-x-4 mt-2 text-xs text-blue-600">
        {comment.depth < maxDepth && (
          <button onClick={() => setReplying(true)}>Reply</button>
        )}

        {comment.self_comment && !isEditing && (
          <>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete} className="text-red-600">
              Delete
            </button>
          </>
        )}
      </div>

      {replying && comment.depth < maxDepth && (
        <div className="mt-2">
          <textarea
            className="w-full border rounded p-1"
            rows={2}
            placeholder="Write a reply..."
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          />
          <div className="space-x-2 mt-1">
            <button
              className="text-sm bg-blue-500 text-white px-2 rounded"
              onClick={handleSubmitReply}
            >
              Submit
            </button>
            <button
              className="text-sm bg-gray-300 px-2 rounded"
              onClick={() => {
                setReplying(false);
                setReplyContent('');
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {comment.replies?.length > 0 && (
        <div className="mt-2">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              postId={postId}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
}
