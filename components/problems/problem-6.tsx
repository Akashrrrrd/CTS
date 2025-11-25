"use client"

import { useState } from "react"
import { CodeViewer } from "@/components/ui/code-viewer"

const HTML_CODE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accordion Component</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="accordion">
        <div class="accordion-item">
            <div class="accordion-header" onclick="toggleAccordion(event)">Section 1</div>
            <div class="accordion-content">Content for section 1</div>
        </div>
        <div class="accordion-item">
            <div class="accordion-header" onclick="toggleAccordion(event)">Section 2</div>
            <div class="accordion-content">Content for section 2</div>
        </div>
        <div class="accordion-item">
            <div class="accordion-header" onclick="toggleAccordion(event)">Section 3</div>
            <div class="accordion-content">Content for section 3</div>
        </div>
    </div>
    <script src="script.js"><\/script>
</body>
</html>`

const CSS_CODE = `body {
    font-family: Arial, sans-serif;
}
.accordion-item {
    border: 1px solid #ccc;
    margin: 10px 0;
}
.accordion-header {
    background-color: #f4f4f4;
    padding: 10px;
    cursor: pointer;
}
.accordion-content {
    display: none;
    padding: 10px;
}`

const JS_CODE = `function toggleAccordion(event) {
    const header = event.currentTarget;
    const content = header.nextElementSibling;
    const isVisible = content.style.display === 'block';
    document.querySelectorAll('.accordion-content').forEach(c => c.style.display = 'none');
    
    content.style.display = isVisible ? 'none' : 'block';
}`

export default function Problem6() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const sections = [
    {
      title: "Section 1",
      content: "This is the content for section 1. It provides information about the first topic.",
    },
    {
      title: "Section 2",
      content: "This is the content for section 2. It contains details about the second subject.",
    },
    {
      title: "Section 3",
      content: "This is the content for section 3. Learn more about the third topic here.",
    },
  ]

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-2">Accordion Component</h2>
        <p className="text-slate-400 mb-6">Click on any section to expand or collapse it</p>
      </div>

      <div className="space-y-3">
        {sections.map((section, idx) => (
          <div key={idx} className="border border-slate-600 rounded overflow-hidden">
            <button
              onClick={() => toggleAccordion(idx)}
              className={`w-full px-6 py-4 text-left font-semibold transition ${
                activeIndex === idx ? "bg-blue-600 text-white" : "bg-slate-700 text-white hover:bg-slate-600"
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{section.title}</span>
                <span className={`transition-transform ${activeIndex === idx ? "rotate-180" : ""}`}>▼</span>
              </div>
            </button>
            {activeIndex === idx && (
              <div className="px-6 py-4 bg-slate-800 text-slate-300 border-t border-slate-600">{section.content}</div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-slate-700/30 border border-slate-600 rounded-lg p-4">
        <p className="text-slate-300 text-sm">
          <strong>Features:</strong> Only one section can be expanded at a time. Click the section header to
          expand/collapse. The active section is highlighted in blue with a dropdown indicator.
        </p>
      </div>

      <div className="border-t border-slate-700 pt-6">
        <h2 className="text-xl font-semibold text-white mb-4">Source Code</h2>
        <CodeViewer html={HTML_CODE} css={CSS_CODE} js={JS_CODE} />
      </div>
    </div>
  )
}

Problem6.CodeView = () => <CodeViewer html={HTML_CODE} css={CSS_CODE} js={JS_CODE} />
