"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');

 const queryBuilder = (query) => {
  const myQuery = { where: {} }
  for (const searchBy in query) {
    switch (searchBy) {
      case 'name':
      case 'location':
      case 'origin':
        myQuery.where[searchBy] = {
          [_sequelize.Op.iLike]: `%${query[searchBy]}%`
        }
        break

      case 'id':
      case 'dimensionsCount':
      case 'idCharacterOriginal':
        myQuery.where[searchBy] = {
          [_sequelize.Op.eq]: query[searchBy]
        }
        break

      case 'limit':
        myQuery.limit = query[searchBy]
        break

      case 'offset':
        myQuery.offset = query[searchBy]
        break

      case 'orderBy': {
        const [by, order = 'ASC'] = query[searchBy].split(' ')
        myQuery.order = [[by, order]]
        break
      }
    }
  }
  return myQuery
}; exports.queryBuilder = queryBuilder
