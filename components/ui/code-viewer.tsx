"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface CodeViewerProps {
  html: string
  css: string
  js: string
}

export function CodeViewer({ html, css, js }: CodeViewerProps) {
  const [activeTab, setActiveTab] = useState<"html" | "css" | "js">("html")

  const getCode = () => {
    switch (activeTab) {
      case "html":
        return html
      case "css":
        return css
      case "js":
        return js
      default:
        return ""
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 border-b border-slate-600">
        {[
          { tab: "html" as const, label: "HTML" },
          { tab: "css" as const, label: "CSS" },
          { tab: "js" as const, label: "JavaScript" },
        ].map(({ tab, label }) => (
          <Button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-t-lg font-semibold transition-all ${
              activeTab === tab ? "bg-blue-600 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
            variant="ghost"
          >
            {label}
          </Button>
        ))}
      </div>

      <div className="bg-slate-900 rounded-lg p-4 border border-slate-700 overflow-x-auto max-h-96">
        <pre className="text-sm text-slate-300 font-mono whitespace-pre-wrap break-words">
          <code>{getCode()}</code>
        </pre>
      </div>
    </div>
  )
}
