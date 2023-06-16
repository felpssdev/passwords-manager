"use client"
import React, { useEffect, useState } from 'react'
import PasswordCard from './PasswordCard'

function Passwords() {
    const [passwords, setPasswords] = useState([])

    useEffect(() => {
        const getPasswords = JSON.parse(localStorage.getItem('password')) || []
        setPasswords(getPasswords)
    }, [])

  return (
    <div  className='w-3/4 h-4/5 mt-10 mr-10 scroll-overflow-y-auto text-start bg-white border-4 border-slate-200 rounded-xl py-4 shadow-emerald-400'>
        <h2
          className='
            ml-4
            pb-3 border-b-2
            border-slate-200
            text-xl
            font-bold
            mt-2'
          >
            Senhas salvas
          </h2>
          <main className='flex flex-wrap'>
            {passwords && passwords.map((password) => (
                <PasswordCard password={ password } />
            ))}
          </main>
    </div>
  )
}

export default Passwords