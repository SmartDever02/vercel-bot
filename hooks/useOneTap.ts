import googleOneTap from 'google-one-tap'
import { useEffect } from 'react'

export default function useOneTap() {
  const options = {
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
    auto_select: false, // optional
    cancel_on_tap_outside: false, // optional
    context: 'signin' // optional
  }

  useEffect(() => {
    //@ts-ignore
    googleOneTap(options, response => {
      // Send response to server
      console.log(response)
    })
  }, [])
}
