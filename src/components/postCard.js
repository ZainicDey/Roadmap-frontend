import { useState } from 'react';
import { ArrowUpIcon , ArrowDownIcon , ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import api from '../api/axios'; // Adjust the import path based on your project structure
import { useNavigate } from 'react-router-dom';
export default function PostCard({postId,title,content,author,time,initialvotes,category, status, your_reaction, comment_count}) {
  const navigate = useNavigate();
  const [voteStatus, setVoteStatus] = useState(your_reaction);
  const [votes, setVotes] = useState(initialvotes);

  const sendReaction = async (reactionType) => {
    try {
      const res = await api.post(`/feature/posts/${postId}/react/`, {
        reaction: reactionType
      });

      setVotes(res.data.score);
      setVoteStatus(res.data.your_reaction);
    } catch (error) {
      console.error('Vote failed:', error.response?.data?.detail || error.message);
    }
  };
  console.log(postId, your_reaction, voteStatus);
  const handlelikevote = () => {
    if (voteStatus === 'like') {
      setVoteStatus(null);
      setVotes(votes - 1);
      sendReaction('remove');
    } else {
      sendReaction('like');
      setVoteStatus('like');
      setVotes(voteStatus === 'dislike' ? votes + 2 : votes + 1);
    }
  };

  const handledislikevote = () => {
    if (voteStatus === 'dislike') {
      setVoteStatus(null);
      setVotes(votes + 1);
      sendReaction('remove');
    } else {
      setVoteStatus('dislike');
      setVotes(voteStatus === 'like' ? votes - 2 : votes - 1);
      sendReaction('dislike');
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 flex space-x-4 border border-gray-200 hover:border-gray-300 transition">
      {/* Voting Section */}
      <div className="flex flex-col items-center space-y-1">
        <button
          className={`hover:text-orange-500 ${voteStatus === 'like' ? 'text-orange-500' : 'text-gray-400'}`}
          onClick={handlelikevote}
        >
          <ArrowUpIcon className="w-5 h-5" />
        </button>
        <span className="text-sm font-medium">{votes}</span>
        <button
          className={`hover:text-red-500 ${voteStatus === 'dislike' ? 'text-red-500' : 'text-gray-400'}`}
          onClick={handledislikevote}
        >
          <ArrowDownIcon  className="w-5 h-5" />
        </button>
      </div>

      {/* Post Content */}
      <div className="flex-1">
        <div className="text-sm text-gray-500 mb-1">
          Posted by <span className="font-medium text-gray-700">@{author}</span> • {time}
        </div>
        <h2 className="text-lg font-semibold text-gray-800 mb-1">{title}</h2>
        <p className="text-gray-700 text-sm mb-2">{content}</p>

        {/* Category and Status */}
        <div className="flex space-x-2 mb-2">
          {category && (
            <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-0.5 rounded-full">
              {category}
            </span>
          )}
          {status && (
            <span className="bg-green-100 text-green-600 text-xs font-medium px-2 py-0.5 rounded-full">
              {status}
            </span>
          )}
        </div>

        <div
          className="text-sm text-gray-500 flex items-center space-x-2 cursor-pointer hover:underline"
          onClick={() => navigate(`/posts/${postId}`)}
        >
          <ChatBubbleLeftIcon className="w-4 h-4" />
          <span>View Comments ({comment_count})</span>
        </div>
      </div>
    </div>
  );
}
