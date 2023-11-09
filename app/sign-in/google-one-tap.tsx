'use client'

import useOneTap from '@/hooks/useOneTap'

export default function GoogleOneTap() {
  useOneTap()

  return (
    <div
      id="g_id_onload"
      data-client_id={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
      data-login_uri={`api/auth/callback/google`}
      data-auto_select="true"
    ></div>
  )
}
