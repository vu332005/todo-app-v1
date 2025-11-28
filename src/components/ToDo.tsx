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
    
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const data = await todoApi.getAll();
                setTodoList(data);
            } catch (error) {
                console.error("Lỗi khi tải danh sách:", error);
            }
        };
        fetchTodos();
    }, [setTodoList]);

const addTodo = async () => {
        if (!inputValue.trim()) return;

        try {
            const newTaskData = {
                title: inputValue,
                completed: false
                // Không cần truyền ID, json-server tự tạo id string hoặc number
            };
            
            // Gọi API
            const savedTask = await todoApi.add(newTaskData);
            
            // Cập nhật UI sau khi API thành công
            setTodoList((prev) => [...prev, savedTask]);
            setInputValue("");
        } catch (error) {
            alert("Không thể thêm task!");
        } finally {
        }
    };
    
    const deleteTodo = (id: number) => {
        setTodoList(prev => prev.filter(item => item.id !== id))
    }
    // -> hàm này chỉ cập nhật state -> return void
    
    const toggleComplete = (id: number) => {
        setTodoList(prev => prev.map(item =>
        {
            return item.id == id
            ? {...item,completed: !item.completed}
            : item
        }
            ))
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