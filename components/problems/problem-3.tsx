"use client"

import type React from "react"
import { useState } from "react"
import { CodeViewer } from "@/components/ui/code-viewer"

const HTML_CODE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dynamic Photo Gallery</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <form id="photoForm">
        <input type="text" id="photoUrl" placeholder="Enter photo URL" required>
        <button type="submit">Add Photo</button>
    </form>
    <div class="gallery" id="gallery"></div>
    <script src="script.js"><\/script>
</body>
</html>`

const CSS_CODE = `body {
    font-family: Arial, sans-serif;
}
form {
    margin-bottom: 20px;
}
.gallery {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
}
.gallery img {
    width: 100%;
    cursor: pointer;
}
@media (max-width: 768px) {
    .gallery {
        grid-template-columns: repeat(2, 1fr);
    }
}
@media (max-width: 480px) {
    .gallery {
        grid-template-columns: 1fr;
    }
}`

const JS_CODE = `document.getElementById('photoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const url = document.getElementById('photoUrl').value;
    addPhoto(url);
    document.getElementById('photoUrl').value = '';
});
function addPhoto(url) {
    const gallery = document.getElementById('gallery');
    const img = document.createElement('img');
    img.src = url;
    img.addEventListener('click', function() {
        gallery.removeChild(img);
    });
    gallery.appendChild(img);
}`

export default function Problem3() {
  const [photos, setPhotos] = useState<string[]>([])
  const [photoUrl, setPhotoUrl] = useState("")

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault()
    if (photoUrl.trim()) {
      setPhotos([...photos, photoUrl])
      setPhotoUrl("")
    }
  }

  const handleRemovePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Dynamic Photo Gallery</h2>
        <p className="text-slate-400 mb-6">
          Add image URLs to create a responsive gallery. Click on images to remove them.
        </p>

        {/* Add Photo Form */}
        <form onSubmit={handleAddPhoto} className="flex gap-2 mb-8">
          <input
            type="text"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
            placeholder="Enter photo URL"
            className="flex-1 px-4 py-2 rounded bg-slate-700 text-white placeholder-slate-500 border border-slate-600 focus:border-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold transition"
          >
            Add Photo
          </button>
        </form>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {photos.length > 0 ? (
            photos.map((photo, idx) => (
              <div
                key={idx}
                onClick={() => handleRemovePhoto(idx)}
                className="group relative cursor-pointer overflow-hidden rounded-lg"
              >
                <img
                  src={photo || "/placeholder.svg"}
                  alt={`Photo ${idx + 1}`}
                  className="w-full h-56 object-cover group-hover:opacity-70 transition"
                  onError={(e) => {
                    e.currentTarget.src = "/abstract-colorful-photo.png"
                  }}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                  <p className="text-white font-semibold">Click to Remove</p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12 text-slate-400">
              <p>No photos yet. Add one using the form above!</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-slate-700/30 border border-slate-600 rounded-lg p-4">
        <p className="text-slate-300 text-sm">
          <strong>Features:</strong> The gallery is responsive and adapts to different screen sizes (1 column on mobile,
          2 on tablet, 3 on desktop). Click any image to remove it from the gallery.
        </p>
      </div>

      <div className="border-t border-slate-700 pt-6">
        <h2 className="text-xl font-semibold text-white mb-4">Source Code</h2>
        <CodeViewer html={HTML_CODE} css={CSS_CODE} js={JS_CODE} />
      </div>
    </div>
  )
}

Problem3.CodeView = () => <CodeViewer html={HTML_CODE} css={CSS_CODE} js={JS_CODE} />
