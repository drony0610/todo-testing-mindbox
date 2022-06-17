import React, {useEffect, useRef, useState } from 'react'
import TodoItem from '../todo-item/todo-item'

const TodoContainer = ({todos,setTodos}) =>{
    // состояния
    // фильтрованный список (для фильтров)
    const [filtered, setFiltered] = useState([])
    // для поля, которое показывает оставшиеся (не отмеченные) todo. Чтобы не показывать цифру при фильтрации
    const [showItemCount, setShowItemCount] = useState(true)

    //Реф для инпута
    const todoTextRef = useRef()

    //Заполнение фильтрованного(основного) массива для рендера
    useEffect(()=>{
        setFiltered(todos)
    },[todos])
  
    //Обработчик для подсчета не активных todo из всего списка
    const incompleteCountHandler = ()=>{
        const arr = todos.filter((e) => {
            if(!e.complete){
                return e
            }
        })
        return arr.length
    }
    
    //Обработчик для фильтации массива. Статус прокидывается из поля value у radio buttons
    const sortingHandler = (status) =>{
            if(status === 'all'){
              setFiltered(()=>todos)
            }
            else{
               let copiedArr = [...todos].filter(element => {
                console.log(element.complete === JSON.parse(status))
                return element.complete === JSON.parse(status)
                })
               setFiltered(()=>copiedArr)
            }
    }

    
    return(
        <div className='todoContainer'>
            <form className='todoInput' onSubmit={(e)=>{
                // Для очистки инпутов на форме
                e.preventDefault()
                e.target.reset()
                }}>
                <input ref={todoTextRef} onChange ={(e)=>todoTextRef.current = e.target.value} placeholder='what need to be done'/>
                <button type='submit' onClick={()=>{
                    //проверяем, что инпут заполнен
                    if(todoTextRef.current.length !== 0){
                        const newItem = {
                            id:todos.length,
                            text:todoTextRef.current,
                            complete:false,
                        }
                        setTodos(pervstate => pervstate.concat(newItem))
                        todoTextRef.current = ''
                    }
                }}>+</button>
            </form>
            
           {/* Рендер todo айтемов */}
           <div className='todoItemsContainer'>
            {
                     filtered.map((e,j)=>(<TodoItem
                     key={e.id}
                     id ={e.id} 
                     todos= {todos}
                     setTodos= {setTodos}
                     ></TodoItem>))
            }
            </div>

            {/* Нижняя панель списка */}
             <div className='todoBottom'>
                {/* Счетчик неаотмеченных айтемов */}
                <p>{showItemCount ? incompleteCountHandler() : '...'} items left</p>

                {/* Кнопки сортировки */}
                <div className='sortingContaner' onClick={(e)=>{
                       if(e.target.value){
                            sortingHandler(e.target.value)
                            e.target.value === 'all' ? setShowItemCount(true) : setShowItemCount(false)
                       }
                }}>
                    <label className = 'sortingItem'>
                        <input type={'radio'} name = {'sorting'} defaultChecked = {true}  value = 'all' className='sortingItemInput'/>
                        <p>All</p>
                    </label>
                    
                    <label className = 'sortingItem'>
                        <input type={'radio'} name = {'sorting'}  value = 'false' className='sortingItemInput'/>
                        <p>Active</p>
                    </label>

                    <label className = 'sortingItem'>
                        <input type={'radio'} name = {'sorting'} value = 'true' className='sortingItemInput'/>
                        <p>Completed</p>
                    </label>
                </div>

                {/* Отчистка отмеченных */}
                <p className='clearComplete' onClick={()=>{
                    const clearedArr = [...todos].filter(element => element.complete === false)
                    const idCorrection = clearedArr.map((e,i) => ({...e, id:i}))
                    setTodos(idCorrection)
                    setFiltered(idCorrection)
                }}>clear completed</p>
            </div>
        </div>
    )
}

export default TodoContainer
