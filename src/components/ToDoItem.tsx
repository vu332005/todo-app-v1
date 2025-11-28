import React from "react";
import DeleteIcon from "../icons/DeleteIcon.svg?react";
import CheckIcon from "../icons/CheckIcon.svg?react";
import Circle from "../icons/Circle.svg?react"

interface ItemProps{
    text: string,
    id: number,
    completed: boolean,
    handleDelete: (id: number) => void
    handleToggle: (id: number) => void
}
// trong ts -> kiểu của prop phải là obj
const ToDoItem = ({text,id,handleDelete,handleToggle,completed}:ItemProps) => {

    return(
        <div className="flex items-center my-3 gap-2">
            <div className="flex flex-1 items-center cursor-pointer">
                {
                    completed ? 
                    <CheckIcon 
                    className="w-7 h-7 rounded-full cursor-pointer transition fill-amber-600 hover:fill-amber-900"
                    onClick={() => handleToggle(id)}/>
                    :
                    <Circle 
                    className="w-7 h-7 rounded-full cursor-pointer transition fill-slate-600"
                    onClick={() => handleToggle(id)}/>
                }
                <p className={`text-slate-700 ml-4 text-[22px] decoration-slate-500
                ${completed ? "line-through" : ""}
                `}>
                    {text}
                </p>
            </div>
            <DeleteIcon className="w-6 h-6 fill-slate-600 hover:fill-red-700 cursor-pointer" onClick={() => handleDelete(id)}/>

        </div>
    )
}

export default ToDoItem