'use client'
import { createContext, useContext, Dispatch, SetStateAction, useState, ReactNode } from "react"

export type DataType = {
  site: string;
  login: string;
  password: string;
}

interface ContextProps {
  passwords: DataType[];
  setPasswords: Dispatch<SetStateAction<DataType[]>>
  isEditing: DataType;
  setIsEditing: Dispatch<SetStateAction<DataType>>
}

const passwordsContext = createContext<ContextProps>({
  passwords: [],
  setPasswords: (): DataType[] => [],
  isEditing: {
    site: '',
    login: '',
    password: ''
  },
  setIsEditing: (): DataType => ({
    site: '',
    login: '',
    password: ''
  }),
})

interface PasswordContextProviderProps {
  children: ReactNode
}

export const PasswordContextProvider = ({ children }: PasswordContextProviderProps) => {
  const [passwords, setPasswords] = useState<[] | DataType[]>([])
  const [isEditing, setIsEditing] = useState({
    site: '',
    login: '',
    password: ''
  })

  return (
    <passwordsContext.Provider value={{ passwords, setPasswords, isEditing, setIsEditing }}>
      {children}
    </passwordsContext.Provider>
  )
}

export const usePasswordContext = () => useContext(passwordsContext)