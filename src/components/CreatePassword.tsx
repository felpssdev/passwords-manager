'use client'
import { usePasswordContext } from '@/app/context/passwordsContext'
import React, { FormEvent, ReactElement, useEffect, useState } from 'react'

function CreatePassword(): ReactElement {
  const { setPasswords, isEditing, setIsEditing } = usePasswordContext()

  useEffect(() => {
    if (isEditing.site !== '') {
      setInputValue(isEditing)
    }
  }, [isEditing])

  const [inputValue, setInputValue] = useState({
    login: '',
    password: '',
    site: '',
  })

  interface ITarget {
    name: string;
    value: string;
  }

  const handleChange = ({ target: { name, value } }: { target: ITarget }) => {
    setInputValue({
      ...inputValue,
      [name]: value,
    })
  }

  const handleSavePassword = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    
    const getPasswords = JSON.parse(localStorage.getItem('password')) || []
    getPasswords.push(inputValue)
    
    localStorage.setItem('password', JSON.stringify(getPasswords))
    
    setInputValue({ login: '', password: '', site: '' })
    setPasswords(getPasswords)
    setIsEditing({
      site: '',
      login: '',
      password: ''
    })
  }

  return (
    <div className="w-96 m-10 h-fit bg-white border-4 border-slate-200 rounded-xl py-4 shadow-emerald-400">
      <h2
        className="text-center
            pb-3 border-b-2
            border-slate-200
            text-xl
            font-bold
            mt-2"
      >
        {isEditing.site !== '' ? 'Editar' : 'Cadastrar'}
      </h2>
      <form className="py-2 box-border">
        <div className="border-b-2 border-slate-200 my-4 mx-8">
          <label className="text-slate-500 text-base">Site</label>
          <input
            onChange={handleChange}
            name="site"
            value={inputValue.site}
            className="w-full px-1 h-10 text-base"
            type="text"
            required
          />
        </div>
        <div className="border-b-2 border-slate-200 my-4 mx-8">
          <label className="text-slate-500 text-base">Login</label>
          <input
            onChange={handleChange}
            name="login"
            value={inputValue.login}
            className="w-full px-1 h-10 text-base"
            type="text"
            required
          />
        </div>
        <div className="border-b-2 border-slate-200 m-8">
          <label className="text-slate-500 text-base">Password</label>
          <input
            onChange={handleChange}
            name="password"
            value={inputValue.password}
            className="w-full px-1 h-10 text-base"
            type="text"
            required
          />
        </div>
        <input
          onClick={handleSavePassword}
          className="bg-indigo-500 w-3/5 ml-16 py-2 rounded-xl text-white font-bold hover:text-black hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          type="submit"
          value="Save"
        />
      </form>
    </div>
  )
}

export default CreatePassword
