import { useEffect, useState } from "react";

export default function Conversation({ user1, user2 }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchChat() {
      try {
        const res = await fetch(
          `https://n2nsocial-full-stack.onrender.com//chat/chat-history/${user1}/${user2}?limit=20&skip=0`
        );
        const data = await res.json();
        setMessages(data.chatHistory || []);
      } catch (err) {
        console.error("Error fetching chat:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchChat();
  }, [user1, user2]);

  if (loading) return <p>Loading chat...</p>;

  return (
    <div className="screen p-4">
      <h1 className="text-xl font-bold mb-4">Conversation</h1>
      <div className="chat-box border p-3 rounded-md h-80 overflow-y-auto">
        {messages.length > 0 ? (
          messages.map((msg, i) => (
            <div
              key={i}
              className={`p-2 my-1 rounded-md ${
                msg.sender === user1 ? "bg-blue-200 text-right" : "bg-gray-200"
              }`}
            >
              <p>{msg.text}</p>
              <span className="text-xs text-gray-500">{msg.timestamp}</span>
            </div>
          ))
        ) : (
          <p>No messages yet.</p>
        )}
      </div>
    </div>
  );
}
