import fs from 'fs'
import path from 'path'
import { historyList } from '../data'
import { success } from '../utils/result'

export default [
  {
    url: '/mock/history',
    method: 'get',
    response({ query }) {
      return success(historyList)
    },
  },
  {
    url: '/mock/history/:eventId',
    method: 'get',
    response({ query }) {
      for (let { events } of historyList) {
        for (let e of events) {
          let eventId = e.eventId
          if (eventId === query.eventId) {
            let itemPath = path.join('mock/resources/markdown', `${eventId}.md`)
            if (fs.existsSync(itemPath)) {
              e.content = fs.readFileSync(itemPath, 'utf-8')
            }
            return success(e)
          }
        }
      }
    },
  },
]
