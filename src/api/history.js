import request from '@/utils/request'

export function listHistory(params) {
  return request({
    url: '/history',
    method: 'get',
    params,
  })
}

export function getHistoryDetail(eventId) {
  return request({
    url: `/history/${eventId}`,
    method: 'get',
  })
}
