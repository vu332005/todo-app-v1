import React from "react";
import { useTodoContext } from "../contexts/toDoContext";

const CountItem = () => {
    const {todoList} = useTodoContext()

    return (
        <div className="w-[80px] h-[35px] bg-amber-100 content-center ml-4 rounded-2xl pl-0.5 font-bold size-2">
            <p>counter:{todoList.length}</p>
        </div>
    )
}

export default CountItem