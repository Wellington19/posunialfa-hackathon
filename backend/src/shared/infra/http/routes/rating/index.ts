import { Router } from 'express'
import { ensureAuthenticated } from '@middlewares/isAuthenticated'
import * as v from './validators'

import { CreateRatingImcController } from '@modules/rating/useCases/createRatingImc/CreateRatingImcController'
import { FindRatingImcController } from '@modules/rating/useCases/findRatingImc/FindRatingImcController'
import { PatchRatingImcController } from '@modules/rating/useCases/patchRatingImc/PatchRatingImcController'
import { DeleteRatingImcController } from '@modules/rating/useCases/deleteRatingImc/DeleteRatingImcController'

const createRatingImcController = new CreateRatingImcController()
const findRatingImcController = new FindRatingImcController()
const patchRatingImcController = new PatchRatingImcController()
const deleteRatingImcController = new DeleteRatingImcController()

const ratingRoutes = Router()

ratingRoutes.use(ensureAuthenticated)
ratingRoutes.post('/imc', v.createRatingImc, createRatingImcController.handle)

ratingRoutes.get('/imc', v.findRatingImc, findRatingImcController.handle)

ratingRoutes.patch('/imc/:id', v.patchRatingImc, patchRatingImcController.handle)

ratingRoutes.delete('/imc/:id', v.deleteRatingImc, deleteRatingImcController.handle)

export { ratingRoutes }
