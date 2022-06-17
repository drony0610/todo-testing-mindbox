import { useState } from 'react';
import './App.css';
import TodoContainer from './components/todo-container/todo-container';

function App() {

  //Placeholder дата. Далее эта дата может заполняться через useEffect(fetch) и грузить данные с сервера
  const data =[
    {
        id:0,
        text: "Дело 1",
        complete : false
    },
    {
        id:1,
        text: "Дело 2",
        complete : false
    },
    {
        id:2,
        text: "Дело 3",
        complete : false
    },
]

//Список тудушек
const [todos, setTodos] = useState(data)

  return (
    <div className="App">
         <h1>Todos</h1> 
        <TodoContainer todos = {todos} setTodos = {setTodos}></TodoContainer>
    </div>
  );
}

export default App;
