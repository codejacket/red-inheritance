import qs from 'qs'
import { heroList } from '../data'
import { success } from '../utils/result'

function isBetween(year, range) {
  let y = parseInt(year)
  if (range === '全部') {
    return true
  } else if (range === '1900年以前') {
    return y < 1900
  } else if (range === '1950以后') {
    return y > 1950
  } else {
    let [t1, t2] = range.split('-')
    return y >= t1 && y <= t2
  }
}

export default [
  {
    url: '/mock/hero',
    method: 'get',
    response({ query }) {
      const {
        pageNum,
        pageSize,
        query: { nativePlace, deathTime, name },
      } = qs.parse(query, { comma: true })
      return success({
        list: heroList
          .filter(hero => {
            return (
              hero.name.includes(name) &&
              (hero.sheng === nativePlace || nativePlace === '不限') &&
              isBetween(hero.deathYear, deathTime)
            )
          })
          .slice((pageNum - 1) * pageSize, pageNum * pageSize),
        total: heroList.length,
      })
    },
  },
  {
    url: '/mock/hero/:heroId',
    method: 'get',
    response({ query }) {
      return success(heroList.find(hero => `${hero.id}` === query.heroId))
    },
  },
]
