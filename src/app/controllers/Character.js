import { queryBuilder } from '../services/queryBuilder'
import CharacterModel from '../models/Characters'

class CharacterController {
  async index (req, res) {
    const { query } = req

    const where = queryBuilder(query)
    const characteres = await CharacterModel.findAll(where)
    res.status(200).json(characteres)
  }
}

export default new CharacterController()
