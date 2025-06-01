export default function Todo(props) {

  

        
   
    return (
        <div id={props.id} className="todo">
            <p className="todo-name">{props.name}</p>
            <p className="todo-description">{props.description}</p>
            <p className="todo-due-date">{props.dueDate}</p>
            <p className="todo-notes">{props.notes}</p>
            {props.children}
            
            
        </div>
    )
}
  
export function Buttons(props) {
 function handleDeleteTodo(e) {
        e.preventDefault();
        const todoToDeleteId = e.target.closest('div').id;
       // props.setTodoId(todoId => todoToDeleteId - todoId);
        props.deleteTodo(todoToDeleteId); }

    return  (
        <>
            <button type="button" className="btn edit-todo">Edit Todo</button>
            <button type="button" className="btn delete-todo" onClick={handleDeleteTodo}>Delete Todo</button>
            </>
    )
}