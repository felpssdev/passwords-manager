import React from 'react'
import { Pencil, Trash2 } from 'lucide-react'

interface IPasswordCard {
    site: string;
    login: string;
    password: string;
}

function PasswordCard({ password: {site, login, password} }:IPasswordCard) {
  return (
    <div className='bg-gradient-to-r rounded-xl m-2 w-52 h-52 flex items-center justify-center from-indigo-500 via-purple-500 to-pink-500'>
        <div
            className='text-white bg-black rounded-lg w-48 h-48 gap-3 flex flex-col text-center'
        >
            <p className='mt-2'>{ site }</p>
            <p>{ login }</p>
            <p>{ password }</p>
            <div className='flex mt-8 w-32 space-x-20 self-center'>
                <div>
                    <Pencil className='hover:text-green-500'/>
                </div>
                <div>
                    <Trash2 className='hover:text-red-500' />
                </div>
            </div>

        </div>
    </div>
  )
}

export default PasswordCard