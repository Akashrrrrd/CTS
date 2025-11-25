import Link from "next/link"
import { Button } from "@/components/ui/button"
import Problem1 from "@/components/problems/problem-1"
import Problem2 from "@/components/problems/problem-2"
import Problem3 from "@/components/problems/problem-3"
import Problem4 from "@/components/problems/problem-4"
import Problem5 from "@/components/problems/problem-5"
import Problem6 from "@/components/problems/problem-6"
import Problem7 from "@/components/problems/problem-7"

const problems = [
  { id: 1, title: "Image Showcase", component: Problem1 },
  { id: 2, title: "Responsive Navigation Bar", component: Problem2 },
  { id: 3, title: "Dynamic Photo Gallery", component: Problem3 },
  { id: 4, title: "Form Validation", component: Problem4 },
  { id: 5, title: "To-Do List Application", component: Problem5 },
  { id: 6, title: "Accordion Component", component: Problem6 },
  { id: 7, title: "Image Carousel", component: Problem7 },
]

export default async function ProblemPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const problemId = Number.parseInt(id)
  const problem = problems.find((p) => p.id === problemId)

  if (!problem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Problem Not Found</h1>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  const ProblemComponent = problem.component
  const prevId = problemId > 1 ? problemId - 1 : 7
  const nextId = problemId < 7 ? problemId + 1 : 1

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div>
            <Link href="/">
              <Button variant="ghost" className="text-slate-300 hover:text-white">
                ← Back to Home
              </Button>
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-white">
            Output {problemId}: {problem.title}
          </h1>
          <div />
        </div>
      </div>

      {/* Problem Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
          <div className="p-8">
            <ProblemComponent />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href={`/problem/${prevId}`}>
            <Button className="bg-slate-700 hover:bg-slate-600 text-white">← Previous Problem</Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700 bg-transparent">
              View All Problems
            </Button>
          </Link>
          <Link href={`/problem/${nextId}`}>
            <Button className="bg-slate-700 hover:bg-slate-600 text-white">Next Problem →</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
