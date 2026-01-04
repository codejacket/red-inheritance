import request from '@/utils/request'

export function getCityJson(id) {
  return request({
    url: `https://geo.datav.aliyun.com/areas_v3/bound/${id}.json`,
    method: 'get',
  })
}

export function listLandmark(params) {
  return request({
    url: '/landmark',
    method: 'get',
    params,
  })
}

export function getLandmarkStatistics() {
  return request({
    url: `/landmark/statistics`,
    method: 'get',
  })
}
