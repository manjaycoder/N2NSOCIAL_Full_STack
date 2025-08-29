import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "confirm" || name === "password") setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:3000/auth/register", {
        username: form.username,
        email: form.email,
        password: form.password,
      });

      console.log("Register success:", res.data);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      // Optionally clear form or show success message here

      navigate("/home");
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="screen">
      <div className="container">
        <div className="card form-card" role="region" aria-label="Register">
          <div className="form-header">
            <h1 style={{ margin: 0 }}>Create your account</h1>
            <p className="muted">Join the community in seconds.</p>
          </div>

          <form className="form" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                placeholder="johndoe"
                className="input"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="input"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                className="input"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
              />
            </div>

            <div className="field">
              <label htmlFor="confirm">Confirm password</label>
              <input
                id="confirm"
                name="confirm"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                className="input"
                value={form.confirm}
                onChange={handleChange}
                required
                minLength={6}
              />
              {error && (
                <div className="error" role="alert">
                  {error}
                </div>
              )}
            </div>

            <button type="submit" className="btn-block" disabled={loading}>
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <div className="form-footer">
            <span>Already have an account? </span>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
