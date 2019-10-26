import { Router } from 'express'

import CharacterController from './app/controllers/Character'

const routes = new Router()

routes.get('/', (req, res) => {
  res.json({ message: 'Is alive!' })
})

routes.get('/character', CharacterController.index)

export default routes
