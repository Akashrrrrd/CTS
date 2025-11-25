"use client"

import { useState, useEffect } from "react"
import { CodeViewer } from "@/components/ui/code-viewer"

const HTML_CODE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Carousel</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="carousel">
        <button class="carousel-button" onclick="prevImage()">&#10094;</button>
        <img id="carousel-image" src="image1.jpg" alt="Carousel Image">
        <button class="carousel-button" onclick="nextImage()">&#10095;</button>
    </div>
    <script src="script.js"><\/script>
</body>
</html>`

const CSS_CODE = `body {
    font-family: Arial, sans-serif;
}
.carousel {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 600px;
    margin: auto;
}
.carousel img {
    width: 100%;
    height: auto;
}
.carousel-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    cursor: pointer;
    padding: 10px;
}
.carousel-button:first-of-type {
    left: 10px;
}
.carousel-button:last-of-type {
    right: 10px;
}`

const JS_CODE = `const images = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
let currentIndex = 0;
function showImage(index) {
    document.getElementById('carousel-image').src = images[index];
}
function prevImage() {
    currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
    showImage(currentIndex);
}
function nextImage() {
    currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    showImage(currentIndex);
}
// Automatic image transition
setInterval(nextImage, 3000);`

export default function Problem7() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  const images = ["/carousel-image-1.jpg", "/carousel-image-2.jpg", "/carousel-image-3.jpg"]

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [isAutoPlay, images.length])

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-2">Image Carousel</h2>
        <p className="text-slate-400 mb-6">Auto-scrolling carousel with manual navigation controls</p>
      </div>

      {/* Carousel */}
      <div className="relative bg-slate-700 rounded-lg overflow-hidden">
        <div className="relative w-full h-96 flex items-center justify-center">
          <img
            src={images[currentIndex] || "/placeholder.svg"}
            alt={`Slide ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />

          {/* Previous Button */}
          <button
            onClick={goToPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded transition z-10"
          >
            &#10094;
          </button>

          {/* Next Button */}
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded transition z-10"
          >
            &#10095;
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 px-4 py-2 rounded text-white text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        <div className="flex gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx)
                setIsAutoPlay(false)
              }}
              className={`flex-1 h-2 rounded transition ${
                idx === currentIndex ? "bg-blue-500" : "bg-slate-600 hover:bg-slate-500"
              }`}
              title={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          className={`w-full px-4 py-2 rounded font-semibold transition ${
            isAutoPlay ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-slate-700 hover:bg-slate-600 text-white"
          }`}
        >
          {isAutoPlay ? "⏸ Pause Auto-Play" : "▶ Start Auto-Play"}
        </button>
      </div>

      {/* Features Description */}
      <div className="bg-slate-700/30 border border-slate-600 rounded-lg p-4">
        <p className="text-slate-300 text-sm">
          <strong>Features:</strong> The carousel automatically transitions every 3 seconds. Use the arrow buttons to
          navigate manually, or click the progress dots to jump to a specific slide. Toggle auto-play with the button
          below.
        </p>
      </div>

      {/* Source Code Section */}
      <div className="border-t border-slate-700 pt-6">
        <h2 className="text-xl font-semibold text-white mb-4">Source Code</h2>
        <CodeViewer html={HTML_CODE} css={CSS_CODE} js={JS_CODE} />
      </div>
    </div>
  )
}
