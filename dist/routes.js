"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express');

var _Character = require('./app/controllers/Character'); var _Character2 = _interopRequireDefault(_Character);

const routes = new (0, _express.Router)()

routes.get('/', (req, res) => {
  res.json({ message: 'Is alive!' })
})

routes.get('/character', _Character2.default.index)

exports. default = routes
