import Sequelize from 'sequelize'

import databaseConfig from '../config/database'
import characters from '../app/models/characters'

const models = [characters]

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
