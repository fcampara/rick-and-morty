import { Op } from 'sequelize'
import { queryBuilder } from '../../src/app/services/queryBuilder'

describe('Query Builder Services', () => {
  test('Should return query to search by name', () => {
    const query = {
      name: 'Test'
    }
    const response = queryBuilder(query)
    expect(response).toEqual({ where: { name: { [Op.iLike]: `%${query.name}%` } } })
  })

  test('Should return query to search by location', () => {
    const query = {
      location: 'Test'
    }
    const response = queryBuilder(query)
    expect(response).toEqual({ where: { location: { [Op.iLike]: `%${query.location}%` } } })
  })

  test('Should return query to search by origin', () => {
    const query = {
      origin: 'Test'
    }
    const response = queryBuilder(query)
    expect(response).toEqual({ where: { origin: { [Op.iLike]: `%${query.origin}%` } } })
  })

  test('Should return query to search by id', () => {
    const query = {
      id: 1
    }
    const response = queryBuilder(query)
    expect(response).toEqual({ where: { id: { [Op.eq]: query.id } } })
  })

  test('Should return query to search by dimensionsCount', () => {
    const query = {
      dimensionsCount: 1
    }
    const response = queryBuilder(query)
    expect(response).toEqual({ where: { dimensionsCount: { [Op.eq]: query.dimensionsCount } } })
  })

  test('Should return query to search by idCharacterOriginal', () => {
    const query = {
      idCharacterOriginal: 1
    }
    const response = queryBuilder(query)
    expect(response).toEqual({ where: { idCharacterOriginal: { [Op.eq]: query.idCharacterOriginal } } })
  })

  test('Should return query to search with limit', () => {
    const query = {
      limit: 10
    }
    const response = queryBuilder(query)
    expect(response).toEqual({ where: { }, limit: query.limit })
  })

  test('Should return query to search with offset', () => {
    const query = {
      offset: 10
    }
    const response = queryBuilder(query)
    expect(response).toEqual({ where: {}, offset: query.offset })
  })

  test('Should return query with orderbBy without order', () => {
    const query = {
      orderBy: 'name'
    }

    const [order, by = 'ASC'] = query.orderBy.split(' ')
    const response = queryBuilder(query)
    expect(response).toEqual({ where: {}, order: [[order, by]] })
  })

  test('Should return query with orderbBy and set order DESC', () => {
    const query = {
      orderBy: 'name DESC'
    }

    const [order, by] = query.orderBy.split(' ')
    const response = queryBuilder(query)
    expect(response).toEqual({ where: {}, order: [[order, by]] })
  })
})
