"use client"

import { useState } from "react"
import { CodeViewer } from "@/components/ui/code-viewer"

const HTML_CODE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Responsive Navigation Bar</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <nav class="navbar">
        <div class="logo">Logo</div>
        <div class="nav-links" id="navLinks">
            <a href="#">Link1</a>
            <a href="#">Link2</a>
            <a href="#">Link3</a>
        </div>
        <div class="search-bar">
            <input type="text" placeholder="Search...">
        </div>
        <div class="menu-icon" onclick="toggleMenu()">☰</div>
    </nav>
    <script src="script.js"><\/script>
</body>
</html>`

const CSS_CODE = `body {
    font-family: Arial, sans-serif;
}
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #333;
    color: white;
}
.nav-links a {
    margin: 0 10px;
    text-decoration: none;
    color: white;
}
.search-bar input {
    padding: 5px;
}
.menu-icon {
    display: none;
    font-size: 24px;
    cursor: pointer;
}
@media (max-width: 768px) {
    .nav-links {
        display: none;
        flex-direction: column;
        width: 100%;
    }
    .nav-links a {
        margin: 10px 0;
    }
    .menu-icon {
        display: block;
    }
}`

const JS_CODE = `function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks.style.display === 'block') {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'block';
    }
}`

export default function Problem2() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="text-white mb-6">
        <h2 className="text-xl font-semibold mb-4">Responsive Navigation Bar</h2>
        <p className="text-slate-400 mb-4">
          Resize your window to see the navigation bar adapt to different screen sizes
        </p>
      </div>

      <nav className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4">
          <div className="text-white font-bold text-xl">Logo</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            <a href="#" className="text-white hover:text-blue-400 transition">
              Link 1
            </a>
            <a href="#" className="text-white hover:text-blue-400 transition">
              Link 2
            </a>
            <a href="#" className="text-white hover:text-blue-400 transition">
              Link 3
            </a>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 rounded bg-slate-800 text-white placeholder-slate-500 border border-slate-700 focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white text-2xl">
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-slate-700 bg-slate-800 px-6 py-4 space-y-3">
            <a href="#" className="block text-white hover:text-blue-400 transition py-2">
              Link 1
            </a>
            <a href="#" className="block text-white hover:text-blue-400 transition py-2">
              Link 2
            </a>
            <a href="#" className="block text-white hover:text-blue-400 transition py-2">
              Link 3
            </a>
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 rounded bg-slate-700 text-white placeholder-slate-500 border border-slate-600 focus:border-blue-500 focus:outline-none mt-2"
            />
          </div>
        )}
      </nav>

      <div className="bg-slate-700/30 border border-slate-600 rounded-lg p-4">
        <p className="text-slate-300 text-sm">
          <strong>Responsive Features:</strong> On desktop, the menu is visible with a search bar. On mobile (smaller
          screens), a toggle menu button (☰) appears to save space. Try resizing your browser window to see the
          transition.
        </p>
      </div>

      {/* Code Viewer */}
      <div className="border-t border-slate-700 pt-6">
        <h2 className="text-xl font-semibold text-white mb-4">Source Code</h2>
        <CodeViewer html={HTML_CODE} css={CSS_CODE} js={JS_CODE} />
      </div>
    </div>
  )
}
