'use client'
import { DataType, usePasswordContext } from '@/app/context/passwordsContext'
import React, { memo, ReactElement, useEffect, useState } from 'react'

export const PASSWORDS_KEY = 'password'

function CreatePasswordComponent(): ReactElement {
  const { setPasswords, isEditing, setIsEditing } = usePasswordContext()

  const [inputValue, setInputValue] = useState({
    id: '',
    login: '',
    password: '',
    site: '',
  })

  useEffect(() => {
    if (isEditing.site !== '') {
      setInputValue(isEditing)
    }
  }, [isEditing])

  interface ITarget {
    name: string
    value: string
  }

  const handleChange = ({ target: { name, value } }: { target: ITarget }) => {
    setInputValue({ ...inputValue, [name]: value })
  }

  const handleSavePassword = () => {
    const getPasswords = localStorage.getItem(PASSWORDS_KEY)
    let parsed = []

    if (typeof getPasswords === 'string') {
      parsed = JSON.parse(getPasswords)
    }

    if (inputValue.id !== isEditing.id && isEditing.id !== '') {
      const editedPassword = parsed.filter(
        (pass: DataType) => pass.id === isEditing.id,
      )
      const index: number = parsed.indexOf(editedPassword[0])
      parsed.splice(index, 1)
    }

    if (parsed.some((pass: DataType) => pass.id === inputValue.id)) {
      const oldPassword = parsed.filter(
        ({ id }: { id: string }) => id === inputValue.id,
      )
      const index: number = parsed.indexOf(oldPassword[0])
      parsed[index] = inputValue
    } else {
      parsed.unshift(inputValue)
    }

    localStorage.setItem(PASSWORDS_KEY, JSON.stringify(parsed))

    setInputValue({ login: '', password: '', site: '', id: '' })
    setPasswords(parsed)
    setIsEditing({
      id: '',
      site: '',
      login: '',
      password: '',
    })
  }

  return (
    <div className="transition duration-300 ease-in-out dark:shadow-slate-600 dark:shadow-md dark:bg-white/10 dark:border-red-600 mt-10 mx-10 w-1/5 h-fit bg-white border-4 border-slate-200 rounded-xl py-4 shadow-slate-500 flex flex-col items-center">
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
      <form className="py-2 box-border flex flex-col">
        <div className="border-b-2 border-slate-200 my-2 mx-8">
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
        <div className="border-b-2 border-slate-200 my-2 mx-8">
          <label
            htmlFor="site"
            className="dark:text-slate-200 text-slate-500 text-base font-bold"
          >
            Site
          </label>
          <input
            id="site"
            onChange={handleChange}
            name="site"
            value={inputValue.site}
            className="dark:bg-white/20 dark:text-white w-full px-1 h-10 text-base rounded-lg"
            type="text"
            required
          />
        </div>
        <div className="border-b-2 border-slate-200 my-2 mx-8">
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
        <div className="border-b-2 border-slate-200 my-2 mx-8">
          <label className="dark:text-slate-200 text-slate-500 text-base font-bold">
            Senha
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
        <div className="self-center">
          <input
            disabled={
              !inputValue.site ||
              !inputValue.id ||
              !inputValue.login ||
              !inputValue.password
            }
            onClick={handleSavePassword}
            className="transition duration-300 ease-in-out dark:bg-red-600 cursor-pointer bg-indigo-400 dark:text-white dark:hover:bg-dark-gradient dark:hover:bg-400% dark:hover:animate-changecolors dark:hover:text-black w-44 py-2 rounded-xl mt-8 text-black font-bold hover:text-white hover:bg-light-gradient hover:bg-400% hover:animate-changecolors"
            type="submit"
            value="Salvar"
          />
        </div>
      </form>
    </div>
  )
}

export const CreatePassword = memo(CreatePasswordComponent)
