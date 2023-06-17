'use client'
import React, { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <div>
      {theme === 'dark' ? (
        <div className="absolute right-20 top-14 cursor-pointer">
          <Moon className="w-12 h-12" onClick={() => setTheme('light')} />
        </div>
      ) : (
        <div className="absolute right-20 top-14 cursor-pointer">
          <Sun className="w-12 h-12" onClick={() => setTheme('dark')} />
        </div>
      )}
    </div>
  )
}

export default ThemeSwitcher
