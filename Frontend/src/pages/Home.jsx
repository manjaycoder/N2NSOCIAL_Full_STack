import { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/PostCard.jsx";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await axios.get("http://localhost:3000/posts/", {
          withCredentials: true, // send cookies (JWT)
          params: { skip: 0, limit: 10 }, // same as your backend limit
        });
        setPosts(res.data.posts);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading feed...</p>;
  }

  return (
    <div className="container">
      <div className="feed" aria-label="Home feed">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard
              key={post._id}
              username={post.user?.username || "unknown"}
              avatarUrl={post.user?.image || "https://i.pravatar.cc/100"}
              postImage={post.url}
              likesCount={post.likes?.length || 0}
              caption={post.caption}
              comments={post.comments || []}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No posts yet.</p>
        )}
      </div>
    </div>
  );
}
