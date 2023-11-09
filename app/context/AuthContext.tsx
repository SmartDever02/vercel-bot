'use client'

import React from 'react'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

type AuthContextProps = {
  session: Session | null
  children: React.ReactNode
}

const AuthContext: React.FC<AuthContextProps> = ({ session, children }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>
}

export default AuthContext
