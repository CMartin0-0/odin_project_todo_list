/* eslint-disable @typescript-eslint/no-explicit-any */
import Project from './components/project.tsx';
import Todo from './components/todo.tsx';
import { Buttons } from './components/todo.tsx';
import { useState, useEffect } from 'react';
import Forms from './components/forms.tsx';
import { produce } from 'immer';
import './App.css';

interface TodoType {
	todoId: string;
	todoName: string;
	todoDescription: string;
	todoDueDate: string;
	todoNotes: string;
}

interface ProjectType {
	id: string;
	name: string;
	description: string;
	todos: TodoType[];
}

interface Props {
	projects: ProjectType[];
}

function App(props: Props) {
	const [projectsList, setProjectsList] = useState(
		!localStorage.getItem('projectsList')
			? props.projects
			: JSON.parse(localStorage.getItem('projectsList') || '[]')
	);
	// the id of the project that is selected, either to which the new todo should be added to, or that should be deleted  (the one whos' 'add new todo' button, or 'delete project' button was clicked)
	const [projectId, setProjectId] = useState(props.projects[0]?.id || '');
	const [todoId, setTodoId] = useState('');
	const [projectFormHidden, setProjectFormHidden] = useState(true);
	const [todoFormHidden, setTodoFormHidden] = useState(true);
	const [activeProjectState, setActiveProjectState] = useState(
		!localStorage.getItem('activeProjectState')
			? []
			: JSON.parse(localStorage.getItem('activeProjectState') || '[]')
	);

	function addToProjects(newProject: any) {
		const newProjectData = newProject;
		console.log(newProjectData);
		setProjectsList(
			produce(projectsList, (draft: any[]) => {
				draft.push(newProjectData);
			})
		);
	}

    function deleteProject(projectId: any) {
        const projectIndex = activeProjectState.findIndex(
            (project: { id: any }) => project.id === projectId)
            
        setActiveProjectState(
            produce(activeProjectState, (draft: any[]) => {
                draft.splice(projectIndex, 1);
            })
        );
    }
	function addTodoToProject(newTodo: any) {
		const newTodoData = newTodo;
		let projectSelected = projectsList.find(
			(project: { id: string }) => project.id === projectId
		);
		if (projectSelected) {
			setProjectsList(
				produce(projectsList, (draft: any[]) => {
					// find the project in projects list that todo should be added to
					projectSelected = draft.find(
						(project: { id: string }) => project.id === projectId
					);
					projectSelected.todos.push(newTodoData);
				})
			);
		} else {
			setActiveProjectState(
				produce(activeProjectState, (draft: { todos: any[] }[]) => {
					draft[0].todos.push(newTodoData);
				})
			);
		}
	}

	function deleteTodoFromProject(todoToDeleteId: any) {
		let todoIndex;
		for (let j = 0; j < projectsList.length; j++) {
			for (let i = 0; i < projectsList[j].todos.length; i++) {
				setProjectsList(
					produce(projectsList, (draft: { todos: any[] }[]) => {
						todoIndex = draft[j].todos.findIndex(
							(todo: { todoId: any }) =>
								todo.todoId === todoToDeleteId
						);
						draft[j].todos.splice(todoIndex, 1);
					})
				);
			}
		}
		if (!todoIndex) {
			setActiveProjectState(
				produce(activeProjectState, (draft: { todos: any[] }[]) => {
					todoIndex = draft[0].todos.findIndex(
						(todo: { todoId: any }) =>
							todo.todoId === todoToDeleteId
					);
					draft[0].todos.splice(todoIndex, 1);
				})
			);
		}
	}

	function editTodo(todoData: any) {
		const updatedTodoData = todoData;
		setActiveProjectState(
			produce(activeProjectState, (draft: { todos: any[] }[]) => {
				const todoIndex = draft[0].todos.findIndex(
					(todo: { todoId: string }) => todo.todoId === todoId
				);
				draft[0].todos.splice(todoIndex, 1, updatedTodoData);
			})
		);
		setTodoId('');
		setTodoFormHidden(true);
	}

	function handleProjectFormHidden(e: { preventDefault: () => void }) {
		e.preventDefault();
		setProjectFormHidden(!projectFormHidden);
	}

	function handleToggleActiveProject(projectId: any) {
		const projectIndex = projectsList.findIndex(
			(project: { id: any }) => project.id === projectId
		);
		const projectTransferHolder: any[] = [];
		projectTransferHolder.push(projectsList[projectIndex]);
		console.log(projectTransferHolder);

		if (projectTransferHolder[0] === undefined) {
			setProjectsList(
				produce(projectsList, (draft: any[]) => {
					draft.push(activeProjectState[0]);
				})
			);

			setActiveProjectState(
				produce(activeProjectState, (draft: void[]) => {
					draft.shift();
				})
			);
		} else if (!activeProjectState[0]) {
			setActiveProjectState(
				produce(activeProjectState, (draft: any[]) => {
					draft.push(projectTransferHolder[0]);
				})
			);

			setProjectsList(
				produce(projectsList, (draft: any[]) => {
					draft.splice(projectIndex, 1);
				})
			);
		} else {
			setProjectsList(
				produce(projectsList, (draft: any[]) => {
					draft.push(activeProjectState[0]);
					draft.splice(projectIndex, 1);
				})
			);

			setActiveProjectState(
				produce(activeProjectState, (draft: any[]) => {
					draft.shift();
					draft.push(projectTransferHolder[0]);
				})
			);
		}
	}

	const projects = projectsList.map(
		(project: { id: any; name: any; description: any; todos: any[] }) => (
			<Project
				id={project.id}
				name={project.name}
				description={project.description}
				key={`${crypto.randomUUID()}`}
				setTodoFormHidden={setTodoFormHidden}
				setProjectId={setProjectId}
				handleToggleActiveProject={handleToggleActiveProject}
				isActive={false}
			>
				{
					// check if project has any todos to avoid rendering an empty todo anytime a new project is created.
					project.todos ? (
						<div id={`${project.id}-todos`} className='todos'>
							{project.todos.map(
								(todo: {
									todoId: any;
									todoName: any;
									todoDescription: any;
									todoDueDate: any;
									todoNotes: any;
								}) => (
									<Todo
										id={todo.todoId}
										name={todo.todoName}
										description={todo.todoDescription}
										dueDate={todo.todoDueDate}
										notes={todo.todoNotes}
										key={todo.todoId}
										children={
											<Buttons
												deleteTodo={
													deleteTodoFromProject
												}
												setTodoId={setTodoId}
												setTodoFormHidden={
													setTodoFormHidden
												}
											/>
										}
									/>
								)
							)}
						</div>
					) : (
						<div></div>
					)
				}
			</Project>
		)
	);

	const activeProject = activeProjectState.map(
		(project: { id: any; name: any; description: any; todos: any[] }) => (
			<Project
				id={project.id}
				name={project.name}
				description={project.description}
				key={project.id}
				setTodoFormHidden={setTodoFormHidden}
				setProjectId={setProjectId}
				handleToggleActiveProject={handleToggleActiveProject}
				isActive={true}
                deleteProject={deleteProject}
			>
				{
					// check if project has any todos to avoid rendering an empty todo anytime a new project is created.
					project.todos ? (
						<div id={`${project.id}-todos`} className='todos'>
							{project.todos.map(
								(todo: {
									todoId: any;
									todoName: any;
									todoDescription: any;
									todoDueDate: any;
									todoNotes: any;
								}) => (
									<Todo
										id={todo.todoId}
										name={todo.todoName}
										description={todo.todoDescription}
										dueDate={todo.todoDueDate}
										notes={todo.todoNotes}
										key={todo.todoId}
										children={
											<Buttons
												deleteTodo={
													deleteTodoFromProject
												}
												setTodoFormHidden={
													setTodoFormHidden
												}
												setTodoId={setTodoId}
											/>
										}
									/>
								)
							)}
						</div>
					) : (
						<div></div>
					)
				}
			</Project>
		)
	);

	useEffect(() => {
		localStorage.setItem('projectsList', JSON.stringify(projectsList));
		localStorage.setItem(
			'activeProjectState',
			JSON.stringify(activeProjectState)
		);
	}, [projectsList, activeProjectState]);

	console.log(projectsList);
	console.log(activeProjectState);

	return (
		<>
			<p className='projects-label'>Todo: Create Todos</p>
            <p className='description'>Create projects and add todos to them, that way you can group todos how ever you like and have completely seperate todo lists!</p>
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
				setTodoId={setTodoId}
				todoId={todoId}
				editTodo={editTodo}
			/>
		</>
	);
}

export default App;
