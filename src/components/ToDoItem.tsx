import React from "react";
import CheckIcon from "../icons/CheckIcon";
import DeleteIcon from "../icons/DeleteIcon";

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
                <CheckIcon
                onClick={() => handleToggle(id)}
                completed={completed}
                />
                <p className={`text-slate-700 ml-4 text-[22px] decoration-slate-500
                ${completed ? "line-through" : ""}
                `}>
                    {text}
                </p>
            </div>
            <DeleteIcon
            onClick={() => handleDelete(id)}
            />
        </div>
    )
}

export default ToDoItem