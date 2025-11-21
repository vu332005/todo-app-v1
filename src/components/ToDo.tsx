import React, { useEffect, useRef, useState } from "react";
import ToDoItem from "./ToDoItem";
import type { Task } from "../types/task";
import CalenderIcon from "../icons/calenderIcon";

const ToDo = () =>{
    const [todoList, setToDoList] =  useState<Task[]>(() => JSON.parse(localStorage.getItem("todos") || "[]") as Task[]);
    // -> đọc từ localStorage -> nếu không có dùng [] -> parse thành arr -> báo TS đây là Task[]
    
    const inputRef = useRef<HTMLInputElement>(null)
    // -> vì khi component chưa render -> chưa có gì để gắn vào ref -> nên sẽ để là null
    
    const addTodo = () => {

        if (!inputRef.current) return;
        const inputContent = inputRef.current.value.trim();
        if (inputContent === "") return;
        
        const newToDo:Task = {
            title: inputContent,
            id: Date.now(),
            completed: false
        }
        setToDoList(prev => {
            return [...prev,newToDo]
        })
        inputRef.current.value=""
    }
    
    const deleteTodo = (id: number) => {
        setToDoList(prev => prev.filter(item => item.id !== id))
    }
    // -> hàm này chỉ cập nhật state -> return void
    
    const toggleComplete = (id: number) => {
        setToDoList(prev => prev.map(item =>
        {
            return item.id == id
            ? {...item,completed: !item.completed}
            : item
        }
            ))
    }
    
    useEffect(()=>{
        localStorage.setItem("todos",JSON.stringify(todoList)) 
    },[todoList])




    return (
        <div className="bg-white place-self-center w-11/12 flex flex-col p-6.5 rounded-xl max-w-md min-h-[550px] max-h-[550px] shadow-lg shadow-amber-700">
        {/* title     */}
            <div className="flex items-center mt-2 gap-1">
                <CalenderIcon/>
                <h1 className="text-3xl font-bold mb-0.5">
                    To-Do <span className="text-amber-700">List</span>
                </h1>
            </div>

        {/* input */}
        
            <div className="flex items-center mt-7 mb-3.5 bg-gray-200 rounded-full">
                <input ref={inputRef} className="bg-transparent border-0 outline-none 
                flex-1 h-14 pl-6 pr-2 placeholder:text-slate-450" placeholder="Add your task" type="text"
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