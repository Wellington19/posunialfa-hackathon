import { Router } from 'express'
import { ensureAuthenticated } from '@middlewares/isAuthenticated'
import * as v from './validators'

import { CreateUserController } from '@modules/user/useCases/createUser/CreateUserController'
import { FindUserController } from '@modules/user/useCases/findUser/FindUserController'
import { FindUserMeController } from '@modules/user/useCases/findUserMe/FindUserMeController'
import { PatchUserController } from '@modules/user/useCases/patchUser/PatchUserController'
import { DeleteUserController } from '@modules/user/useCases/deleteUser/DeleteUserController'

const createUserController = new CreateUserController()
const findUserController = new FindUserController()
const findUserMeController = new FindUserMeController()
const patchUserController = new PatchUserController()
const deleteUserController = new DeleteUserController()

const userRoutes = Router()

userRoutes.use(ensureAuthenticated)
userRoutes.post('/', v.createUser, createUserController.handle)

userRoutes.get('/', v.findUser, findUserController.handle)

userRoutes.get('/me', findUserMeController.handle)

userRoutes.patch('/:id', v.patchUser, patchUserController.handle)

userRoutes.delete('/:id', v.deleteUser, deleteUserController.handle)

export { userRoutes }
