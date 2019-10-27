"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _nodecron = require('node-cron'); var _nodecron2 = _interopRequireDefault(_nodecron);
var _Characters = require('../app/models/Characters'); var _Characters2 = _interopRequireDefault(_Characters);
var _axios = require('axios'); var _axios2 = _interopRequireDefault(_axios);

class Cron {
  constructor (scheduleTime) {
    this.scheduleTime = scheduleTime
  }

  get status () {
    if (!this.job) return 'failed'
    return this.job.getStatus()
  }

  init (URL, callback) {
    if (!URL) return 'You need pass url to initialize a job'
    this.job = _nodecron2.default.schedule(this.scheduleTime, () => { callback(URL) }, null, true)
    return this
  }

  start () {
    if (!this.job) return 'You need first initilize a job'
    this.job.start()
    return this
  }

  stop () {
    if (!this.job) return 'You need first initilize a job'
    this.job.stop()
    return this
  }

  destroy () {
    if (!this.job) return 'You need first initilize a job'
    this.job.destroy()
    return this
  }

  async getInformations (URL) {
    const results = []
    const { data } = await _axios2.default.get(URL)
    results.push(data.results)
    const promises = [...new Array(data.info.pages)].map((_, page) => _axios2.default.get(`${URL}?page=${page + 1}`))
    promises.shift()

    await Promise.all(promises).then((response) => {
      for (const { data } of response) {
        if (data) results.push(data.results)
      }
    })

    this.updateDatabase(results.flat(1))
  }

  async updateDatabase (characteres) {
    const results = []
    for (const character of characteres) {
      const dimensionsCount = characteres.filter((element) => element.name.toLowerCase() === character.name.toLowerCase()).length
      const { id, name, location, origin, episode, image } = character

      const payload = {
        name,
        image,
        episode,
        dimensionsCount,
        origin: origin.name,
        idCharacterOriginal: id,
        location: location.name
      }

      await this.resolveCharacteres(payload, id).catch(err => {
        results.push({ success: false, payload: err })
      })
      results.push({ success: true, payload })
    }
    return results
  }

  async resolveCharacteres (payload, idCharacterOriginal) {
    const hasCharacter = await _Characters2.default.findOne({ where: { id_character_original: idCharacterOriginal } })
    return hasCharacter ? hasCharacter.update(payload) : _Characters2.default.create(payload)
  }
}

exports. default = Cron
