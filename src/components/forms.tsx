/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

export default function Forms(props: {
	addToProjects: (arg0: {
		id: string;
		name: string;
		description: string;
		todos: never[];
	}) => void;
	setProjectFormHidden: (arg0: boolean) => void;
	todoId: any;
	editTodo: (arg0: {
		todoId: string;
		todoName: string;
		todoDescription: string;
		todoDueDate: string;
		todoNotes: string;
	}) => void;
	setTodoFormHidden: (arg0: boolean) => void;
	setTodoId: (arg0: string) => void;
	addTodoToProject: (arg0: {
		todoId: string;
		todoName: string;
		todoDescription: string;
		todoDueDate: string;
		todoNotes: string;
	}) => void;
	projectFormHidden: any;
	todoFormHidden: any;
}) {
	const [newProject, setNewProject] = useState({
		id: `${crypto.randomUUID()}`,
		name: '',
		description: '',
		todos: [],
	});
	const [newTodo, setNewTodo] = useState({
		todoId: `${crypto.randomUUID()}`,
		todoName: '',
		todoDescription: '',
		todoDueDate: '',
		todoNotes: '',
	});

	function handleProjectSubmit(e: { preventDefault: () => void }) {
		e.preventDefault();

		if (newProject.name === '') {
			alert('Please enter all needed information for the new project');
			return;
		}
		// send info to create a new project, reset the new project data, and re-hide the new project form
		props.addToProjects(newProject);
		setNewProject({
			id: `${crypto.randomUUID()}`,
			name: '',
			description: '',
			todos: [],
		});
		props.setProjectFormHidden(true);
	}

	function handleTodoSubmit(e: { preventDefault: () => void }) {
		e.preventDefault();

		if (newTodo.todoName === '' && !props.todoId) {
			alert('Please enter all needed data for the new todo');
			return;
		}

		if (props.todoId) {
			props.editTodo(newTodo);
			setNewTodo({
				todoId: `${crypto.randomUUID()}`,
				todoName: '',
				todoDescription: '',
				todoDueDate: '',
				todoNotes: '',
			});
			props.setTodoFormHidden(true);
			props.setTodoId('');
		} else {
			// same as above but for new todo
			props.addTodoToProject(newTodo);
			setNewTodo({
				todoId: `${crypto.randomUUID()}`,
				todoName: '',
				todoDescription: '',
				todoDueDate: '',
				todoNotes: '',
			});
			props.setTodoFormHidden(true);
		}
	}

	function handleChange(e: { target: { id: any; value: any } }) {
		// handle updating both new project and new todo data

		const eventTargetId = e.target.id;

		if (eventTargetId === 'new-todo-name') {
			setNewTodo({ ...newTodo, todoName: e.target.value });
		} else if (eventTargetId === 'new-todo-description') {
			setNewTodo({ ...newTodo, todoDescription: e.target.value });
		} else if (eventTargetId === 'new-todo-due-date') {
			setNewTodo({ ...newTodo, todoDueDate: e.target.value });
		} else if (eventTargetId === 'new-todo-notes') {
			setNewTodo({ ...newTodo, todoNotes: e.target.value });
		} else if (eventTargetId === 'new-project-name') {
			setNewProject({ ...newProject, name: e.target.value });
			console.log(newProject);
		} else if (eventTargetId === 'new-project-description') {
			setNewProject({ ...newProject, description: e.target.value });
		} else {
			alert('Something went wrong, everything is on fire');
			return;
		}
	}

	function handleCancel(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		const formElement = (e.target as HTMLElement).closest('form');
		const eventTarget = formElement ? formElement.id : '';

		if (eventTarget === 'add-project-form') {
			setNewProject({
				id: `${crypto.randomUUID()}`,
				name: '',
				description: '',
				todos: [],
			});
			props.setProjectFormHidden(true);
		} else if (eventTarget === 'add-todo-form') {
			setNewTodo({
				todoId: `${crypto.randomUUID()}`,
				todoName: '',
				todoDescription: '',
				todoDueDate: '',
				todoNotes: '',
			});
			props.setTodoId('');
			props.setTodoFormHidden(true);
		}
	}

	return (
		<>
			<form
				id='add-project-form'
				onSubmit={handleProjectSubmit}
				className={props.projectFormHidden ? 'hidden' : ' '}
			>
				<label htmlFor='new-project-name'>Project Name</label>
				<input
					type='text'
					id='new-project-name'
					className='input'
					value={newProject.name}
					onChange={handleChange}
					required
				/>
				<input
					type='text'
					id='new-project-description'
					className='input'
					value={newProject.description}
					onChange={handleChange}
				/>
				<button type='submit' id='add-project' className='button'>
					Add Project
				</button>
				<button
					type='button'
					id='cancel-project-form'
					className='button'
					onClick={handleCancel}
				>
					Cancel
				</button>
			</form>
			<form
				id='add-todo-form'
				onSubmit={handleTodoSubmit}
				className={props.todoFormHidden ? 'hidden' : ''}
			>
				<label htmlFor='new-todo-name' className='todo-form-name-label'>
					Todo Name
				</label>
				<input
					type='text'
					id='new-todo-name'
					className='input'
					value={newTodo.todoName}
					onChange={handleChange}
					required
				/>
				<label
					htmlFor='new-todo-description'
					className='todo-form-description-label'
				>
					Todo Description
				</label>
				<input
					type='text'
					id='new-todo-description'
					className='input'
					value={newTodo.todoDescription}
					onChange={handleChange}
				/>
				<label
					htmlFor='new-todo-due-date'
					className='todo-form-due-date-label'
				>
					Todo Due Date
				</label>
				<input
					type='date'
					id='new-todo-due-date'
					className='input'
					value={newTodo.todoDueDate}
					onChange={handleChange}
				/>
				<label
					htmlFor='new-todo-notes'
					className='todo-form-notes-label'
				>
					Todo Notes
				</label>
				<input
					type='text'
					id='new-todo-notes'
					className='input'
					value={newTodo.todoNotes}
					onChange={handleChange}
				/>
				<button type='submit' id='add-todo' className='button'>
					{!props.todoId ? 'Add Todo' : 'Update Todo'}
				</button>
				<button
					type='button'
					id='cancel-todo-form'
					className='button'
					onClick={handleCancel}
				>
					Cancel
				</button>
			</form>
			<div className={props.todoFormHidden ? 'hidden' : 'overlay'}></div>
			<div
				className={props.projectFormHidden ? 'hidden' : 'overlay'}
			></div>
		</>
	);
}
