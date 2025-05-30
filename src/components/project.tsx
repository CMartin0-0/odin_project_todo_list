export default function Project(props) {

    function handleAddTodo(e) {
        e.preventDefault();
        const projectId = e.target.closest('div').id
        props.setProjectId(projectId);
        props.setTodoFormHidden(false)
        
    }
        
  
    return (
        <>
		<div id={props.id} className='project'>
			<p className='project-name'>{props.name}</p>
			<p className='project-description'>{props.description}</p>
			
				<button type="button" className="btn add-todo-to-project" onClick={handleAddTodo}>
                    Add New Todo
                </button>
				<button type='button' className='btn delete-project'>
					Delete Project
				</button>
			
            {props.children}
		</div>
        </>
	);
}