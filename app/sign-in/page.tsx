import { getSession } from '@/app/actions'
// import { getSession } from 'next-auth/react'
import { GoogleLoginButton, LoginButton } from '@/components/login-button'
import { redirect } from 'next/navigation'

export default async function SignInPage() {
  const session = await getSession()
  // redirect to home if user is already logged in
  console.log('SESSION', session)
  if (session?.user) {
    redirect('/')
  }
  return (
    <div className="flex gap-x-4 h-[calc(100vh-theme(spacing.16))] items-center justify-center py-10">
      <LoginButton />
      <GoogleLoginButton />
    </div>
  )
}
