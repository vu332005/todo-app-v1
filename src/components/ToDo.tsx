import React, { useEffect, useRef, useState } from "react";
import ToDoItem from "./ToDoItem";
import type { Task } from "../types/task";
import CalenderIcon from "../icons/CalenderIcon.svg?react";
import { debounce } from "../ulti";
import {saveFromStorage, loadFromStorage} from "../ulti"
import { useTodoContext } from "../contexts/toDoContext";
import { todoApi } from "../api/todoApi";
const ToDo = () =>{
    const {todoList, setTodoList} = useTodoContext()

    const [inputValue, setInputValue] = useState("")
    // -> vì khi component chưa render -> chưa có gì để gắn vào ref -> nên sẽ để là null
    
    useEffect(()=>{
        const getAll = async () => {
            try {
                const data  = await todoApi.getAll()
                setTodoList(data)
            } catch (error) {
                console.log("lỗi khi tải danh sách: ",error)
            }
        }
        getAll()
    },[])

    // dùng async -> hàm ta tạo api trả về những promises -> dùng async để qly
    const addTodo = async () => {
        if (!inputValue) return

        try {
            const newTask = {
                title: inputValue,
                completed: false
            }

            const taskSaved = await todoApi.add(newTask)

            setTodoList(prev => [...prev,taskSaved])
        } catch (error) {
            console.log("không thêm được task mới: ", error)
        }
    }
        
    const deleteTodo = async(id: number) => {

        const prevList = [...todoList] 
        setTodoList(prev => prev.filter(item => item.id !== id))
        try {
        await todoApi.delete(id)    
        } catch (error) {
            console.log("xóa task thất bại: ",error)
            setTodoList(prevList) // set list cũ nếu fail
        }
    }
    // -> hàm này chỉ cập nhật state -> return void
    
    const toggleComplete = async(id: number) => {
        setTodoList(prev => prev.map(item => 
            item.id === id ?
            {...item,completed: !item.completed} :
            item 
        ))
        const prev = [...todoList]
        const target = prev.find(item => item.id === id)
        if (!target) return; // *

        try {
            await todoApi.update(id,{completed: !target.completed})
        } catch (error) {
            console.log("lỗi thay đổi trạng thái:", error)
        }
    }
    
    
    
    useEffect(() => {   
        const handle = debounce(() => {alert("signed")},2000)
        handle()

        return handle.clear
    },[inputValue])


    return (
        <div className="bg-white place-self-center w-11/12 flex flex-col p-6.5 rounded-xl max-w-md min-h-[550px] max-h-[550px] shadow-lg shadow-amber-700">
        {/* title     */}
            <div className="flex items-center mt-2 gap-1">
                <CalenderIcon className="w-8.5 h-8.5 fill-black"/>
                <h1 className="text-3xl font-bold mb-0.5">
                    To-Do <span className="text-amber-700">List</span>
                </h1>
            </div>

        {/* input */}
        
            <div className="flex items-center mt-7 mb-3.5 bg-gray-200 rounded-full">
                <input value={inputValue} className="bg-transparent border-0 outline-none 
                flex-1 h-14 pl-6 pr-2 placeholder:text-slate-450" placeholder="Add your task" type="text"
                onChange={(e)=>{
                    setInputValue(e.target.value)
                }}

                onKeyDown={(e)=>{
                    if(e.key === "Enter"){
                        addTodo()
                    }
                }
                }
                />
                <button 
                onClick={addTodo}
                className="bg-amber-700 rounded-full w-24 h-14 text-white font-medium cursor-pointer
                hover:bg-amber-600
                ">Add</button>
            </div>

        {/* item */}
        <div className="flex-1 overflow-y-auto ">

        {todoList.map((item, index)=>{
            return <ToDoItem
                    completed={item.completed}
                    handleToggle={toggleComplete}                    
                    handleDelete={deleteTodo}
                    id={item.id}
                    key={item.id}
                    text={item.title}
               />
        })}
        </div>
        </div>
    )
}

export default ToDo