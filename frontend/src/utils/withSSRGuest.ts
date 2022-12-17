import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { parseCookies } from 'nookies'

export function withSSRGuest<P>(fn: GetServerSideProps<P>) {
  return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
    const cookies = parseCookies(ctx)
    const accessToken = cookies['hackathon-unialfa.access_token']

    if (accessToken) {
      return {
        redirect: {
          destination: '/home',
          permanent: false
        }
      }
    }

    return fn(ctx)
  }
}
