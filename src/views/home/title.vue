<script name="Title" setup>
const props = defineProps({
  title: {
    type: String,
  },
  fontSize: {
    type: String,
    default: '28px',
  },
  fontWeight: {
    type: Number,
    default: 600,
  },
})

const slots = useSlots()
</script>

<template>
  <h3 class="title" :style="{ fontSize, fontWeight }">
    <div class="title-content">
      <slot v-if="slots.default" :title="title" />
      <span v-else>{{ title }}</span>
    </div>
  </h3>
</template>

<style lang="scss" scoped>
.title {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 600;
  color: var(--red-primary);

  &::before {
    width: 100%;
    height: 1px;
    content: '';
    background-color: var(--red-primary);
  }

  .title-content {
    flex-shrink: 0;
    margin: 0 1em;
    letter-spacing: 1px;
  }

  &::after {
    width: 100%;
    height: 1px;
    content: '';
    background-color: var(--red-primary);
  }
}
</style>
