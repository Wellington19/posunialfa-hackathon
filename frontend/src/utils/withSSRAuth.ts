import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { destroyCookie, parseCookies } from 'nookies'
import { AuthTokenError } from '@services/errors/AuthTokenError'
import { queryClient } from '@services/queryClient'

export function withSSRAuth<P>(fn: GetServerSideProps<P>) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx)
    const accessToken = cookies['hackathon-unialfa.access_token']

    if (!accessToken) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }

    try {
      return await fn(ctx)
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(ctx, 'hackathon-unialfa.access_token')
        destroyCookie(ctx, 'hackathon-unialfa.refresh_token')
        queryClient.clear()

        return {
          redirect: {
            destination: '/',
            permanent: false
          }
        }
      }

      return null
    }
  }
}
