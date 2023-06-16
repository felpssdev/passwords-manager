import React from 'react'
import { Pencil, Trash2 } from 'lucide-react'
import { usePasswordContext } from '@/app/context/passwordsContext'

interface IPasswordCard {
  site: string
  login: string
  password: string
}

function PasswordCard({ password: { site, login, password } }: { password: IPasswordCard}) {
  const { passwords, setPasswords, setIsEditing } = usePasswordContext()

  const handleEditPassword = (site: string, login: string, password: string) => {
    const filteredPasswords = passwords.filter((pass) => pass.site !== site)
    localStorage.setItem('password', JSON.stringify(filteredPasswords))
    setPasswords(filteredPasswords)
    
    setIsEditing({
        site: site,
        login: login,
        password: password
    })
  }

  const handleRemovePassword = (site: string) => {
    const filteredPasswords = passwords.filter((pass) => pass.site !== site)
    localStorage.setItem('password', JSON.stringify(filteredPasswords))
    setPasswords(filteredPasswords)
  }

  return (
    <div className="relative bg-gradient-to-r rounded-xl m-2 w-64 h-64 flex items-center justify-center from-indigo-500 via-purple-500 to-pink-500">
      <div className="font-bold text-white bg-black rounded-lg w-56 h-56 gap-3 flex flex-col text-center">
        <a href={site} target="_blank" className="mt-2">
          {site}
        </a>
        <p>{login}</p>
        <p>{password}</p>
        <div className="flex absolute top-48 w-32 space-x-20 self-center">
          <div>
            <Pencil
                onClick={() => handleEditPassword(site, login, password) }
                className="hover:text-green-500 hover:cursor-pointer"
            />
          </div>
          <div>
            <Trash2
              onClick={() => handleRemovePassword(site)}
              className="hover:text-red-500 hover:cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PasswordCard
