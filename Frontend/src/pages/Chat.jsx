import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 replace with actual logged-in user + target user
  const user1 = "123"; // current user (sender)
  const user2 = "456"; // receiver

  useEffect(() => {
    // 1. Fetch chat history
    async function fetchChatHistory() {
      try {
        const res = await axios.get(
          `http://localhost:3000/chat/chat-history/${user1}/${user2}?limit=20&skip=0`,
          { withCredentials: true } // send cookies
        );
        setMessages(res.data.chatHistory.reverse()); // oldest → newest
      } catch (err) {
        console.error("Error fetching chat:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchChatHistory();

    // 2. Connect to socket
    const newSocket = io("http://localhost:3000", {
      withCredentials: true,
    });
    setSocket(newSocket);

    // 3. Listen for incoming messages
    newSocket.on("message", (msg) => {
      setMessages((prev) => [...prev, { text: msg, sender: user2 }]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [user1, user2]);

  // Send message
  const handleSend = () => {
    if (!newMessage.trim()) return;

    // Emit message event
    socket.emit("message", {
      receiver: user2,
      message: newMessage,
    });

    // Update UI instantly
    setMessages((prev) => [
      ...prev,
      { text: newMessage, sender: user1, createdAt: new Date() },
    ]);
    setNewMessage("");
  };

  if (loading) return <p className="text-center">Loading chat...</p>;

  return (
    <div className="screen flex flex-col items-center">
      <div className="w-full max-w-md flex flex-col border rounded-lg shadow h-[80vh]">
        <h1 className="text-xl font-bold p-3 border-b">Chat</h1>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-md max-w-[70%] ${
                  msg.sender === user1
                    ? "bg-blue-500 text-white self-end ml-auto"
                    : "bg-gray-200 text-black self-start"
                }`}
              >
                <p>{msg.text}</p>
                <span className="text-xs opacity-70 block">
                  {msg.createdAt
                    ? new Date(msg.createdAt).toLocaleTimeString()
                    : ""}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No messages yet.</p>
          )}
        </div>

        {/* Message input */}
        <div className="p-3 border-t flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 border rounded px-2 py-1"
            placeholder="Type a message..."
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white px-3 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
