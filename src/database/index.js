import Sequelize from 'sequelize'

import databaseConfig from '../config/database'
import Characters from '../app/models/Characters'

const models = [Characters]

class Database {
  constructor () {
    this.init()
  }

  init () {
    this.connection = new Sequelize(databaseConfig)
    models.map(model => model.init(this.connection))
  }
}

export default new Database()
