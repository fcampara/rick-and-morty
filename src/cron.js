import './database'
import Cron from './lib/Cron'

// 0 0 0/8 1/1 * *
// eslint-disable-next-line no-new
const Job = new Cron('10 * * * * *')
Job.init(
  'https://rickandmortyapi.com/api/character/',
  Job.getInformations.bind(Job)
).start()
