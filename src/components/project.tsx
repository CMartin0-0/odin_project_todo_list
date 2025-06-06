/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
	JSX
} from 'react';
import React from 'react';
export default function Project(props: {
	setProjectId: (arg0: any) => void;
	setTodoFormHidden: (arg0: boolean) => void;
	handleToggleActiveProject: (arg0: any) => void;
	id: string | undefined;
	isActive: any;
	name: string;
	description: string;
	children: JSX.Element;
	deleteProject?: (projectId: any) => void;
}) {
	function handleAddTodo(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		const projectDiv = (e.target as HTMLElement).closest('div');
		const projectId = projectDiv ? projectDiv.id : undefined;
		props.setProjectId(projectId);
		props.setTodoFormHidden(false);
	}

	function handleToggle(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		const projectDiv = (e.target as HTMLElement).closest('div');
		const projectId = projectDiv ? projectDiv.id : undefined;
		props.setProjectId(projectId);
		props.handleToggleActiveProject(projectId);
	}

	function handleDeleteProject(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		const projectDiv = (e.target as HTMLElement).closest('div');
		const projectId = projectDiv ? projectDiv.id : undefined;
		props.setProjectId(projectId);
		if (props.deleteProject) {
			props.deleteProject(projectId);
		}
	}

	return (
		<>
			<div
				id={props.id}
				className={`${
					props.isActive
						? 'project active-project'
						: 'project p-hidden'
				}`}
			>
				<div className='project-pin'></div>
				<p className='project-name'>{props.name}</p>
				<p className='project-description'>{props.description}</p>

				<button
					type='button'
					className='btn add-todo-to-project'
					onClick={handleAddTodo}
				>
					New Todo
				</button>
				<button
					type='button'
					className='btn delete-project'
					onClick={handleDeleteProject}
				>
					Delete Project
				</button>
				<button
					type='button'
					className='btn show-hide-btn'
					onClick={handleToggle}
				>{`${
					props.isActive ? 'Hide Project' : 'Show Project'
				}`}</button>
				{props.children}
			</div>
		</>
	);
}
