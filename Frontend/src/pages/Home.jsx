import { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/PostCard.jsx";

// demo posts
const demoPosts = [
  {
    id: 1,
    user: { name: "alex", avatar: "https://i.pravatar.cc/100?img=12" },
    image: "https://picsum.photos/id/1011/1200/900",
    likes: 128,
    caption:
      "Exploring golden hour trails and capturing the calm between the chaos. The light just hits different today.",
    comments: [
      { user: "mira", text: "The colors are unreal. Love this shot!" },
      { user: "devon", text: "Okay now I need to go outside 😅" },
      { user: "sam", text: "Where is this? Looks peaceful." },
    ],
  },
  {
    id: 2,
    user: { name: "jordan", avatar: "https://i.pravatar.cc/100?img=32" },
    image:
      "https://images.unsplash.com/photo-1729701163957-85ba5dc5b971?w=500&auto=format&fit=crop&q=60",
    likes: 342,
    caption: "Weekend ritual: coffee, vinyl, and a good book. Reset mode engaged.",
    comments: [
      { user: "alex", text: "This is the vibe 🔥" },
      { user: "riley", text: "What record is that? Cover looks dope." },
    ],
  },
  {
    id: 3,
    user: { name: "sana", avatar: "https://i.pravatar.cc/100?img=5" },
    image:
      "https://images.unsplash.com/photo-1754951433192-cf5d42c3d3c9?w=500&auto=format&fit=crop&q=60",
    likes: 89,
    caption: "Tiny moments, big memories. Filed under “joy I didn’t plan for.”",
    comments: [
      { user: "jordan", text: "This made my day 🫶" },
      { user: "lee", text: "The composition is perfect." },
    ],
  },
];

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await axios.get("https://n2nsocial-full-stack.onrender.com//posts/", {
          withCredentials: true, // send cookies (JWT)
          params: { skip: 0, limit: 10 },
        });
        if (res.data?.posts?.length > 0) {
          setPosts(res.data.posts);
        } else {
          // fallback to demo posts if API has no data
          setPosts(demoPosts);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
        // fallback if API fails
        setPosts(demoPosts);
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
              key={post._id || post.id}
              username={post.user?.username || post.user?.name || "unknown"}
              avatarUrl={post.user?.image || post.user?.avatar || "https://i.pravatar.cc/100"}
              postImage={post.url || post.image}
              likesCount={post.likes?.length || post.likes || 0}
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
