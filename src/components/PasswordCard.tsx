import React, { memo, useEffect, useState } from 'react'
import { Pencil, Trash2, Eye, EyeOff, Edit3 } from 'lucide-react'
import { usePasswordContext } from '@/app/context/passwordsContext'

type PasswordCardProps = {
  id: string
  site: string
  login: string
  password: string
}

const charsReg = /[0-9a-zA-Z!@#$%^&*()_+=\-[\]{}|\\:;"'<>,.?/~`]/g

function PasswordCardComponent({
  password: { site, login, password, id },
}: {
  password: PasswordCardProps
}) {
  const { passwords, setPasswords, isEditing, setIsEditing } =
    usePasswordContext()
  const [showPassword, setShowPassword] = useState(false)
  const [filteredPassword, setFilteredPassword] = useState(password)

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  useEffect(() => {
    showPassword
      ? setFilteredPassword(password)
      : setFilteredPassword(filteredPassword.replace(charsReg, '*'))
  }, [showPassword])

  const handleEditPassword = (
    id: string,
    site: string,
    login: string,
    password: string,
  ) => {
    setIsEditing({
      id,
      site,
      login,
      password,
    })
  }

  const handleRemovePassword = (id: string) => {
    const filteredPasswords = passwords.filter((pass) => pass.id !== id)
    localStorage.setItem('password', JSON.stringify(filteredPasswords))
    setPasswords(filteredPasswords)
  }

  return (
    <div
      className={`${isEditing.id === id && 'animate-changecolors'
        } bg-400% bg-light-gradient dark:bg-dark-gradient transition duration-300 ease-in-out relative rounded-xl m-2 w-64 h-64 mt-8 flex items-center justify-center`}
    >
      <div className="font-bold text-white bg-black rounded-lg w-56 h-56 gap-3 flex flex-col text-center">
        <a
          href={site}
          target="_blank"
          className="mt-6 dark:text-red-400 dark:hover:text-red-600 text-indigo-500 hover:text-pink-500 trasition-all duration-300 ease-in-out"
          rel="noreferrer"
        >
          {id}
        </a>
        <p>{login}</p>
        <p>{filteredPassword}</p>
        <div className="flex absolute top-48 w-32 space-x-6 ml-2 self-center">
          {isEditing.id === id ? (
            <div>
              <Edit3
                onClick={() => handleEditPassword(id, site, login, password)}
                className="hover:text-green-500 hover:cursor-pointer"
              />
            </div>
          ) : (
            <div>
              <Pencil
                onClick={() => handleEditPassword(id, site, login, password)}
                className="hover:text-green-500 hover:cursor-pointer"
              />
            </div>
          )}
          {showPassword ? (
            <div>
              <Eye
                onClick={toggleShowPassword}
                className="hover:text-blue-500 hover:cursor-pointer"
              />
            </div>
          ) : (
            <div>
              <EyeOff
                onClick={toggleShowPassword}
                className="hover:text-blue-500 hover:cursor-pointer"
              />
            </div>
          )}
          <div>
            <Trash2
              onClick={() => handleRemovePassword(id)}
              className="hover:text-red-500 hover:cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export const PasswordCard = memo(PasswordCardComponent)
