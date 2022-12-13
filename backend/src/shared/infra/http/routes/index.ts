import { Router } from 'express'

import { ratingRoutes } from './rating'
import { sessionRoutes } from './session'
import { userRoutes } from './user'

const router = Router()
router.use('/rating', ratingRoutes)
router.use('/session', sessionRoutes)
router.use('/user', userRoutes)

export { router }