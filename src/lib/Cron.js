import cron from 'node-cron'

class Cron {
  constructor () {
    this.init()
  }

  init () {
    this.job = cron.schedule('*/8 * * * * *', () => {
      console.log('ok')
    }, null, true)
  }
}

export default new Cron()
