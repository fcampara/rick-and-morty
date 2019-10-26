import { Model } from 'sequelize'
import CharacterController from '../../src/app/controllers/Character'
import { characterFindAllResolved } from '../mock/unit/characterController.js'

const mockResponse = () => {
  const res = {}
  res.status = jest.fn().mockReturnValue(res)
  res.json = jest.fn().mockReturnValue(res)
  return res
}

describe('Character Controller', () => {
  test('Should be return list with characteres', async () => {
    const findAll = jest.spyOn(Model, 'findAll')
    findAll.mockResolvedValue(characterFindAllResolved)

    const mockRequest = {
      query: null
    }
    const res = mockResponse()
    await CharacterController.index(mockRequest, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(findAll).toHaveBeenCalledTimes(1)
  })
})
