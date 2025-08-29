import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout.jsx";

// Auth Pages
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";

// Main App Pages
import Home from "./pages/Home.jsx";
import Chat from "./pages/Chat.jsx";
import Conversation from "./pages/Conversation.jsx";
import CreatePost from "./pages/CreatePost.jsx";
import Profile from "./pages/Profile.jsx";
import UserSearch from "./pages/UserSearch.jsx";

export default function App() {
  return (
    <div className="app">
      <Routes>
        {/* Redirect root to home */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Public Routes (no layout/nav) */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected App Routes (with layout & navigation) */}
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/conversation/:id" element={<Conversation />} /> 
          <Route path="/create" element={<CreatePost />} /> 
          <Route path="/profile/:username" element={<Profile />} /> 
          <Route path="/search" element={<UserSearch />} /> 
        </Route>

        {/* Fallback Route */}
        <Route
          path="*"
          element={<h2 style={{ padding: "16px" }}>404 - Page Not Found</h2>}
        />
      </Routes>
    </div>
  );
}
