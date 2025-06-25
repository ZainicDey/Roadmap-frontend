import { useEffect, useState} from 'react';
import Navbar from '../components/navbar';
import PostCard from '../components/postCard';
import api from '../api/axios';
export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [sort, setSort] = useState('');

  useEffect(() => {
    let url = '/feature/posts/';
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (status) params.append('status', status);
    if (sort) params.append('ordering', sort);
    if (params.toString()) url += `?${params.toString()}`;

    api.get(url)
      .then((res) => {
        console.log('Fetched posts:', res.data);
        setPosts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching posts:', err);
      });
  }, [category, status, sort]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="max-w-2xl mx-auto mt-8 space-y-4">
          {loading ? (
            <div className="flex justify-center">
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              <div className="flex space-x-12 mb-6">
                <div>
                  <label className="font-semibold mb-2 block">Category:</label>
                  <select
                    className="px-3 py-1 rounded border border-gray-300"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="feature">feature</option>
                    <option value="bugfix">bugfix</option>
                    <option value="improvement">improvement</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold mb-2 block">Status:</label>
                  <select
                    className="px-3 py-1 rounded border border-gray-300"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="planned">planned</option>
                    <option value="in_progress">in_progress</option>
                    <option value="completed">completed</option>
                  </select>
                </div>

                <div>
                  <div className="font-semibold mb-2">Sort by upvotes:</div>
                  <button
                    className="px-3 py-1 bg-purple-500 text-white rounded"
                    onClick={() => setSort(sort === 'score' ? '' : 'score')}
                  >
                    {sort === 'score' ? 'Sorted by Score ⬇️' : 'Sort by Score'}
                  </button>
                </div>
              </div>

              {posts.map((post) => (
                <PostCard
                  key={post.id}
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
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
