<script name="Card" setup>
const props = defineProps({
  title: {
    type: String,
  },
  titleIcon: {
    type: String,
  },
  titleAlign: {
    type: String,
    default: 'center',
  },
  borderRadius: {
    type: String,
    default: 'md',
  },
  boxShadow: {
    type: String,
    default: 'out-md',
  },
})

const borderRadiusMap = {
  'sm': 'var(--radius-sm)',
  'md': 'var(--radius-md)',
  'lg': 'var(--radius-lg)',
}

const boxShadowMap = {
  'in-sm': 'var(--shadow-in-sm)',
  'in-md': 'var(--shadow-in-md)',
  'out-sm': 'var(--shadow-out-sm)',
  'out-md': 'var(--shadow-out-md)',
}

const borderRadius = computed(() => {
  return borderRadiusMap[props.borderRadius] || props.borderRadius
})

const boxShadow = computed(() => {
  return boxShadowMap[props.boxShadow] || props.boxShadow
})
</script>

<template>
  <div class="card" :style="{ borderRadius, boxShadow }" v-enter:fadeInUp>
    <h3 class="card-title" :style="{ 'text-align': titleAlign }" v-if="title">
      <svg-icon v-if="titleIcon" :icon="titleIcon" />
      <span>{{ title }}</span>
    </h3>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.card {
  padding: 30px;

  .card-title {
    margin-top: -10px;
    margin-bottom: 20px;
    font-size: 24px;
    color: var(--red-primary);

    span {
      margin-left: 5px;
    }
  }
}
</style>
