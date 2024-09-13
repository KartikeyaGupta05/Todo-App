import { useState , useEffect} from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

function App() {

  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    } 
  }, [])
  

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  
  const toggleFinished = (params) => {
    setshowFinished(!showFinished)
  }
  

  const handleAdd = ()=>{
    settodos([...todos, {id: uuidv4(), todo, isCompleted : false}])
    settodo("")
    saveToLS()
  }

  const handleEdit = (e, id)=>{
    let t = todos.filter(i=>i.id === id)
    settodo(t[0].todo)
    let newTodos =todos.filter(item=>{
      return item.id!== id
    })
    settodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id)=>{
    let newTodos =todos.filter(item=>{
      return item.id!== id
    })
    settodos(newTodos)
    saveToLS()
  }


  const handleCheckbox = (e)=>{
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    settodos(newTodos)
    saveToLS()
  }
  
  const handleChange = (e)=>{
    settodo(e.target.value)
  }

  return (
    <>
      <Navbar />
      <div className="mx-3 lg:container lg:mx-auto my-5 rounded-xl p-5 bg-violet-200 min-h-[80vh] lg:w-[35%]">
        <h1 className='font-bold text-center text-3xl'>iTask - Manage your todos at one place</h1>
         <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-2xl font-bold'>Add a Todo</h2>
          <div className="flex">

          <input  onChange={handleChange} placeholder='Enter your Todo' value={todo} type="text" className='w-full rounded-full px-5 py-1' />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-violet-800 mx-2 rounded-full hover:bg-violet-950 disabled:bg-violet-600 p-4 py-2 text-sm font-bold text-white'>Save</button>
          </div>
          </div>

        <input className='my-4 font-bold' onChange={toggleFinished} type="checkbox" checked={showFinished} name="" id="" /> Show Finished
      <h2 className="text-lg font-bold">Yours Todo</h2>
      <div className="todos">
        {todos.length === 0 && <div className='text-xl font-bold text-violet-950 m-5 '> No Todo to Display</div>}
        {todos.map (item=>{
          return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex w-full justify-between my-3">
            <div className="flex gap-5">
            <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
          <div className={item.isCompleted ? "line-through": ""}> {item.todo} </div></div>
          <div className="buttons flex h-full">
          <button onClick={(e)=>{handleEdit(e, item.id)}} className='bg-violet-700 hover:bg-violet-900 text-white rounded-md px-3 py-1 mx-1.5 font-bold'><FaEdit /></button>
          <button onClick={(e)=>handleDelete(e, item.id)} className='bg-violet-700 hover:bg-violet-900 text-white rounded-md px-3 py-1 mx-1.5 font-bold'><RiDeleteBin6Line /></button>
          </div>
        </div>
        })}
      </div>
      </div>
    </>
  )
}

export default App
