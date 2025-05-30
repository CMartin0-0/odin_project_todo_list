import Project from './components/project.tsx';
import Todo from './components/todo.tsx';
import { useState } from 'react';
import  Forms  from './components/forms.tsx';
import { produce } from 'immer'
import './App.css';

function App(props) {
	const [projectsList, setProjectsList] = useState(props.projects);
    // the id of the project that is selected, either to which the new todo should be added to, or that should be deleted  (the one whos' 'add new todo' button, or 'delete project' button was clicked)
    const [projectId, setProjectId] = useState("");
    const [todoId, setTodoId] = useState("")
    const [projectFormHidden, setProjectFormHidden] = useState(true);
    const [todoFormHidden, setTodoFormHidden] = useState(true);

	
    
    
    function addToProjects(newProject) {
       const newProjectData = newProject;
       setProjectsList(produce(projectsList, draft => {
       
            draft.push(newProjectData)
        
       }))
    }

    function addTodoToProject(newTodo) {
        const newTodoData = newTodo;
        setProjectsList(produce(projectsList, draft => {
            // find the project in projects list that todo should be added to
            const projectSelected = draft.find((project) => project.id === projectId);
            projectSelected.todos.push(newTodoData)
        }))
    }

    function deleteTodoFromProject() {
        
        setProjectsList(produce(projectsList, draft => {

        }))
    }

    function handleProjectFormHidden(e) {
        e.preventDefault()
        setProjectFormHidden(!projectFormHidden)
    }

	const projects = projectsList.map((project) => (
		<Project
			id={project.id}
			name={project.name}
			description={project.description}
			key={project.id}
			setTodoFormHidden={setTodoFormHidden}
            setProjectId={setProjectId}
		>
            
            {// check if project has any todos to avoid rendering an empty todo anytime a new project is created.
            (project.todos)
            ? <div id={`${project.id}-todos`}>{project.todos.map((todo) => (
				<Todo
					id={todo.todoId}
					name={todo.todoName}
					description={todo.todoDescription}
					dueDate={todo.todoDueDate}
					notes={todo.todoNotes}
					key={todo.todoId}
                    setTodoId={setTodoId}
                    deleteTodo={deleteTodoFromProject}
					
				/>))}</div>
            : <div></div>
}
		</Project>
	));

	return (
		<>
			<div className='projects-container'>{projects}</div>
			<button
				id='show-project-form-btn'
				onClick={handleProjectFormHidden}
			>
				New Project
			</button>
			<Forms
				addToProjects={addToProjects}
                addTodoToProject={addTodoToProject}
				todoFormHidden={todoFormHidden}
				setTodoFormHidden={setTodoFormHidden}
				projectFormHidden={projectFormHidden}
				setProjectFormHidden={setProjectFormHidden}
				setProjectId={setProjectId}
			/>
		</>
	);
}

export default App;
