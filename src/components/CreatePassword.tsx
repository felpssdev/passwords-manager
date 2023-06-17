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
    id: '',
    login: '',
    password: '',
    site: '',
  })

  interface ITarget {
    name: string
    value: string
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

    setInputValue({ login: '', password: '', site: '', id: '' })
    setPasswords(getPasswords)
    setIsEditing({
      id: '',
      site: '',
      login: '',
      password: '',
    })
  }

  return (
    <div className="transition duration-300 ease-in-out dark:shadow-slate-600 dark:shadow-md dark:bg-white/10 dark:border-red-600 m-10 w-96 h-fit bg-white border-4 border-slate-200 rounded-xl py-4 shadow-slate-500 flex flex-col items-center">
      <h2
        className="text-center
            pb-3 border-b-2
            border-slate-200
            text-xl
            font-bold
            mt-2
            w-3/4"
      >
        {isEditing.site !== '' ? 'Editar' : 'Cadastrar'}
      </h2>
      <form className="py-2 box-border">
        <div className="border-b-2 border-slate-200 my-4 mx-8">
          <label className="dark:text-slate-200 text-slate-500 text-base font-bold">
            Identificação
          </label>
          <input
            onChange={handleChange}
            name="id"
            value={inputValue.id}
            className="dark:bg-white/20 dark:text-white w-full px-1 h-10 text-base rounded-lg"
            type="text"
            required
          />
        </div>
        <div className="border-b-2 border-slate-200 my-4 mx-8">
          <label htmlFor='site' className="dark:text-slate-200 text-slate-500 text-base font-bold">
            Site
          </label>
          <input
            id='site'
            onChange={handleChange}
            name="site"
            value={inputValue.site}
            className="dark:bg-white/20 dark:text-white w-full px-1 h-10 text-base rounded-lg"
            type="text"
            required
          />
        </div>
        <div className="border-b-2 border-slate-200 my-4 mx-8">
          <label className="dark:text-slate-200 text-slate-500 text-base font-bold">
            Login
          </label>
          <input
            onChange={handleChange}
            name="login"
            value={inputValue.login}
            className="dark:bg-white/20 dark:text-white w-full px-1 h-10 text-base rounded-lg"
            type="text"
            required
          />
        </div>
        <div className="border-b-2 border-slate-200 mx-8">
          <label className="dark:text-slate-200 text-slate-500 text-base font-bold">
            Password
          </label>
          <input
            onChange={handleChange}
            name="password"
            value={inputValue.password}
            className="dark:bg-white/20 dark:text-white w-full px-1 h-10 text-base rounded-lg"
            type="text"
            required
          />
        </div>
        <input
          disabled={!inputValue.site || !inputValue.id || !inputValue.login || !inputValue.password}
          onClick={handleSavePassword}
          className="dark:bg-red-600 bg-indigo-500 dark:text-white dark:hover:bg-gradient-to-r dark:hover:from-red-600 dark:hover:via-red-500 dark:hover:to-red-400 dark:hover:text-white w-44 py-2 rounded-xl ml-24 mt-8 text-white font-bold hover:text-black hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          type="submit"
          value="Save"
        />
      </form>
    </div>
  )
}

export default CreatePassword
