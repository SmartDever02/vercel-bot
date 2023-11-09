import { getSession } from '@/app/actions'
import { GoogleLoginButton, LoginButton } from '@/components/login-button'
import { redirect } from 'next/navigation'
import GoogleOneTap from './google-one-tap'

export default async function SignInPage() {
  const session = await getSession()
  if (session?.user) {
    redirect('/')
  }
  return (
    <div className="flex gap-x-4 h-[calc(100vh-theme(spacing.16))] items-center justify-center py-10">
      <GoogleLoginButton />
      <GoogleOneTap />
    </div>
  )
}
