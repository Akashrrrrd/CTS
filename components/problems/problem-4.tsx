"use client"

import type React from "react"
import { useState } from "react"
import { CodeViewer } from "@/components/ui/code-viewer"

const HTML_CODE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form Validation</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <form id="registrationForm">
        <label for="username">Username:</label>
        <input type="text" id="username" required>
        
        <label for="email">Email:</label>
        <input type="email" id="email" required>
        
        <label for="password">Password:</label>
        <input type="password" id="password" required>
        
        <label for="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" required>
        
        <button type="submit">Submit</button>
        <div id="error-message" style="color: red;"></div>
    </form>
    <script src="script.js"><\/script>
</body>
</html>`

const CSS_CODE = `body {
    font-family: Arial, sans-serif;
}
form {
    width: 300px;
    margin: auto;
}
label {
    display: block;
    margin-top: 10px;
}
input {
    width: 100%;
    padding: 5px;
    margin-top: 5px;
}
button {
    margin-top: 10px;
    padding: 10px;
    background-color: #333;
    color: white;
    border: none;
    cursor: pointer;
}`

const JS_CODE = `document.getElementById('registrationForm').addEventListener('submit', function(event) {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        event.preventDefault();
        document.getElementById('error-message').innerText = 'Passwords do not match';
    }
});`

export default function Problem4() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setError("")
    setSuccess(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    if (!formData.username.trim()) {
      setError("Username is required")
      return
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email")
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setSuccess(true)
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    })

    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-2">Registration Form</h2>
        <p className="text-slate-400 mb-6">Fill out the form with real-time validation</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-white font-semibold mb-2">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-slate-700 text-white border border-slate-600 focus:border-blue-500 focus:outline-none"
            placeholder="Enter username"
          />
        </div>

        <div>
          <label className="block text-white font-semibold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-slate-700 text-white border border-slate-600 focus:border-blue-500 focus:outline-none"
            placeholder="Enter email"
          />
        </div>

        <div>
          <label className="block text-white font-semibold mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-slate-700 text-white border border-slate-600 focus:border-blue-500 focus:outline-none"
            placeholder="Enter password"
          />
        </div>

        <div>
          <label className="block text-white font-semibold mb-2">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-slate-700 text-white border border-slate-600 focus:border-blue-500 focus:outline-none"
            placeholder="Confirm password"
          />
        </div>

        {error && <div className="p-4 bg-red-500/20 border border-red-500 rounded text-red-200">{error}</div>}

        {success && (
          <div className="p-4 bg-green-500/20 border border-green-500 rounded text-green-200">
            Form submitted successfully!
          </div>
        )}

        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition"
        >
          Submit
        </button>
      </form>

      <div className="bg-slate-700/30 border border-slate-600 rounded-lg p-4">
        <p className="text-slate-300 text-sm">
          <strong>Validation Rules:</strong> Username required, valid email format, password minimum 6 characters, and
          passwords must match.
        </p>
      </div>

      <div className="border-t border-slate-700 pt-6">
        <h2 className="text-xl font-semibold text-white mb-4">Source Code</h2>
        <CodeViewer html={HTML_CODE} css={CSS_CODE} js={JS_CODE} />
      </div>
    </div>
  )
}
