"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Characters extends _sequelize.Model {
  static init (sequelize) {
    super.init({
      name: _sequelize2.default.STRING,
      dimensionsCount: _sequelize2.default.INTEGER,
      idCharacterOriginal: _sequelize2.default.INTEGER,
      origin: _sequelize2.default.STRING,
      location: _sequelize2.default.STRING,
      image: _sequelize2.default.STRING,
      episode: _sequelize2.default.ARRAY(_sequelize2.default.STRING)
    }, {
      sequelize
    })
    return this
  }
}

exports. default = Characters
