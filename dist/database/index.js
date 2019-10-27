"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);
var _Characters = require('../app/models/Characters'); var _Characters2 = _interopRequireDefault(_Characters);

const models = [_Characters2.default]

class Database {
  constructor () {
    this.init()
  }

  init () {
    this.connection = new (0, _sequelize2.default)(_database2.default)
    models.map(model => model.init(this.connection))
  }
}

exports. default = new Database()
