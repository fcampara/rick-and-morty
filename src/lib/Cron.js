import cron from 'node-cron'
import Characteres from '../app/models/characters'
import axios from 'axios'

class Cron {
  constructor () {
    this.init()
  }

  async init () {
    this.job = cron.schedule('0 0 0/8 1/1 * *', async () => {
      const URL = 'https://rickandmortyapi.com/api/character/'
      const results = []
      const { data } = await axios.get(URL)
      results.push(data.results)
      const promises = [...new Array(data.info.pages)].map((_, page) => axios.get(`https://rickandmortyapi.com/api/character/?page=${page + 1}`))
      promises.shift()

      await Promise.all(promises).then((response) => {
        for (const { data } of response) {
          if (data) results.push(data.results)
        }
      })

      this.updateDatabase(results.flat(1))
    }, null, true)
  }

  async updateDatabase (characteres) {
    for (const character of characteres) {
      const { id, name, location, origin, episode, image } = character
      const payload = {
        idCharacterOriginal: id,
        location: location.name,
        origin: origin.name,
        image,
        name,
        episode
      }
      const hasCharacter = await Characteres.findOne({ where: { id_character_original: id } })

      await hasCharacter ? hasCharacter.update(payload) : Characteres.create(payload)
    }
  }
}

export default new Cron()
