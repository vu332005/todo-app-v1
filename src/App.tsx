import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ToDo from './components/toDo'

function App() {
  return (
    <div className='bg-stone-900 min-h-screen grid py-4'>
      <ToDo/>
    </div>
  )
}

export default App
