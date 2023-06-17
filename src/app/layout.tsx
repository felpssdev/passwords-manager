import './globals.css'
import { Inter } from 'next/font/google'
import { PasswordContextProvider } from './context/passwordsContext'
import Providers from './providers'
import ThemeSwitcher from '@/components/ThemeSwitcher'

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
      <body className={`relative ${inter.className}`}>
        <Providers>
          <PasswordContextProvider>
            <ThemeSwitcher />
            {children}
          </PasswordContextProvider>
        </Providers>
      </body>
    </html>
  )
}
