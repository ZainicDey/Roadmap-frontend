import { useState } from 'react';

export default function CommentItem({ comment, onDelete, onEdit, depth = 0 }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [replying, setReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const maxDepth = 3;

  const handleSaveEdit = () => {
    if (editContent.trim()) {
      onEdit(comment.id, editContent.trim());
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditContent(comment.content);
  };

  // For reply button, you can add reply logic here, e.g. callback prop (not included for brevity)
  const handleReplyClick = () => {
    setReplying(true);
  };

  const handleCancelReply = () => {
    setReplying(false);
    setReplyContent('');
  };

  // You can add onSubmitReply to post reply if you want, skipped for simplicity

  return (
    <div
      className="border-l-2 pl-4 my-2"
      style={{ marginLeft: depth * 20 }} // indent by 20px per depth level
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
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <p className="mt-1 whitespace-pre-wrap">{comment.content}</p>
      )}

      <div className="flex space-x-4 mt-2 text-xs text-blue-600">
        {depth < maxDepth && (
          <button onClick={handleReplyClick}>Reply</button>
        )}

        {comment.self_comment && !isEditing && (
          <>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(comment.id)} className="text-red-600">
              Delete
            </button>
          </>
        )}
      </div>

      {/* Reply input box if replying */}
      {replying && depth < maxDepth && (
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
              // onClick={handleSubmitReply} // Implement this as needed
              onClick={handleCancelReply} // For now just cancel on click
            >
              Submit
            </button>
            <button
              className="text-sm bg-gray-300 px-2 rounded"
              onClick={handleCancelReply}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Render replies recursively */}
      {comment.replies?.length > 0 && (
        <div className="mt-2">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onDelete={onDelete}
              onEdit={onEdit}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
