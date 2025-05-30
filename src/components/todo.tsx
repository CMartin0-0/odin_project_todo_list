export default function Todo(props) {

    function handleDeleteTodo(e) {
        e.preventDefault();
        const todoToDeleteId = e.target.closest('div').id;
        props.setTodoId(todoToDeleteId);
        props.deleteTodo();

        
    }
    return (
        <div id={props.id} className="todo">
            <p className="todo-name">{props.name}</p>
            <p className="todo-description">{props.description}</p>
            <p className="todo-due-date">{props.dueDate}</p>
            <p className="todo-notes">{props.notes}</p>
            
            <button type="button" className="btn edit-todo">Edit Todo</button>
            <button type="button" className="btn delete-todo" onClick={handleDeleteTodo}>Delete Todo</button>
            
        </div>
    )
}