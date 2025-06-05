import { useState } from 'react';

export default function Forms(props) {

    const [newProject, setNewProject] = useState({id: `${crypto.randomUUID()}`, name: '', description: '', todos: [] });
    const [newTodo, setNewTodo] = useState({todoId: `${crypto.randomUUID()}`, todoName: '', todoDescription: '', todoDueDate: '', todoNotes: ''})

    function handleProjectSubmit(e) {
       e.preventDefault();

        if (newProject.name === '') {
            alert('Please enter all needed information for the new project');
            return;
        }
        // send info to create a new project, reset the new project data, and re-hide the new project form
        props.addToProjects(newProject)
        setNewProject({id: `${crypto.randomUUID()}`, name: '', description: '', todos: []})
        props.setProjectFormHidden(true);
        } 
        
      function handleTodoSubmit(e) {
        e.preventDefault();

        if (newTodo.todoName === '') {
            alert('Please enter all needed data for the new todo')
            return
            }

        if (props.todoId) {
            props.editTodo(newTodo)
            setNewTodo({todoId: `${crypto.randomUUID()}`, todoName: '', todoDescription: '', todoDueDate: '', todoNotes: ''})
            props.setTodoFormHidden(true);
            props.setTodoId('');
        } else {
        // same as above but for new todo
        props.addTodoToProject(newTodo)
        setNewTodo({todoId: `${crypto.randomUUID()}`, todoName: '', todoDescription: '', todoDueDate: '', todoNotes: ''})
        props.setTodoFormHidden(true);
        }
        }

    

    function handleChange(e) {

        // handle updating both new project and new todo data

        const eventTargetId = e.target.id;
        if (eventTargetId === 'new-todo-name') {
		setNewTodo({...newTodo, todoName: e.target.value});
	} else if (eventTargetId === 'new-todo-description') {
        setNewTodo({...newTodo, todoDescription: e.target.value})
    } else if (eventTargetId === 'new-todo-due-date') {
        setNewTodo({...newTodo, todoDueDate: e.target.value})
    } else if (eventTargetId === 'new-todo-notes') {
        setNewTodo({...newTodo, todoNotes: e.target.value})
    } else if (eventTargetId === 'new-project-name') {
        setNewProject({...newProject, name: e.target.value}) 
        console.log(newProject);
    } else if (eventTargetId === 'new-project-description') {
        setNewProject({...newProject, description: e.target.value})
    } else {
        alert('Something went wrong, everything is on fire')
        return
    }
    }

    function handleCancel(e) {
        e.preventDefault();
        const eventTarget = e.target.closest('form').id;

        if (eventTarget === 'add-project-form') {
            setNewProject({
				id: `${crypto.randomUUID()}`,
				name: '',
				description: '',
				todos: [{}],
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
				<button type='button' id='cancel-project-form' className='button' onClick={handleCancel}>
					Cancel
				</button>
			</form>
			<form
				id='add-todo-form'
				onSubmit={handleTodoSubmit}
				className={props.todoFormHidden ? 'hidden' : ''}
			>
				<label htmlFor='new-todo-name'>Todo Name</label>
				<input
					type='text'
					id='new-todo-name'
					className='input'
					value={newTodo.todoName}
					onChange={handleChange}
                    required
				/>
				<input
					type='text'
					id='new-todo-description'
					className='input'
					value={newTodo.todoDescription}
					onChange={handleChange}
				/>
				<input
					type='date'
					id='new-todo-due-date'
					className='input'
					value={newTodo.todoDueDate}
					onChange={handleChange}
				/>
				<input
					type='text'
					id='new-todo-notes'
					className='input'
					value={newTodo.todoNotes}
					onChange={handleChange}
				/>
				<button type='submit' id='add-todo' className='button'>
					Add Todo
				</button>
				<button type='button' id='cancel-todo-form' className='button' onClick={handleCancel}>
					Cancel
				</button>
			</form>
		</>
	);
}