import React, { createContext, useContext, useEffect, useState } from "react";
import type { Task } from "../types/task";
import { saveFromStorage,loadFromStorage } from "../ulti";

type todoStorageType = {
    todoList: Task[];
    
    setTodoList: React.Dispatch<React.SetStateAction<Task[]>>
    // đây là kiểu của setTodoList trong React

}

 const TodoStorage = createContext<todoStorageType | null>(null)

export const TodoProvider = ({children} : {children: React.ReactNode}) =>{
    const [todoList, setTodoList] = useState<Task[]>(() => loadFromStorage("todos",[]))

    useEffect(() => {
        saveFromStorage("todos",todoList)
    },[todoList])

    return(
        // context value phải là obj
        <TodoStorage.Provider value={{todoList, setTodoList}}>
            {children}
        </TodoStorage.Provider>
    )
}

export const useTodoContext = () => {
    const ctx = useContext(TodoStorage)
    if(!ctx) throw new Error("err")
    return ctx
}