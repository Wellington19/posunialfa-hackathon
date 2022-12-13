import { Router } from 'express'

import { userRoutes } from './user'
import { sessionRoutes } from './session'

const router = Router()
router.use('/user', userRoutes)
router.use('/session', sessionRoutes)

export { router }