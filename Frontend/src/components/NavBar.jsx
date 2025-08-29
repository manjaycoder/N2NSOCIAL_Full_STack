import { NavLink } from "react-router-dom";

const navLinks = [
  { path: "/home", label: "Home" },
  { path: "/chat", label: "Chat" },
  { path: "/conversation/:id", label: "Conversation" },
  { path: "/create", label: "Create Post" },
  { path: "/profile/:username", label: "Profile" },
  { path: "/search", label: "User Search" },
  { path: "/login", label: "Login" },
  { path: "/register", label: "Register" },
];

const linkStyle = ({ isActive }) => ({
  padding: "8px 12px",
  borderRadius: 6,
  textDecoration: "none",
  fontWeight: 500,
  transition: "0.2s",
  color: isActive ? "var(--button-text)" : "var(--text)",
  background: isActive ? "var(--button-bg)" : "transparent",
});

export default function NavBar() {
  return (
    <nav className="nav">
      <div className="brand">N22 Social</div>
      <div className="links">
        {navLinks.map(({ path, label }) => (
          <NavLink key={path} to={path} style={linkStyle}>
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
