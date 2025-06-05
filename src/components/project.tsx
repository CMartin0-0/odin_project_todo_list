export default function Project(props) {

    function handleAddTodo(e) {
        e.preventDefault();
        const projectId = e.target.closest('div').id;
        props.setProjectId(projectId);
        props.setTodoFormHidden(false)
        
    }
    
    function handleToggle(e) {
        e.preventDefault();
        const projectId = e.target.closest('div').id
        
        props.setProjectId(projectId);
        props.handleToggleActiveProject(projectId)
    }
  
    return (
        <>
        
		<div id={props.id} className={`${props.isActive ? 'project active-project' : 'project p-hidden'}`} >
			<div className="project-pin"></div>
            <p className='project-name'>{props.name}</p>
			<p className='project-description'>{props.description}</p>
			
				<button type="button" className="btn add-todo-to-project" onClick={handleAddTodo}>
                 New Todo
                </button>
				<button type='button' className='btn delete-project'>
					Delete Project
				</button>
                <button type='button' className='btn show-hide-btn' onClick={handleToggle}>{`${props.isActive ? 'Hide Project' : 'Show Project'}`}</button>
            {props.children}
		</div>
        </>
	);
}