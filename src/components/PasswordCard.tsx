import React, { useEffect, useState } from 'react'
import { Pencil, Trash2, Eye, EyeOff } from 'lucide-react'
import { usePasswordContext } from '@/app/context/passwordsContext'

interface IPasswordCard {
  id: string;
  site: string
  login: string
  password: string
}

function PasswordCard({
  password: { site, login, password, id },
}: {
  password: IPasswordCard
}) {
  const { passwords, setPasswords, setIsEditing } = usePasswordContext()
  const [showPassword, setShowPassword] = useState(false)
  const [filteredPassword, setFilteredPassword] = useState(password)

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  useEffect(() => {
    showPassword ? setFilteredPassword(password) : setFilteredPassword(filteredPassword.replace(/[0-9a-zA-Z!@#$%^&*()_+=\-[\]{}|\\:;"'<>,.?/~`]/g, '*'))
  }, [showPassword])

  const handleEditPassword = (
    id: string,
    site: string,
    login: string,
    password: string
  ) => {
    const filteredPasswords = passwords.filter((pass) => pass.site !== site)
    localStorage.setItem('password', JSON.stringify(filteredPasswords))
    setPasswords(filteredPasswords)

    setIsEditing({
      id: id,
      site: site,
      login: login,
      password: password,
    })
  }

  const handleRemovePassword = (id: string) => {
    const filteredPasswords = passwords.filter((pass) => pass.id !== id)
    localStorage.setItem('password', JSON.stringify(filteredPasswords))
    setPasswords(filteredPasswords)
  }

  return (
    <div className="transition duration-300 ease-in-out dark:from-red-600 dark:via-red-500 dark:to-red-400 relative bg-gradient-to-r rounded-xl m-2 w-64 h-64 mt-8 flex items-center justify-center from-indigo-500 via-purple-500 to-pink-500">
      <div className="font-bold text-white bg-black rounded-lg w-56 h-56 gap-3 flex flex-col text-center">
        <a href={site} target="_blank" className="mt-6 dark:text-red-400 dark:hover:text-red-600 text-indigo-500 hover:text-pink-500 trasition-all duration-300 ease-in-out">
          {id}
        </a>
        <p>{login}</p>
        <p>{filteredPassword}</p>
        
        <div className="flex absolute top-48 w-32 space-x-6 ml-2 self-center">
          <div>
            <Pencil
              onClick={() => handleEditPassword(id, site, login, password)}
              className="hover:text-green-500 hover:cursor-pointer"
            />
          </div>
          {showPassword ? (
          <div >
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

export default PasswordCard
