import qs from 'qs'
import { landmarkList } from '../data'
import { success } from '../utils/result'

export default [
  {
    url: `/mock/landmark/statistics`,
    method: 'get',
    response: () => {
      return success({
        // 北京市
        '110000_full': {
          national: 5,
          provincial: 4,
        },
        // 天津市
        '120000_full': {
          national: 4,
          provincial: 0,
        },
        // 重庆市
        '500000_full': {
          national: 7,
          provincial: 16,
        },
        // 河北省
        '130000_full': {
          national: 16,
          provincial: 38,
        },
        // 山西省
        '140000_full': {
          national: 10,
          provincial: 12,
        },
        // 内蒙古自治区
        '150000_full': {
          national: 6,
          provincial: 19,
        },
        // 辽宁省
        '210000_full': {
          national: 8,
          provincial: 7,
        },
        // 吉林省
        '220000_full': {
          national: 10,
          provincial: 14,
        },
        // 黑龙江省
        '230000_full': {
          national: 11,
          provincial: 8,
        },
        // 江苏省
        '320000_full': {
          national: 17,
          provincial: 25,
        },
        // 浙江省
        '330000_full': {
          national: 9,
          provincial: 16,
        },
        // 安徽省
        '340000_full': {
          national: 15,
          provincial: 14,
        },
        // 福建省
        '350000_full': {
          national: 12,
          provincial: 4,
        },
        // 江西省
        '360000_full': {
          national: 19,
          provincial: 47,
        },
        // 山东省
        '370000_full': {
          national: 33,
          provincial: 62,
        },
        // 河南省
        '410000_full': {
          national: 16,
          provincial: 24,
        },
        // 湖北省
        '420000_full': {
          national: 18,
          provincial: 28,
        },
        // 湖南省
        '430000_full': {
          national: 24,
          provincial: 19,
        },
        // 广东省
        '440000_full': {
          national: 11,
          provincial: 27,
        },
        // 广西壮族自治区
        '450000_full': {
          national: 15,
          provincial: 21,
        },
        // 海南省
        '460000_full': {
          national: 5,
          provincial: 11,
        },
        // 四川省
        '510000_full': {
          national: 11,
          provincial: 19,
        },
        // 贵州省
        '520000_full': {
          national: 7,
          provincial: 14,
        },
        // 云南省
        '530000_full': {
          national: 12,
          provincial: 11,
        },
        // 西藏自治区
        '540000_full': {
          national: 5,
          provincial: 1,
        },
        // 陕西省
        '610000_full': {
          national: 14,
          provincial: 19,
        },
        // 甘肃省
        '620000_full': {
          national: 8,
          provincial: 6,
        },
        // 青海省
        '630000_full': {
          national: 3,
          provincial: 1,
        },
        // 宁夏回族自治区
        '640000_full': {
          national: 6,
          provincial: 1,
        },
        // 新疆维吾尔自治区
        '650000_full': {
          national: 7,
          provincial: 9,
        },
        // 台湾省
        '710000_full': {
          national: 0,
          provincial: 0,
        },
        // 香港特别行政区
        '810000_full': {
          national: 0,
          provincial: 0,
        },
        // 澳门特别行政区
        '820000_full': {
          national: 0,
          provincial: 0,
        },
      })
    },
  },
  {
    url: '/mock/landmark',
    method: 'get',
    response: ({ query }) => {
      const {
        pageNum,
        pageSize,
        query: { mapId },
      } = qs.parse(query, { comma: true })
      let list = mapId === '100000_full' ? Object.values(landmarkList).flat() : landmarkList[mapId]
      return success({
        list: list.slice((pageNum - 1) * pageSize, pageNum * pageSize),
        total: list.length,
      })
    },
  },
]
