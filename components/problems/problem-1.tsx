"use client"

import { useState } from "react"
import { CodeViewer } from "@/components/ui/code-viewer"

const HTML_CODE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Showcase</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="gallery">
        <img src="thumbnail1.jpg" class="thumbnail" alt="Thumbnail 1">
        <img src="thumbnail2.jpg" class="thumbnail" alt="Thumbnail 2">
        <img src="thumbnail3.jpg" class="thumbnail" alt="Thumbnail 3">
        <img src="thumbnail4.jpg" class="thumbnail" alt="Thumbnail 4">
    </div>
    <div class="image-display">
        <img id="selected-image" class="selected-image" src="/placeholder.svg" alt="Selected Image">
    </div>
    <script src="script.js"><\/script>
</body>
</html>`

const CSS_CODE = `.thumbnail {
    width: 100px;
    height: 70px;
    cursor: pointer;
    margin: 5px;
}
.image-display {
    margin-top: 20px;
    text-align: center;
}
.selected-image {
    width: 400px;
    height: auto;
}`

const JS_CODE = `document.querySelectorAll('.thumbnail').forEach(thumbnail => {
    thumbnail.addEventListener('click', function() {
        document.getElementById('selected-image').src = this.src;
    });
});`

export default function Problem1() {
  const [selectedImage, setSelectedImage] = useState<string>("")

  const thumbnails = [
    "/serene-mountain-valley.png",
    "/rolling-hills-sunset.png",
    "/landscape-photo-3.jpg",
    "/landscape-photo-4.jpg",
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-4">Image Gallery</h2>
        <div className="flex gap-2 mb-6 flex-wrap">
          {thumbnails.map((thumb, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(thumb)}
              className={`w-[100px] h-[70px] cursor-pointer border-2 rounded transition-all ${
                selectedImage === thumb
                  ? "border-blue-500 shadow-lg shadow-blue-500/50"
                  : "border-slate-600 hover:border-slate-500"
              }`}
            >
              <img
                src={thumb || "/placeholder.svg"}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover rounded"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-700 pt-6">
        <h2 className="text-xl font-semibold text-white mb-4">Selected Image Display</h2>
        <div className="text-center bg-slate-700/50 rounded-lg p-8 min-h-[300px] flex items-center justify-center">
          {selectedImage ? (
            <img
              src={selectedImage || "/placeholder.svg"}
              alt="Selected Image"
              className="w-[400px] h-auto rounded-lg shadow-lg"
            />
          ) : (
            <p className="text-slate-400">Click on a thumbnail to display the image</p>
          )}
        </div>
      </div>

      <div className="border-t border-slate-700 pt-6">
        <h2 className="text-xl font-semibold text-white mb-4">Source Code</h2>
        <CodeViewer html={HTML_CODE} css={CSS_CODE} js={JS_CODE} />
      </div>
    </div>
  )
}
