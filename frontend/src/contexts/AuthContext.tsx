import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import Router from 'next/router'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { toastMessage } from '@utils/toast'
import { queryClient } from '@services/queryClient'
import { api } from '@services/apiClient'

interface IUser {
  id: string
  name: string
  username: string
  profile: string
  situation: string
  created_at: Date
}

interface ISignIn {
  username: string
  password: string
}

interface IContextData {
  signIn: (credentials: ISignIn) => Promise<string | number>
  signOut: () => void
  user: IUser
  isAuthenticated: boolean
}

interface IProps {
  children: ReactNode
}

export const AuthContext = createContext({} as IContextData)

export function signOut() {
  destroyCookie(undefined, 'hackathon-unialfa.access_token', { path: '/' })
  destroyCookie(undefined, 'hackathon-unialfa.refresh_token', { path: '/' })

  queryClient.clear()
  Router.push('/')
}

export function AuthProvider({ children }: IProps) {
  const [user, setUser] = useState<IUser>()
  const isAuthenticated = !!user

  useEffect(() => {
    const { 'hackathon-unialfa.access_token': access_token } = parseCookies()

    if (access_token) {
      api
        .get('/user/me')
        .then(response => {
          setUser(response.data)
        })
        .catch(() => {
          signOut()
        })
    }
  }, [])

  async function signIn({ username, password }: ISignIn): Promise<string | number> {
    try {
      const response = await api.post('session', {
        username,
        password
      })

      const { access_token, refresh_token } = response.data

      setCookie(undefined, 'hackathon-unialfa.access_token', access_token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })

      setCookie(undefined, 'hackathon-unialfa.refresh_token', refresh_token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/'
      })

      api.defaults.headers['Authorization'] = `Bearer ${access_token}`
      Router.push('/dashboard')
      return null
    } catch (err) {
      return toastMessage({ type: 'error', message: 'Usuário ou senha incorreto(s)!', autoClose: 5000 })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        isAuthenticated,
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
