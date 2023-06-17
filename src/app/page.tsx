"use client"
import CreatePassword from '@/components/CreatePassword'
import Passwords from '@/components/Passwords'
import { ReactElement } from 'react'

export default function Home():ReactElement {
  return (
    <main className='transition duration-300 ease-in-out dark:bg-gradient-to-b dark:from-slate-950 dark:via-slate-800 dark:to-slate-950 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex h-screen'>
      <CreatePassword />
      <Passwords />
    </main>
  )
}
