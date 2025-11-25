"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const problems = [
  {
    id: 1,
    title: "Image Showcase",
    description: "Interactive image gallery with thumbnail selection",
    color: "from-blue-500 to-blue-600",
  },
  {
    id: 2,
    title: "Responsive Navigation Bar",
    description: "Adaptive navigation with mobile menu toggle",
    color: "from-purple-500 to-purple-600",
  },
  {
    id: 3,
    title: "Dynamic Photo Gallery",
    description: "Add and remove photos in responsive grid layout",
    color: "from-pink-500 to-pink-600",
  },
  {
    id: 4,
    title: "Form Validation",
    description: "Real-time registration form with validation feedback",
    color: "from-green-500 to-green-600",
  },
  {
    id: 5,
    title: "To-Do List Application",
    description: "Manage tasks with complete and remove functionality",
    color: "from-orange-500 to-orange-600",
  },
  {
    id: 6,
    title: "Accordion Component",
    description: "Expandable sections with exclusive content display",
    color: "from-indigo-500 to-indigo-600",
  },
  {
    id: 7,
    title: "Image Carousel",
    description: "Auto-scrolling carousel with manual navigation",
    color: "from-cyan-500 to-cyan-600",
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-2">Technical Problems Showcase</h1>
          <p className="text-slate-400 text-lg">Click on any problem to view the interactive solution</p>
        </div>
      </div>

      {/* Problems Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem) => (
            <Link key={problem.id} href={`/problem/${problem.id}`}>
              <Card className="h-full bg-slate-800 border-slate-700 hover:border-slate-500 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-slate-500/20 transform hover:scale-105">
                <div className={`h-32 bg-gradient-to-br ${problem.color} rounded-t-lg`} />
                <div className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h2 className="text-xl font-bold text-white flex-1">Output {problem.id}</h2>
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-700 text-slate-300 font-semibold text-sm">
                      {problem.id}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{problem.title}</h3>
                  <p className="text-slate-400 text-sm mb-4">{problem.description}</p>
                  <Button className="w-full bg-slate-700 hover:bg-slate-600 text-white">View Solution →</Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-400">TEKNO UF - Technical Questions 2025 Cluster 1</p>
        </div>
      </div>
    </main>
  )
}
