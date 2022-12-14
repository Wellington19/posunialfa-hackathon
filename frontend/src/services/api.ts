import axios, { AxiosError } from 'axios'
import { parseCookies, setCookie } from 'nookies'
import { signOut } from '@contexts/AuthContext'

let isRefreshing = false
let failedRequestsQueue = []

export function setupAPIClient(ctx = undefined) {
  let cookies = parseCookies(ctx)

  const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
    headers: {
      Authorization: `Bearer ${cookies['hackathon-unialfa.access_token']}`
    }
  })

  api.interceptors.response.use(
    response => {
      return response
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        cookies = parseCookies(ctx)

        const { 'hackathon-unialfa.refresh_token': refresh_token } = cookies
        const originalConfig = error.config

        if (!isRefreshing) {
          isRefreshing = true

          api
            .post('session/refresh-token', {
              refresh_token
            })
            .then(response => {
              const { access_token, refresh_token } = response.data

              setCookie(ctx, 'hackathon-unialfa.access_token', access_token, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/'
              })

              setCookie(ctx, 'hackathon-unialfa.refresh_token', refresh_token, {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/'
              })

              api.defaults.headers['Authorization'] = `Bearer ${access_token}`

              failedRequestsQueue.forEach(request => request.onSuccess(access_token))
              failedRequestsQueue = []
            })
            .catch(err => {
              failedRequestsQueue.forEach(request => request.onFailure(err))
              failedRequestsQueue = []

              if (typeof window === 'undefined') signOut()
            })
            .finally(() => {
              isRefreshing = false
            })
        }

        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (access_token: string) => {
              originalConfig.headers['Authorization'] = `Bearer ${access_token}`

              resolve(api(originalConfig))
            },
            onFailure: (err: AxiosError) => {
              reject(err)
            }
          })
        })
      }

      return Promise.reject(error)
    }
  )

  return api
}
