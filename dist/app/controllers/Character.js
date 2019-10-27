"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _queryBuilder = require('../services/queryBuilder');
var _Characters = require('../models/Characters'); var _Characters2 = _interopRequireDefault(_Characters);

class CharacterController {
  async index (req, res) {
    const { query } = req

    const where = _queryBuilder.queryBuilder.call(void 0, query)
    const characteres = await _Characters2.default.findAll(where)
    res.status(200).json(characteres)
  }
}

exports. default = new CharacterController()
