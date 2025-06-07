/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
    JSX,
} from 'react';

import React from 'react';
export default function Todo(props: {
	id: string | undefined;
	name:
		| string
	description:
		| string
	dueDate:
		| string
	notes:
		| string
	children:
		| JSX.Element
}) {
	return (
		<>
			<div id={props.id} className='todo'>
				<div className='todo-pin'></div>
				<p className='todo-name-label'>What Todo</p>
				<p className='name-label'>Todo</p>
				<p className='todo-name'>{props.name}</p>
				<p className='description-label'>What??</p>
				<p className='todo-description'>{props.description}</p>
				<p className='due-date-label'>When??</p>
				<p className='todo-due-date'>{props.dueDate}</p>
				<p className='notes-label'>Notes</p>
				<p className='todo-notes'>{props.notes}</p>
				{props.children}
			</div>
		</>
	);
}

export function Buttons(props: {
	deleteTodo: (arg0: any) => void;
	setTodoId: (arg0: any) => void;
	setTodoFormHidden: (arg0: boolean) => void;
}) {
	function handleDeleteTodo(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		const div = (e.target as HTMLElement).closest('div');
		const todoToDeleteId = div ? div.id : undefined;
		props.deleteTodo(todoToDeleteId);
	}

	function handleEditTodo(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		const div = (e.target as HTMLElement).closest('div');
		const todoToEditId = div ? div.id : undefined;
		props.setTodoId(todoToEditId);
		props.setTodoFormHidden(false);
	}

	return (
		<>
			<button
				type='button'
				className='btn edit-todo'
				onClick={handleEditTodo}
			>
				Edit
			</button>
			<button
				type='button'
				className='btn delete-todo'
				onClick={handleDeleteTodo}
			>
				Delete
			</button>
		</>
	);
}
