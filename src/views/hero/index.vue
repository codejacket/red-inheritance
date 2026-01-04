<script name="Hero" setup>
import { listHero } from '@/api/hero'
import CollapsibleDiv from '@/components/CollapsibleDiv'
import { deathTimeOptions, nativePlaceOptions } from '@/constants'
import { useAppStore } from '@store/app'

const router = useRouter()
const { isPhone } = storeToRefs(useAppStore())
const params = reactive({
  query: {
    name: '',
    nativePlace: nativePlaceOptions[0],
    deathTime: deathTimeOptions[0],
  },
  pageNum: 1,
  pageSize: 30,
})
const loading = ref(false)
const heroList = ref([])
const total = ref(0)
const pageOptions = computed(() => {
  if (isPhone.value) {
    return {
      pages: 1,
      total: total.value,
      layout: ['prev', 'page', 'next'],
    }
  } else {
    return {
      pages: 5,
      total: total.value,
      layout: ['prev', 'page', 'next', 'limits', 'skip'],
    }
  }
})

getList()

async function getList() {
  loading.value = true
  const { data } = await listHero(params)
  heroList.value = data.list
  total.value = data.total
  loading.value = false
}

function selectNativePlace(val) {
  params.query.nativePlace = val
  getList()
}

function selectDeathTime(val) {
  params.query.deathTime = val
  getList()
}

function goHeroDetail(hero) {
  router.push({ path: `/heroDetail/${hero.id}` })
}
</script>

<template>
  <div class="app-container">
    <div class="text-center color-red-primary my-30px" v-enter:fadeIn.force>
      <svg-icon class="mr4px text-18px" icon="bell" />
      提示：本页面中所展示的烈士姓名均为虚构内容，仅用于前端学习使用，不对应任何真实烈士信息。
    </div>
    <div class="mb40px flex items-center justify-center">
      <input
        class="hero-input"
        v-model="params.query.name"
        placeholder="烈士搜索"
        @keyup.enter="getList"
      />
      <svg-icon class="btn-search" icon="search" />
    </div>
    <div class="card mb30px p30px">
      <div class="flex gap12px pb18px" style="border-bottom: 1px dashed #ddd">
        <div style="flex-shrink: 0; width: 80px; font-weight: bold; line-height: 31px">籍贯:</div>
        <collapsible-div class="gap12px">
          <template #default="{ visibleTotal }">
            <template v-for="(value, index) in nativePlaceOptions" :key="index">
              <div
                :class="['option-btn', { 'is-active': params.query.nativePlace === value }]"
                v-if="index < visibleTotal"
                @click="selectNativePlace(value)"
              >
                {{ value }}
              </div>
            </template>
          </template>
          <template #collapseBtn="{ collapse, toggle }">
            <div class="collapse-btn" @click="toggle">
              <span class="mr-4px">{{ collapse ? '更多' : '收起' }}</span>
              <svg-icon
                :style="{ transform: `rotateZ(${collapse ? '180' : '0'}deg)` }"
                icon="angle-up"
              />
            </div>
          </template>
        </collapsible-div>
      </div>
      <div class="flex gap12px pt18px">
        <div style="flex-shrink: 0; width: 80px; font-weight: bold; line-height: 31px">
          牺牲时间:
        </div>
        <div class="flex flex-wrap gap12px">
          <div
            :class="['option-btn', { 'is-active': params.query.deathTime === val }]"
            v-for="(val, i) in deathTimeOptions"
            :key="i"
            @click="selectDeathTime(val)"
          >
            {{ val }}
          </div>
        </div>
      </div>
    </div>
    <div class="card p30px xs:px20px">
      <div class="text-center color-red-primary text-14px">
        排名不分先后，以烈士姓氏首字母为序。
      </div>
      <lay-skeleton :loading="loading" animated>
        <template #skeleton>
          <div class="hero-list">
            <lay-skeleton-item
              style="width: 150px; height: 200px !important"
              v-for="_ in params.pageSize"
              type="image"
            />
          </div>
        </template>
        <div class="hero-list" v-if="heroList.length">
          <div class="hero-card" v-for="(hero, i) in heroList" :key="i" @click="goHeroDetail(hero)">
            <img v-if="hero.img" :src="hero.img" :alt="hero.name" />
            <div v-else>
              <img :alt="hero.name" src="@/assets/img/default-hero-avatar.png" />
              <div class="hero-img-name">{{ hero.name }}</div>
            </div>
          </div>
        </div>
        <lay-empty class="mt20px" v-else description="暂无查询" />
      </lay-skeleton>
    </div>
    <div class="flex justify-center mt30px">
      <lay-page
        v-model="params.pageNum"
        v-model:limit="params.pageSize"
        v-bind="pageOptions"
        @change="getList"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  margin-top: 10px;
  margin-bottom: 30px;

  .hero-input {
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
  }

  .btn-search {
    margin-left: -36px;
    font-size: 24px;
    color: var(--red-primary);
    cursor: pointer;
  }

  .option-btn {
    flex-shrink: 0;
    padding: 5px 20px;
    cursor: pointer;

    &.is-active {
      color: #fff;
      background: var(--red-primary);
    }
  }

  .collapse-btn {
    padding: 5px 20px;
    font-weight: bold;
    cursor: pointer;

    &:hover {
      color: var(--red-primary);
    }
  }

  .hero-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, 150px);
    grid-gap: 20px;
    justify-content: center;
    margin-top: 20px;
    background: url('@/assets/img/lotus.png') no-repeat center center;

    @include respond-to('phone') {
      grid-template-columns: repeat(auto-fill, calc(50% - 10px));
    }

    .hero-card {
      position: relative;
      overflow: hidden;
      cursor: pointer;
      border-radius: 2px;
      box-shadow: var(--shadow-out-sm);
      transition: all 0.3s;

      &:hover {
        box-shadow: var(--shadow-out-md);
        transform: scale(1.05);
      }

      img {
        box-sizing: border-box;
        width: 100%;
        vertical-align: middle;
        background: #ccc;
        border: 8px solid #ccc;
      }

      .hero-img-name {
        position: absolute;
        top: 12%;
        left: 14%;
        font-size: 18px;
        font-weight: 900;
        color: transparent;
        letter-spacing: 4px;
        background: linear-gradient(to right, #f67633, #be000d);
        background-clip: text;
      }
    }
  }
}
</style>
