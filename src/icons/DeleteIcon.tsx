import React from "react";

interface props{
  onClick: () => void
}

const DeleteIcon = ({onClick}: props) => {
    return(
        <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
      className="w-6 h-6 fill-slate-600 hover:fill-red-700 cursor-pointer"
      onClick={onClick}
    >
      <path d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z" />
    </svg>
    )
}

export default DeleteIcon