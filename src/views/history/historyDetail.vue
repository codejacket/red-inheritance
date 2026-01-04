<script name="HistoryDetail" setup>
import { getHistoryDetail } from '@/api/history'
import Markdown from '@/components/Markdown'
import { print } from '@/utils'

const route = useRoute()
const loading = ref(false)
const history = ref({})

getHistory()

async function getHistory() {
  loading.value = true
  const { data } = await getHistoryDetail(route.params.eventId)
  history.value = data
  loading.value = false
}

function handlePrint() {
  print(history.value.content)
}
</script>

<template>
  <div class="app-container">
    <div class="history-detail">
      <lay-skeleton :loading="loading" animated>
        <template #skeleton>
          <div class="flex justify-center">
            <lay-skeleton-item style="width: 240px" type="p" />
          </div>
          <div class="history-detail-info">
            <lay-skeleton-item style="width: 180px" type="p" />
          </div>
          <div class="history-detail-content">
            <br />
            <lay-skeleton-item v-for="_ in 10" type="p" />
          </div>
        </template>
        <h1 class="text-center color-red-primary mb24px">{{ history?.eventName }}</h1>
        <div class="history-detail-info">
          <span class="mr10px">{{ history?.releaseTime }}</span>
          <span>{{ history?.source }}</span>
        </div>
        <div class="history-detail-content">
          <Markdown :content="history?.content" />
        </div>
      </lay-skeleton>
      <div class="history-detail-bottom">
        <div @click="handlePrint">
          <svg-icon icon="print" />
          <span class="ml5px">打印</span>
        </div>
        <lay-tooltip trigger="click">
          <div>
            <svg-icon icon="paper-plane" />
            <span class="ml5px">分享</span>
          </div>
          <template #content>
            <lay-qrcode text="http://www.layui-vue.com" />
          </template>
        </lay-tooltip>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.history-detail {
  padding: 30px;
  margin: 30px auto;
  background-color: #fff;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-in-md);

  .history-detail-info {
    display: flex;
    justify-content: center;
    padding-bottom: 15px;
    font-size: 18px;
    line-height: 2;
    color: #888;
    border-bottom: 1px solid #ccc;
  }

  .history-detail-content {
    padding: 10px;
    font-size: 18px;
  }

  .history-detail-bottom {
    display: flex;
    gap: 30px;
    justify-content: end;
    margin-top: 20px;

    div {
      font-size: 15px;
      color: #999;
      cursor: pointer;
      user-select: none;
      transition: 0.3s;

      &:hover {
        color: var(--red-primary);
      }

      &:active {
        color: var(--red-dark);
      }
    }
  }
}
</style>
