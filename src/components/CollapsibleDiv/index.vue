<script name="CollapsibleDiv" setup>
import { useResizeObserver } from '@vueuse/core'

const collapse = defineModel({ default: true })
const containerRef = useTemplateRef('containerRef')
const visibleTotal = ref(Infinity)

useResizeObserver(containerRef, () => {
  calcVisibleTotal(collapse.value)
})

watch(collapse, calcVisibleTotal)

function calcVisibleTotal(val) {
  if (val) {
    visibleTotal.value = 0
    let { paddingLeft, paddingRight, gap } = window.getComputedStyle(containerRef.value)
    let contentWidth = containerRef.value.clientWidth - parsePx(paddingLeft) - parsePx(paddingRight)
    let collapseBtnWidth = containerRef.value.lastElementChild.offsetWidth
    let remainSpace = contentWidth
    for (const el of Array.from(containerRef.value.children).slice(0, -1)) {
      let { marginLeft, marginRight } = window.getComputedStyle(el)
      remainSpace -= el.offsetWidth + parsePx(marginLeft) + parsePx(marginRight) + parsePx(gap)
      if (remainSpace < collapseBtnWidth) {
        break
      } else {
        visibleTotal.value++
      }
    }
  } else {
    visibleTotal.value = Infinity
  }
}

function parsePx(value) {
  return parseFloat(value.replace('px', ''))
}

function toggle() {
  collapse.value = !collapse.value
}
</script>

<template>
  <div class="flex flex-wrap" ref="containerRef">
    <slot :visibleTotal="visibleTotal" />
    <div style="margin-left: auto">
      <slot :collapse="collapse" :toggle="toggle" name="collapseBtn">
        <div class="default-collapse-btn" @click="toggle">
          <span>{{ collapse ? '更多' : '收起' }}</span>
          <svg-icon
            :style="{ transform: `rotateZ(${collapse ? '180' : '0'}deg)` }"
            icon="angle-up"
          />
        </div>
      </slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.default-collapse-btn {
  cursor: pointer;
}
</style>
