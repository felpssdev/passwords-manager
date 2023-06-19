'use client'
import React, { useEffect, useState } from 'react'
import { DataType, usePasswordContext } from '@/app/context/passwordsContext'
import { PasswordCard } from './PasswordCard'
import { PASSWORDS_KEY } from './CreatePassword'

function Passwords() {
  const [currentPasswords, setCurrentPasswords] = useState([])
  const { passwords, setPasswords } = usePasswordContext()

  useEffect(() => {
    const getPasswords = localStorage.getItem(PASSWORDS_KEY)
    let parsed = []

    if (typeof getPasswords === 'string') {
      parsed = JSON.parse(getPasswords)
    }

    setPasswords(parsed)
    setCurrentPasswords(parsed)
  }, [])

  useEffect(() => {
    const getPasswords = localStorage.getItem(PASSWORDS_KEY)
    let parsed = []

    if (typeof getPasswords === 'string') {
      parsed = JSON.parse(getPasswords)
    }

    setCurrentPasswords(parsed)
  }, [passwords])

  return (
    <div className="dark:shadow-slate-600 dark:shadow-md dark:bg-white/10 dark:border-red-600 w-4/5 px-6 h-4/5 mt-10 mr-10 text-start bg-white border-4 border-slate-200 rounded-xl py-6 shadow-emerald-400 transition duration-300 ease-in-out overflow-y-scroll box-border">
      <h2
        className="
            ml-4
            pb-3 border-b-2
            border-slate-200
            text-3xl
            font-bold"
      >
        Senhas salvas
      </h2>
      <main className="flex flex-wrap">
        {currentPasswords &&
          currentPasswords.map((password: DataType) => (
            <PasswordCard key={password.id} password={password} />
          ))}
      </main>
    </div>
  )
}

export default Passwords
