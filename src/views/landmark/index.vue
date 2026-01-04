<script name="Landmark" setup>
import { getCityJson, getLandmarkStatistics, listLandmark } from '@/api/landmark'
import Card from '@/components/Card'
import { useAppStore } from '@store/app'
import * as echarts from 'echarts'
import { getOptions } from './options'

let router = useRouter()
let { isPhone } = storeToRefs(useAppStore())
let map = null
let mapRef = useTemplateRef('mapRef')
let loading = ref(false)
let landmark = reactive({
  statistics: {},
  list: [],
  total: 0,
})
let params = reactive({
  query: {
    mapId: '100000_full',
    mapName: '全国',
    search: '',
  },
  pageNum: 1,
  pageSize: 20,
})
let pageOptions = computed(() => {
  if (isPhone.value) {
    return {
      pages: 1,
      total: landmark.total,
      layout: ['prev', 'page', 'next'],
    }
  } else {
    return {
      pages: 5,
      total: landmark.total,
      layout: ['prev', 'page', 'next', 'limits', 'skip'],
    }
  }
})

onMounted(async () => {
  map = echarts.init(mapRef.value)
  map.on('click', handleMapClick)
  landmark.statistics = (await getLandmarkStatistics()).data
  window.addEventListener('resize', handleResize)
  loadMapData()
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

watch(() => params.query.mapId, loadMapData)

async function loadMapData(id = '100000_full') {
  loading.value = true
  let mapJson = await getCityJson(id)
  let { data } = await listLandmark(params)
  landmark.list = data.list
  landmark.total = data.total
  let options = getOptions(
    id,
    mapJson.features.map(({ properties }) => {
      let data = landmark.statistics[`${properties.adcode}_full`]
      return { ...properties, ...data }
    }),
    id === '100000_full' ? [] : landmark.list.map(toRaw),
  )
  echarts.registerMap(id, mapJson)
  map.setOption(options)
  loading.value = false
}

function handleMapClick(e) {
  switch (e.seriesType) {
    case 'map': {
      if (e?.data?.adcode && e?.data?.level === 'province') {
        switch (e.data.level) {
          case 'nation':
          case 'country':
          case 'province':
          case 'city': {
            setMap(`${e.data.adcode}_full`, e.data.name)
            break
          }
          case 'district': {
            setMap(e.data.adcode, e.data.name)
            break
          }
        }
      }
      break
    }
    case 'scatter': {
      goLandmarkDetail(e.data)
      break
    }
  }
}

function handleResize() {
  map?.resize?.()
}

function setMap(mapId = '100000_full', mapName = '全国') {
  params.query.mapId = mapId
  params.query.mapName = mapName
}

function goLandmarkDetail(landmark) {
  router.push({ path: `/landmarkDetail/${landmark.id}` })
}
</script>

<template>
  <div class="app-container">
    <div class="mt30px flex flex-col gap-20px items-center">
      <div class="landmark-input">
        <input v-model="params.query.search" placeholder="搜索地点" @keyup.enter="loadMapData()" />
        <svg-icon icon="search" @click="loadMapData()" />
      </div>
      <lay-breadcrumb separator="/">
        <lay-breadcrumb-item @click="setMap()">
          <em class="text-18px">全国</em>
        </lay-breadcrumb-item>
        <lay-breadcrumb-item v-if="params.query.mapName !== '全国'">
          <em class="text-18px">{{ params.query.mapName }}</em>
        </lay-breadcrumb-item>
      </lay-breadcrumb>
    </div>
    <div id="map" v-enter:fadeIn.force ref="mapRef" />
    <card
      class="pb40px xs:px12px"
      :title="`${params.query.mapName}烈士纪念馆`"
      title-icon="landmark"
    >
      <lay-skeleton :loading="loading" animated>
        <template #skeleton>
          <div class="landmark-list">
            <lay-skeleton-item
              style="width: 100%; aspect-ratio: 1"
              v-for="_ in params.pageSize"
              type="image"
            />
          </div>
        </template>
        <div class="landmark-list" v-if="landmark.list.length">
          <div
            class="landmark-card"
            v-for="(landmark, i) in landmark.list"
            v-enter:fadeInUp
            :key="i"
          >
            <img
              class="landmark-img img-zoom"
              v-if="landmark.img"
              :src="landmark.img"
              :alt="landmark.name"
            />
            <img
              class="landmark-img img-zoom"
              style="object-fit: contain"
              v-else
              :alt="landmark.name"
              src="@/assets/img/tombstone.png"
            />
            <div class="more-btn" @click="goLandmarkDetail(landmark)">
              <span>...</span>
            </div>
            <div class="landmark-info">
              <h3 class="text-ellipsis" :title="landmark.name">{{ landmark.name }}</h3>
              <p class="pt8px line-clamp-2" :title="landmark.address">
                地址：{{ landmark.address }}
              </p>
            </div>
          </div>
        </div>
        <lay-empty class="mt20px" v-else description="暂无查询" />
      </lay-skeleton>
    </card>
    <div class="flex justify-center mt30px">
      <lay-page
        v-model="params.pageNum"
        v-model:limit="params.pageSize"
        v-bind="pageOptions"
        @change="loadMapData()"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.landmark-input {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  input {
    width: 50%;
    padding: 4px 12px;
    font-size: 18px;
    line-height: 32px;
    outline: none;
    border: none;
    border-radius: var(--radius-sm);
    box-shadow: 0 0 0 1px #999 inset;
    transition: 0.3s;

    &:focus {
      box-shadow: 0 0 0 1px var(--red-primary) inset;
    }

    @include respond-to('phone') {
      width: 75%;
    }
  }

  svg {
    margin-left: -36px;
    font-size: 24px;
    color: var(--red-primary);
    cursor: pointer;
  }
}

#map {
  height: calc(100vh - 64px - 116px);
  aspect-ratio: 5 / 4;
  margin: 0 auto;

  @include respond-to('phone') {
    height: 80vw;
  }
}

.landmark-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  grid-gap: 20px;
  justify-content: center;

  @include respond-to('phone') {
    grid-template-columns: repeat(auto-fill, calc(50% - 18px));
  }

  .landmark-card {
    position: relative;
    overflow: hidden;
    border-radius: 2px;
    box-shadow: var(--shadow-out-sm);
    transition: all 0.3s;

    .landmark-img {
      width: 100%;
      aspect-ratio: 16 / 9;
      background: url('@/assets/img/lotus.png');
      background-repeat: no-repeat;
      background-size: contain;
    }

    .more-btn {
      position: absolute;
      top: 0;
      right: 0;
      width: 60px;
      height: 60px;
      cursor: pointer;
      background: rgb(128 128 128 / 40%);
      border-radius: 50%;
      transform: translate(100%, -100%);
      transition: 0.3s;

      span {
        position: absolute;
        bottom: 10%;
        left: 30%;
        user-select: none;
        transform: translate(-50%, -50%);
      }

      &:hover {
        background: rgb(128 128 128 / 60%);
      }
    }

    .landmark-info {
      padding: 8px 15px;

      p {
        color: #999;
      }
    }

    &:hover {
      .more-btn {
        transform: translate(50%, -50%);
      }
    }
  }
}
</style>
