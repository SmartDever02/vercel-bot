import NextAuth, { AuthOptions, DefaultSession } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { OAuth2Client } from 'google-auth-library'

declare module 'next-auth' {
  interface Session {
    user: {
      /** The user's id. */
      id: string
    } & DefaultSession['user']
  }
}

const googleAuthClient = new OAuth2Client(
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string
)

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      id: 'googleonetap',
      name: 'google-one-tap',
      credentials: { credential: { type: 'text' } },
      authorize: async credentials => {
        const token = credentials!.credential
        const ticket = await googleAuthClient.verifyIdToken({
          idToken: token,
          audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
        })
        const payload = ticket.getPayload()

        return {
          id: ticket.getUserId() as string,
          name: payload?.name,
          email: payload?.email,
          image: payload?.picture
        }
      }
    })
  ],
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt'
  },
  secret: process.env.AUTH_SECRET
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
