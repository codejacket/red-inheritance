const layoutConf = {
  // 全国
  '100000_full': {
    layoutSize: '160%',
    layoutCenter: ['50%', '65%'],
  },

  // 北京市
  '110000_full': {
    layoutSize: '100%',
    layoutCenter: ['50%', '45%'],
  },
  // 天津市
  '120000_full': {
    layoutSize: '100%',
    layoutCenter: ['50%', '45%'],
  },
  // 重庆市
  '500000_full': {
    layoutSize: '100%',
    layoutCenter: ['50%', '45%'],
  },

  // 河北省
  '130000_full': {
    layoutSize: '100%',
    layoutCenter: ['50%', '45%'],
  },
  // 山西省
  '140000_full': {
    layoutSize: '100%',
    layoutCenter: ['50%', '45%'],
  },
  // 内蒙古自治区
  '150000_full': {
    layoutSize: '130%',
    layoutCenter: ['50%', '45%'],
  },
  // 辽宁省
  '210000_full': {
    layoutSize: '100%',
    layoutCenter: ['50%', '45%'],
  },
  // 吉林省
  '220000_full': {
    layoutSize: '120%',
    layoutCenter: ['50%', '45%'],
  },
  // 黑龙江省
  '230000_full': {
    layoutSize: '105%',
    layoutCenter: ['52%', '46%'],
  },
  // 江苏省
  '320000_full': {
    layoutSize: '100%',
    layoutCenter: ['50%', '46%'],
  },
  // 浙江省
  '330000_full': {
    layoutSize: '100%',
    layoutCenter: ['50%', '46%'],
  },
  // 安徽省
  '340000_full': {
    layoutSize: '100%',
    layoutCenter: ['50%', '45%'],
  },
  // 福建省
  '350000_full': {
    layoutSize: '100%',
    layoutCenter: ['50%', '45%'],
  },
  // 江西省
  '360000_full': {
    layoutSize: '100%',
    layoutCenter: ['50%', '45%'],
  },
  // 山东省
  '370000_full': {
    layoutSize: '100%',
    layoutCenter: ['50%', '45%'],
  },
  // 河南省
  '410000_full': {
    layoutSize: '100%',
    layoutCenter: ['50%', '45%'],
  },
  // 湖北省
  '420000_full': {
    layoutSize: '100%',
    layoutCenter: ['50%', '45%'],
  },
  // 湖南省
  '430000_full': {
    layoutSize: '100%',
    layoutCenter: ['50%', '45%'],
  },
  // 广东省
  '440000_full': {
    layoutSize: '100%',
    layoutCenter: ['50%', '45%'],
  },
  // 广西壮族自治区
  '450000_full': {
    layoutSize: '100%',
    layoutCenter: ['50%', '45%'],
  },
  // 海南省
  '460000_full': {
    layoutSize: '500%',
    layoutCenter: ['95%', '195%'],
  },
  // 四川省
  '510000_full': {
    layoutSize: '100%',
    layoutCenter: ['50%', '45%'],
  },
  // 贵州省
  '520000_full': {
    layoutSize: '100%',
    layoutCenter: ['50%', '45%'],
  },
  // 云南省
  '530000_full': {
    layoutSize: '100%',
    layoutCenter: ['50%', '45%'],
  },
  // 西藏自治区
  '540000_full': {
    layoutSize: '120%',
    layoutCenter: ['50%', '45%'],
  },
  // 陕西省
  '610000_full': {
    layoutSize: '100%',
    layoutCenter: ['50%', '45%'],
  },
  // 甘肃省
  '620000_full': {
    layoutSize: '100%',
    layoutCenter: ['50%', '45%'],
  },
  // 青海省
  '630000_full': {
    layoutSize: '100%',
    layoutCenter: ['50%', '45%'],
  },
  // 宁夏回族自治区
  '640000_full': {
    layoutSize: '100%',
    layoutCenter: ['50%', '45%'],
  },
  // 新疆维吾尔自治区
  '650000_full': {
    layoutSize: '120%',
    layoutCenter: ['50%', '45%'],
  },

  // 台湾省
  '710000_full': {
    layoutSize: '100%',
    layoutCenter: ['50%', '45%'],
  },
  // 香港特别行政区
  '810000_full': {
    layoutSize: '100%',
    layoutCenter: ['50%', '45%'],
  },
  // 澳门特别行政区
  '820000_full': {
    layoutSize: '100%',
    layoutCenter: ['50%', '45%'],
  },
}

export function getOptions(mapId = '100000_full', data, landmarkData = []) {
  const { layoutCenter = ['50%', '45%'], layoutSize = '100%' } = layoutConf[mapId] || {}
  return {
    backgroundColor: 'transparent',
    geo: [
      {
        layoutCenter,
        layoutSize,
        show: true,
        map: mapId,
        roam: false,
        zoom: 0.7,
        label: {
          color: 'gold',
          fontSize: '120%',
        },
        itemStyle: {
          areaColor: '#e6a0a0',
          borderColor: '#fff',
          borderWidth: 1,
        },
        emphasis: {
          label: {
            color: 'gold',
            fontSize: '120%',
          },
          itemStyle: {
            areaColor: '#c91d1d',
          },
        },
        select: {
          label: {
            color: 'gold',
            fontSize: '120%',
            show: false,
          },
          itemStyle: {
            areaColor: '#e6a0a0',
          },
        },
      },
    ],
    series: [
      {
        type: 'map',
        map: mapId,
        geoIndex: 0,
        roam: true,
        zlevel: 0,
        zoom: 0.7,
        animation: false,
        layoutCenter,
        layoutSize,
        data,
      },
      {
        type: 'scatter',
        coordinateSystem: 'geo',
        symbol: 'circle',
        symbolSize: 13,
        data: landmarkData,
        itemStyle: {
          color: '#fabc61',
          borderColor: '#cf975a',
          borderWidth: 2,
          shadowBlur: 8,
          shadowColor: '#cf975acc',
        },
        emphasis: {
          symbolSize: 18,
          itemStyle: {
            borderWidth: 3,
            shadowBlur: 12,
          },
        },
        tooltip: {
          trigger: 'item',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          borderColor: '#aaa',
          show: true,
          formatter: params => {
            return `<div style="text-align:center;color:#c91d1d">${params.name}</div>`
          },
        },
      },
    ],
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      borderColor: '#aaa',
      show: mapId === '100000_full',
      formatter: params => {
        return `
          <div style="text-align:center">${params.name}</div>
          <div>国家级烈士纪念设施：${params.data.national || 0}处</div>
          <div>省级烈士纪念设施：${params.data.provincial || 0}处</div>
        `
      },
    },
  }
}
