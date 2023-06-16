import './globals.css'
import { Inter } from 'next/font/google'
import { PasswordContextProvider } from './context/passwordsContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Passwords Manager',
  description: 'Gerenciador de Senhas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PasswordContextProvider>
          {children}
        </PasswordContextProvider>
      </body>
    </html>
  )
}
