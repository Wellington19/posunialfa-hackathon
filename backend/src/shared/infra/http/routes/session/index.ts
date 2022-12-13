import { Router } from 'express'
import { ensureAuthenticated } from '@middlewares/isAuthenticated'
import * as v from './validators'

import { AuthenticateUserController } from '@modules/session/useCases/authenticateUser/AuthenticateUserController'
import { RefreshTokenController } from '@modules/session/useCases/refreshToken/RefreshTokenController'

const authenticateUserController = new AuthenticateUserController()
const refreshTokenController = new RefreshTokenController()

const sessionRoutes = Router()

sessionRoutes.post('/', v.authenticateUser, authenticateUserController.handle)

sessionRoutes.use(ensureAuthenticated)
sessionRoutes.post('/refresh-token', v.refreshToken, refreshTokenController.handle)

export { sessionRoutes }
