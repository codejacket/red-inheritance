import request from '@/utils/request'

export function listHero(params) {
  return request({
    url: '/hero',
    method: 'get',
    params,
  })
}

export function getHeroDetail(heroId) {
  return request({
    url: `/hero/${heroId}`,
    method: 'get',
  })
}
