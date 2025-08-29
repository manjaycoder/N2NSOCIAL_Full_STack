import { useState } from "react";

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [mentions, setMentions] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!file) {
      setMessage("Please select an image.");
      return;
    }

    const formData = new FormData();
formData.append("file", file); // 👈 backend expects "file"
if (mentions) {
  formData.append("mentions", mentions); // don't split, backend should parse
}


    try {
      setLoading(true);
      setMessage("");

      const res = await fetch("https://n2nsocial-full-stack.onrender.com//posts/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // token from login
        },
        withCredentials: true, 
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Post created successfully!");
        setFile(null);
        setMentions("");
      } else {
        setMessage(`❌ ${data.message || "Failed to create post"}`);
      }
    } catch (err) {
      setMessage("❌ Error creating post.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="screen">
      <div className="container">
        <div className="card form-card" role="region" aria-label="Create Post">
          <h1>Create Post</h1>

          <form onSubmit={handleSubmit} className="form">
            <div className="field">
              <label htmlFor="image">Upload Image</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
              {file && (
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="mt-2 w-40 rounded-md"
                />
              )}
            </div>

            <div className="field">
              <label htmlFor="mentions">Mentions (comma-separated)</label>
              <input
                type="text"
                id="mentions"
                placeholder="@alice,@bob"
                className="input"
                value={mentions}
                onChange={(e) => setMentions(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-block" disabled={loading}>
              {loading ? "Posting..." : "Create Post"}
            </button>
          </form>

          {message && (
            <p className="mt-3 text-center text-sm" role="alert">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
