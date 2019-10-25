import { Model } from 'sequelize'

import CronLib from '../../src/lib/Cron'
import axios from 'axios'

import { sleep } from '../utils/helper'
import { rickAndMortyResult, rickAndMortyResultConcat, rickAndMortyResolved } from '../mock/unit/CronLib'

const cronTime = '* * * * * *'
const URL = 'https://rickandmortyapi.com/api/character/'

const updateDatabase = CronLib.prototype.updateDatabase
const resolveCharacteres = CronLib.prototype.resolveCharacteres

describe('Cron Jobs', () => {
  beforeEach(() => {
    CronLib.prototype.updateDatabase = updateDatabase
    CronLib.prototype.resolveCharacteres = resolveCharacteres
    jest.clearAllMocks()
    jest.resetAllMocks()
  })
  test('Should be initialized job', async (done) => {
    const Cron = new CronLib(cronTime)
    const callback = jest.fn()
    Cron.init(URL, callback)

    expect(callback).not.toBeCalled()
    await sleep(1000)
    expect(callback).toHaveBeenCalledTimes(1)
    expect(Cron.status).toEqual('scheduled')
    done()
  })

  test('Should be fail in initialized job', () => {
    const Cron = new CronLib(cronTime)
    Cron.init()
    expect(Cron.status).toEqual('failed')
  })

  test('Should be run job', async (done) => {
    axios.get = jest.fn()
      .mockResolvedValue(rickAndMortyResult)
      .mockResolvedValue(rickAndMortyResult)

    CronLib.prototype.updateDatabase = jest.fn()

    const Cron = new CronLib()
    await Cron.getInformations(URL)

    expect(CronLib.prototype.updateDatabase).toBeCalled()
    done()
  })

  test('Should be started job', () => {
    const Cron = new CronLib(cronTime)
    Cron.init(URL).start()
    expect(Cron.status).toEqual('scheduled')
  })

  test('Should be failed in start job', () => {
    const Cron = new CronLib(cronTime)
    const response = Cron.start()
    expect(response).toEqual('You need first initilize a job')
  })

  test('Should be destroy a job', () => {
    const Cron = new CronLib(cronTime)
    Cron.init(URL)
    Cron.destroy()
    expect(Cron.status).toEqual('destroyed')
  })

  test('Should be failed in destroy', () => {
    const Cron = new CronLib(cronTime)
    const response = Cron.destroy()
    expect(response).toEqual('You need first initilize a job')
  })

  test('Should be stop a job', () => {
    const Cron = new CronLib(cronTime)
    Cron.init(URL)
    Cron.stop()
    expect(Cron.status).toEqual('stoped')
  })

  test('Shoul be failed in stop a job', () => {
    const Cron = new CronLib(cronTime)
    const response = Cron.stop()
    expect(response).toEqual('You need first initilize a job')
  })

  test('Should be create characteres', async (done) => {
    CronLib.prototype.resolveCharacteres = jest
      .fn()
      .mockResolvedValueOnce(rickAndMortyResolved)
      .mockResolvedValueOnce(rickAndMortyResolved)
      .mockResolvedValueOnce(rickAndMortyResolved)

    const Cron = new CronLib(cronTime)
    const results = await Cron.updateDatabase(rickAndMortyResultConcat)
    const isTruthy = results.every(({ success }) => success)
    expect(isTruthy).toBeTruthy()
    done()
  })

  test('Should be failed in create characteres', async (done) => {
    CronLib.prototype.resolveCharacteres = jest
      .fn()
      .mockRejectedValue(rickAndMortyResolved)
      .mockResolvedValueOnce(rickAndMortyResolved)
      .mockResolvedValueOnce(rickAndMortyResolved)

    const Cron = new CronLib(cronTime)
    const results = await Cron.updateDatabase(rickAndMortyResultConcat)
    const isTruthy = results.every(({ success }) => success)
    expect(isTruthy).toBeFalsy()
    done()
  })

  test('Should be can update or create character', () => {
    const findOne = jest.spyOn(Model, 'findOne')
    const Cron = new CronLib(cronTime)

    const result = Cron.resolveCharacteres(rickAndMortyResolved, rickAndMortyResolved.idCharacterOriginal)
    console.log(result)
  })
})
