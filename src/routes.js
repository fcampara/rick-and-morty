import { Router } from 'express'

const routes = new Router()

routes.get('/', (req, res) => {
  res.json({ message: 'Is alive!' })
})

routes.get('/users', (req, res) => {
  res.json([{ name: 'John Doe' }])
})

routes.post('/users', (req, res) => {
  const { body } = req
  res.status(201).json(body)
})

export default routes
