import { isNil } from 'lodash-es'
import { Random } from 'mockjs'

export function fn(...methods) {
  return function (...args) {
    for (let { types, method } of methods) {
      let ts = types?.split?.(' ') || types
      if (
        ts.length === args.length &&
        ts.every((type, i) => {
          let t = Object.prototype.toString.call(args[i])
          return type === 'any' || type === t.slice(8, -1).toLowerCase()
        })
      ) {
        return method(...args)
      }
    }
  }
}

export function filterByQuery(list, query, config) {
  if (query === undefined) return list
  return list.filter(item => {
    return Object.entries(config).every(([prop, type]) => {
      let iv = item?.[prop]
      let qv = query?.[prop]
      if (isNil(qv) || qv === '') return true
      switch (type) {
        case 'eq':
          return eq(iv, qv)
        case 'like':
          return iv.includes(qv)
        case 'between':
          return new Date(iv) >= new Date(qv[0]) && new Date(iv) <= new Date(qv[1])
        case 'in':
          return qv.includes(iv)
        default:
          if (typeof type === 'function') {
            return type(iv, qv)
          }
      }
    })
  })
}

export function randomYear(min, max) {
  return Random.integer(min, max).toString()
}
