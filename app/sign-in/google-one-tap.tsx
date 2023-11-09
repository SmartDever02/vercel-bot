'use client'

import useOneTap from '@/hooks/useOneTap'

export default function GoogleOneTap() {
  useOneTap()

  return (
    <div
      id="g_id_onload"
      data-client_id={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
      data-login_uri={`${process.env.NEXT_PUBLIC_HOST_URL}/api/auth/callback/google`}
      data-auto_select="true"
    ></div>
  )
}
