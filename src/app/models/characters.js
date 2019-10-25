import Sequelize, { Model } from 'sequelize'

class Characters extends Model {
  static init (sequelize) {
    super.init({
      name: Sequelize.STRING,
      dimensionsCount: Sequelize.INTEGER,
      idCharacterOriginal: Sequelize.INTEGER,
      origin: Sequelize.STRING,
      location: Sequelize.STRING,
      image: Sequelize.STRING,
      episode: Sequelize.ARRAY(Sequelize.STRING)
    }, {
      sequelize
    })
    return this
  }
}

export default Characters
