import 'reflect-metadata'
import 'dotenv/config'
import 'express-async-errors'
import '@shared/infra/typeorm'
// import '@shared/container'

import express, { Request, Response, NextFunction } from 'express'
import { corsOptions } from '@config/cors'
import cors from 'cors'
import { errors } from 'celebrate'
import { AppError } from '@shared/errors/AppError'
// import { router } from './routes'

const app = express()
app.use(cors(corsOptions))
// app.use(router)
app.use(errors())
app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return response.status(error.status_code).json({
      message: error.message,
      statusCode: error.status_code
    })
  }

  return response.status(500).json({
    message: `Internal server error - ${error.message}`,
    statusCode: 500
  })
})

app.listen(process.env.PORT || 3333, () => {
  console.log('🚀 Servidor em execução')
})
