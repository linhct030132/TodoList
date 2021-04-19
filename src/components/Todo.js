import React, { memo, useState } from 'react'

const Todo = memo(props => {
    const {
        todo,
        markCompleted,
        getEditTodo,
        todoEditingId,
        editTodo,
        index,
        removeTodo
    } = props
    const isEditing = todoEditingId === todo.id
    const [text, setText] = useState(todo.text)
    const onEditTodo = () => {
        editTodo({
            ...todo,
            text
        }, index)
        getEditTodo('')
    }

    return (
        <li className={`${isEditing ? 'editing' : ''} ${todo.isCompleted ? 'completed' : ''}`}>
            {
                !isEditing ?
                    <div className="view">
                        <input
                            className="toggle"
                            type="checkbox"
                            checked={todo.isCompleted}
                            onChange={() => markCompleted(todo.id)}
                        />
                        <label onDoubleClick={() => getEditTodo(todo.id)}>{todo.text}</label>
                        <button className="destroy" onClick={() => removeTodo(todo.id)} />
                    </div> :
                    <input
                        className="edit"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onBlur={onEditTodo}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' && text) {
                                onEditTodo()
                            }
                        }}
                    />
            }
        </li>
    )
})

export default Todo