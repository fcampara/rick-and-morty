import cron from 'node-cron'
import Characteres from '../app/models/characters'
import axios from 'axios'

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
    this.job = cron.schedule(this.scheduleTime, () => { callback(URL) }, null, true)
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
    const { data } = await axios.get(URL)
    results.push(data.results)
    const promises = [...new Array(data.info.pages)].map((_, page) => axios.get(`${URL}?page=${page + 1}`))
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
    const hasCharacter = await Characteres.findOne({ where: { id_character_original: idCharacterOriginal } })
    return hasCharacter ? hasCharacter.update(payload) : Characteres.create(payload)
  }
}

export default Cron
