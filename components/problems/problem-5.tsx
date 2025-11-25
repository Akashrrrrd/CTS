"use client"

import type React from "react"
import { useState } from "react"
import { CodeViewer } from "@/components/ui/code-viewer"

const HTML_CODE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To-Do List</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <form id="taskForm">
        <input type="text" id="taskInput" placeholder="Enter new task" required>
        <button type="submit">Add Task</button>
    </form>
    <ul id="taskList"></ul>
    <script src="script.js"><\/script>
</body>
</html>`

const CSS_CODE = `body {
    font-family: Arial, sans-serif;
}
form {
    margin-bottom: 20px;
}
ul {
    list-style: none;
    padding: 0;
}
li {
    padding: 10px;
    background-color: #f4f4f4;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
li.completed {
    text-decoration: line-through;
}
button {
    background-color: #333;
    color: white;
    border: none;
    cursor: pointer;
    padding: 5px;
}`

const JS_CODE = `document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const taskText = document.getElementById('taskInput').value;
    addTask(taskText);
    document.getElementById('taskInput').value = '';
});
function addTask(taskText) {
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.innerText = taskText;
    const completeBtn = document.createElement('button');
    completeBtn.innerText = 'Complete';
    completeBtn.addEventListener('click', function() {
        li.classList.toggle('completed');
    });
    const removeBtn = document.createElement('button');
    removeBtn.innerText = 'Remove';
    removeBtn.addEventListener('click', function() {
        taskList.removeChild(li);
    });
    li.appendChild(completeBtn);
    li.appendChild(removeBtn);
    taskList.appendChild(li);
}`

interface Task {
  id: number
  text: string
  completed: boolean
}

export default function Problem5() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [input, setInput] = useState("")
  const [nextId, setNextId] = useState(1)

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      setTasks([...tasks, { id: nextId, text: input, completed: false }])
      setNextId(nextId + 1)
      setInput("")
    }
  }

  const toggleComplete = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const removeTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-2">To-Do List</h2>
        <p className="text-slate-400 mb-6">Add tasks, mark them complete, and remove them</p>
      </div>

      <form onSubmit={handleAddTask} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter new task"
          className="flex-1 px-4 py-2 rounded bg-slate-700 text-white placeholder-slate-500 border border-slate-600 focus:border-blue-500 focus:outline-none"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition"
        >
          Add Task
        </button>
      </form>

      <div className="space-y-2">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-4 bg-slate-700/50 border border-slate-600 rounded hover:bg-slate-700/70 transition"
            >
              <div className="flex items-center gap-3 flex-1">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                  className="w-5 h-5 rounded cursor-pointer accent-blue-500"
                />
                <span className={`${task.completed ? "line-through text-slate-500" : "text-white"}`}>{task.text}</span>
              </div>
              <button
                onClick={() => removeTask(task.id)}
                className="px-3 py-1 bg-red-600/20 hover:bg-red-600/40 text-red-300 rounded transition text-sm"
              >
                Remove
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-slate-400">
            <p>No tasks yet. Add one to get started!</p>
          </div>
        )}
      </div>

      <div className="bg-slate-700/30 border border-slate-600 rounded-lg p-4">
        <p className="text-slate-300 text-sm">
          <strong>Features:</strong> Add new tasks using the form. Check the checkbox to mark tasks as complete (shown
          with strikethrough). Click Remove to delete tasks from the list.
        </p>
      </div>

      <div className="border-t border-slate-700 pt-6">
        <h2 className="text-xl font-semibold text-white mb-4">Source Code</h2>
        <CodeViewer html={HTML_CODE} css={CSS_CODE} js={JS_CODE} />
      </div>
    </div>
  )
}
