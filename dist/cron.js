"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }require('./database');
var _Cron = require('./lib/Cron'); var _Cron2 = _interopRequireDefault(_Cron);

// 0 0 0/8 1/1 * *
// eslint-disable-next-line no-new
const Job = new (0, _Cron2.default)('10 * * * * *')
Job.init(
  'https://rickandmortyapi.com/api/character/',
  Job.getInformations.bind(Job)
).start()
