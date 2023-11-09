import googleOneTap from 'google-one-tap'
import { useEffect } from 'react'
import { signIn } from 'next-auth/react'

export default function useOneTap() {
  const options = {
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
    auto_select: false, // optional
    cancel_on_tap_outside: false, // optional
    context: 'signin' // optional
  }

  useEffect(() => {
    //@ts-ignore
    googleOneTap(options, async response => {
      // Send response to server
      await signIn('googleonetap', {
        credential: response.credential,
        redirect: false
      })
    })
  }, [])
}
