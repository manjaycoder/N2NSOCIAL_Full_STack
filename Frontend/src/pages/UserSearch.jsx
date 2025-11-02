import { useState } from "react"
import axios from "axios"

export default function UserSearch() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSearch = async () => {
    if (!query.trim()) return
    setLoading(true)
    setError("")
    try {
      const res = await axios.get(`https://n2nsocial-full-stack-1.onrender.com/api/users/search?query=${query}`)
      setResults(res.data.users || [])
    } catch (err) {
      setError("Failed to fetch users. Try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="screen">
      <div className="center">
        <h1>User Search</h1>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter username or email"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border px-3 py-2 rounded-lg w-full"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        {loading && <p className="mt-4">Searching...</p>}
        {error && <p className="mt-4 text-red-500">{error}</p>}

        <ul className="mt-6 space-y-2">
          {results.map((user) => (
            <li
              key={user.id}
              className="border p-3 rounded-lg hover:bg-gray-100 cursor-pointer"
            >
              <p className="font-semibold">{user.username}</p>
              <p className="text-gray-600 text-sm">{user.email}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
