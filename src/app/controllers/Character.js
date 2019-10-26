import { Op } from 'sequelize'
import CharacterModel from '../models/Characters'

class CharacterController {
  async index (req, res) {
    const { query } = req

    const queryBuilder = (query) => {
      const myQuery = { where: {} }
      for (const searchBy in query) {
        switch (searchBy) {
          case 'name':
          case 'location':
          case 'origin':
            myQuery.where[searchBy] = {
              [Op.iLike]: `%${query[searchBy]}%`
            }
            break

          case 'dimensionsCount':
          case 'idCharacterOriginal':
            myQuery.where[searchBy] = {
              [Op.eq]: query[searchBy]
            }
            break
        }
      }
      return myQuery
    }

    const where = queryBuilder(query)
    const characteres = await CharacterModel.findAll(where)
    res.status(200).json(characteres)
  }
}

export default new CharacterController()
