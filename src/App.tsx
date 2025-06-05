import Project from './components/project.tsx';
import Todo from './components/todo.tsx';
import { Buttons } from './components/todo.tsx';
import { useState } from 'react';
import Forms from './components/forms.tsx';
import { produce } from 'immer';
import './App.css';

function App(props) {
	const [projectsList, setProjectsList] = useState(props.projects);
	// the id of the project that is selected, either to which the new todo should be added to, or that should be deleted  (the one whos' 'add new todo' button, or 'delete project' button was clicked)
	const [projectId, setProjectId] = useState(props.projects.id);
	const [todoId, setTodoId] = useState('');
	const [projectFormHidden, setProjectFormHidden] = useState(true);
	const [todoFormHidden, setTodoFormHidden] = useState(true);
	const [activeProjectState, setActiveProjectState] = useState([]);
    
	function addToProjects(newProject) {
		const newProjectData = newProject;
		console.log(newProjectData);
		setProjectsList(
			produce(projectsList, (draft) => {
				draft.push(newProjectData);
			})
		);
	}

	function addTodoToProject(newTodo) {
		const newTodoData = newTodo;
        let projectSelected = projectsList.find((project) => project.id === projectId)
        if (projectSelected) {
		setProjectsList(
			produce(projectsList, (draft) => {
				// find the project in projects list that todo should be added to
				 projectSelected = draft.find(
					(project) => project.id === projectId
				);
				projectSelected.todos.push(newTodoData);
			})
		);} else {
            setActiveProjectState(produce(activeProjectState, draft => {
                draft[0].todos.push(newTodoData)
            }))
        }
	}

	function deleteTodoFromProject(todoToDeleteId) {
        let todoIndex;
		for (let j = 0; j < projectsList.length; j++) {
			for (let i = 0; i < projectsList[j].todos.length; i++) {
				
                
                setProjectsList(
					produce(projectsList, (draft) => {
						todoIndex = draft[j].todos.findIndex(
							(todo) => todo.todoId === todoToDeleteId
						);
						draft[j].todos.splice(todoIndex, 1);
					})
				)
               
			}
		} 
        if (!todoIndex) {
                    setActiveProjectState(produce(activeProjectState, (draft) => {
                        todoIndex = draft[0].todos.findIndex(
                            (todo) => todo.todoId === todoToDeleteId);
                        draft[0].todos.splice(todoIndex, 1);
                    }))
                };
	}

    function editTodo(todoData) {
        const updatedTodoData = todoData;
        setActiveProjectState(
            produce(activeProjectState, (draft) => {
                const todoIndex = draft[0].todos.findIndex(
                    (todo) => todo.todoId === todoId);
                    draft[0].todos.splice(todoIndex, 1, updatedTodoData);
            })
        )
        setTodoId('');
        setTodoFormHidden(true);
    }

	function handleProjectFormHidden(e) {
		e.preventDefault();
		setProjectFormHidden(!projectFormHidden);
	}

	function handleToggleActiveProject(projectId) {
		let projectIndex = projectsList.findIndex(
			(project) => project.id === projectId
		);
		const projectTransferHolder = [];
		projectTransferHolder.push(projectsList[projectIndex]);
		console.log(projectTransferHolder);

		if (projectTransferHolder[0] === undefined) {
			setProjectsList(
				produce(projectsList, (draft) => {
					draft.push(activeProjectState[0]);
				})
			);

			setActiveProjectState(
				produce(activeProjectState, (draft) => {
					draft.shift();
				})
			);
		} else if (!activeProjectState[0]) {
			setActiveProjectState(
				produce(activeProjectState, (draft) => {
					draft.push(projectTransferHolder[0]);
				})
			);

			setProjectsList(
				produce(projectsList, (draft) => {
					draft.splice(projectIndex, 1);
				})
			);
		} else {
			setProjectsList(
				produce(projectsList, (draft) => {
					draft.push(activeProjectState[0]);
					draft.splice(projectIndex, 1);
				})
			);

			setActiveProjectState(
				produce(activeProjectState, (draft) => {
					draft.shift();
					draft.push(projectTransferHolder[0]);
				})
			);
		}
	}

	const projects = projectsList.map((project) => (
		<Project
			id={project.id}
			name={project.name}
			description={project.description}
			key={`${crypto.randomUUID()}`}
			setTodoFormHidden={setTodoFormHidden}
			setProjectId={setProjectId}
			projectId={projectId}
			handleToggleActiveProject={handleToggleActiveProject}
            isActive={false}
		>
			{
				// check if project has any todos to avoid rendering an empty todo anytime a new project is created.
				project.todos ? (
					<div id={`${project.id}-todos`} className="todos">
						{project.todos.map((todo) => (
							<Todo
								id={todo.todoId}
								name={todo.todoName}
								description={todo.todoDescription}
								dueDate={todo.todoDueDate}
								notes={todo.todoNotes}
								key={todo.todoId}
								setTodoId={setTodoId}
								todoId={todoId}
                                setTodoFormHidden={setTodoFormHidden}
								children={
									<Buttons
										deleteTodo={deleteTodoFromProject}
									/>
								}
							/>
						))}
					</div>
				) : (
					<div></div>
				)
			}
		</Project>
	));

	const activeProject = activeProjectState.map((project) => (
		<Project
			id={project.id}
			name={project.name}
			description={project.description}
			key={project.id}
			setTodoFormHidden={setTodoFormHidden}
			setProjectId={setProjectId}
			projectId={projectId}
			handleToggleActiveProject={handleToggleActiveProject}
            todoId={todoId}
            setTodoId={setTodoId}
            isActive={true}
		>
			{
				// check if project has any todos to avoid rendering an empty todo anytime a new project is created.
				project.todos ? (
					<div id={`${project.id}-todos`} className="todos">
						{project.todos.map((todo) => (
							<Todo
								id={todo.todoId}
								name={todo.todoName}
								description={todo.todoDescription}
								dueDate={todo.todoDueDate}
								notes={todo.todoNotes}
								key={todo.todoId}
								children={
									<Buttons
										deleteTodo={deleteTodoFromProject}
                                        setTodoFormHidden={setTodoFormHidden}
                                        setTodoId={setTodoId}
                                        todoId={todoId}
									/>
								}
							/>
						))}
					</div>
				) : (
					<div></div>
				)
			}
		</Project>
	));

	return (
		<>
            <p className="projects-label">Projects</p>
			<div className='projects-container'>{projects}</div>
			<button
				id='show-project-form-btn'
				onClick={handleProjectFormHidden}
			>
				New Project
			</button>
			<div id='active-project-container'>{activeProject}</div>
			<Forms
				addToProjects={addToProjects}
				addTodoToProject={addTodoToProject}
				todoFormHidden={todoFormHidden}
				setTodoFormHidden={setTodoFormHidden}
				projectFormHidden={projectFormHidden}
				setProjectFormHidden={setProjectFormHidden}
				setProjectId={setProjectId}
                setTodoId={setTodoId}
                todoId={todoId}
                editTodo={editTodo}
			/>
		</>
	);
}

export default App;
