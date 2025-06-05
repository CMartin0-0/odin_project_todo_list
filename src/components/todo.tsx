export default function Todo(props) {

  

        
   
    return (
        <>
       
        <div id={props.id} className="todo"> 
            <div className="todo-pin"></div>
            <p className="todo-name-label">What Todo?</p>
            <p className="name-label">Todo</p>
            <p className="todo-name">{props.name}</p>
            <p className="description-label">What??</p>
            <p className="todo-description">{props.description}</p>
            <p className="due-date-label">When??</p>
            <p className="todo-due-date">{props.dueDate}</p>
            <p className='notes-label'>Notes</p>
            <p className="todo-notes">{props.notes}</p>
            {props.children}
        </div>
        </>
    )
}
  
export function Buttons(props) {
 function handleDeleteTodo(e) {
        e.preventDefault();
        const todoToDeleteId = e.target.closest('div').id;
       // props.setTodoId(todoId => todoToDeleteId - todoId);
        props.deleteTodo(todoToDeleteId); }

        function handleEditTodo(e) {
        e.preventDefault();
        const todoToEditId = e.target.closest('div').id;
        props.setTodoId(todoToEditId);
        props.setTodoFormHidden(false);}

    return  (
        <>
            <button type="button" className="btn edit-todo" onClick={handleEditTodo}>Edit</button>
            <button type="button" className="btn delete-todo" onClick={handleDeleteTodo}>Delete</button>
            </>
    )
}