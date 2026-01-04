<script name="Backtop" setup>
import { useEventListener, useThrottleFn } from '@vueuse/core'

const target = '.layout-scroll > .layui-scroll-y .layui-scroll-wrap'
const visibilityHeight = 200
const visible = ref(false)
const el = shallowRef()

const emits = defineEmits(['click'])

useEventListener(el, 'scroll', useThrottleFn(handleScroll, 300, true))
onMounted(() => {
  el.value = document.querySelector(target) ?? document.documentElement
  handleScroll()
})

function handleScroll() {
  if (el.value) {
    visible.value = el.value.scrollTop >= visibilityHeight
  }
}

function handleClick(event) {
  el.value?.scrollTo?.({
    top: 0,
    behavior: 'smooth',
  })
  emits('click', event)
}
</script>

<template>
  <transition name="backtop-fade">
    <div class="backtop" v-if="visible" @click.stop="handleClick">
      <svg-icon icon="angle-up" />
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.backtop-fade-enter-active,
.backtop-fade-leave-active {
  transition: opacity 0.5s;
}

.backtop-fade-enter-from,
.backtop-fade-leave-to {
  opacity: 0;
}

.backtop {
  position: fixed;
  right: 40px;
  bottom: 40px;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-size: 20px;
  color: var(--red-primary);
  cursor: pointer;
  background: var(--gray-light);
  border-radius: 50%;
  box-shadow: var(--shadow-out-md);
}
</style>
