import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const PROJECTDATA = [{
id: "project-1", name: "Example Project", description: "I am an example project, used to hold example todos", todos: [{todoId: "todo-1", todoName: "Example Todo", todoDescription: "I am an example todo", todoDueDate: "3000/01/01", todoNotes: "I contain notes about the todo"}]
}]


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App projects={PROJECTDATA} />
  </StrictMode>,
)
