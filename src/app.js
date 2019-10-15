import express from 'express'
import cors from 'cors'
import routes from './routes'

class App {
  constructor () {
    this.server = express()

    this.middleware()
    this.routes()
  }

  middleware () {
    this.server.use(cors())
    this.server.use(express.json())
  }

  routes () {
    this.server.use('/api', routes)
  }
}

export default new App().server
