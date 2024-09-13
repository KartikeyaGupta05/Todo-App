import React from 'react'

const Navbar = () => {
  return (
    <div>
        <nav className="flex justify-between items-center bg-indigo-900 text-rose-400 py-2 px-7">
            <div className="logo">
                <span className='font-bold text-4xl'>iTask</span>
            </div>
            <ul className="flex gap-8 text-xl">
                <li className='cursor-pointer hover:font-bold transition-all duration-150'>Home</li>
                <li className='cursor-pointer hover:font-bold transition-all duration-150'>Your Task</li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar
