import React, { useEffect, useRef } from "react"

const TodoItem = ({id, todos, setTodos}) =>{

    const todoItemRef = useRef(null)

    useEffect(()=>{
        console.log(todoItemRef.current.clientHeight)
        // setTimeout(()=>{
        //     todoItemRef.current.clientHeight = 100
        // })
    })

    return(

        <div className="todoItem" ref = {todoItemRef} onClick={()=>{
            setTodos(pervstate => {
                return pervstate.map((e,i)=> i === id ? {id:id, text:e.text, complete:!e.complete} : e)
            })
        }}>
            <input className="todoActiveInput" type={'checkbox'} checked = {todos[id].complete} readOnly/>
            <p className = {`todoText ${todos[id].complete === true ? 'todoComplete' : ''}`}>{todos[id].text}</p>
        </div>
    )
}

export default TodoItem