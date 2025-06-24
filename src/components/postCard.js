import { ArrowUpIcon, ArrowDownIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

export default function PostCard({ title, content, author, time, votes }) {
  return (
    <div className="bg-white shadow rounded-lg p-4 flex space-x-4 border border-gray-200 hover:border-gray-300 transition">
      {/* Voting Section */}
      <div className="flex flex-col items-center space-y-1">
        <button className="text-gray-400 hover:text-orange-500">
          <ArrowUpIcon className="w-5 h-5" />
        </button>
        <span className="text-sm font-medium">{votes}</span>
        <button className="text-gray-400 hover:text-blue-500">
          <ArrowDownIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Post Content */}
      <div className="flex-1">
        <div className="text-sm text-gray-500 mb-1">
          Posted by <span className="font-medium text-gray-700">@{author}</span> • {time}
        </div>
        <h2 className="text-lg font-semibold text-gray-800 mb-1">{title}</h2>
        <p className="text-gray-700 text-sm mb-2">{content}</p>
        <div className="text-sm text-gray-500 flex items-center space-x-2">
          <ChatBubbleLeftIcon className="w-4 h-4" />    
          <span>View Comments</span>
        </div>
      </div>
    </div>
  );
}
