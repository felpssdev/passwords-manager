'use client'
import { ThemeProvider } from 'next-themes'
import React, { ReactElement, useEffect, useState } from 'react'

function Providers({ children }: { children: ReactElement }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return <>{children}</>

  return <ThemeProvider attribute="class">{children}</ThemeProvider>
}

export default Providers
