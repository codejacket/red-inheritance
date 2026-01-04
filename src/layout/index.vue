<script name="Layout" setup>
import Backtop from '@/layout/components/Backtop'
import Footer from '@/layout/components/Footer'
import Main from '@/layout/components/Main'
import Navbar from '@/layout/components/Navbar'
import { useAppStore } from '@store/app'

const headerHeight = 64
const { isPhone } = storeToRefs(useAppStore())
</script>

<template>
  <lay-scroll
    :thumb-width="isPhone ? 0 : 6"
    class="layout-scroll"
    thumb-color="#8888"
    height="100vh"
  >
    <Navbar :height="headerHeight" />
    <div
      class="flex flex-col justify-between"
      :style="{ minHeight: `calc(100vh - ${headerHeight + 2}px)` }"
    >
      <Main />
      <Footer v-if="!$route.meta.nofooter" />
    </div>
    <Backtop v-if="!isPhone" />
  </lay-scroll>
</template>

<style lang="scss" scoped>
.layout-scroll {
  :deep(.layui-scroll-thumb) {
    cursor: pointer !important;
  }
}
</style>
