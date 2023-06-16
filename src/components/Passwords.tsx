'use client'
import React, { useEffect, useState } from 'react'
import { usePasswordContext } from '@/app/context/passwordsContext'
import PasswordCard from './PasswordCard'

function Passwords() {
  const [currentPasswords, setCurrentPasswords] = useState([])
  const { passwords, setPasswords } = usePasswordContext()

  useEffect(() => {
    const getPasswords = JSON.parse(localStorage.getItem('password')) || []
    setPasswords(getPasswords)
    setCurrentPasswords(getPasswords)
  }, [])

  useEffect(() => {
    const getPasswords = JSON.parse(localStorage.getItem('password')) || []
    setCurrentPasswords(getPasswords)
  }, [passwords])

  return (
    <div className="w-9/12 px-6 h-4/5 mt-10 mr-10 scroll-overflow-y-auto text-start bg-white border-4 border-slate-200 rounded-xl py-6 shadow-emerald-400">
      <h2
        className="
            ml-4
            pb-3 border-b-2
            border-slate-200
            text-xl
            font-bold
            mt-2"
      >
        Senhas salvas
      </h2>
      <main className="flex flex-wrap">
        {currentPasswords &&
          currentPasswords.map((password) => <PasswordCard password={password} />)}
      </main>
    </div>
  )
}

export default Passwords
