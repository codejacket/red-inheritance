<script name="App" setup>
const themeVariable = reactive({
  '--global-primary-color': 'var(--red-primary)',
  '--global-checked-color': 'var(--red-secondary)',
})
</script>

<template>
  <lay-config-provider :themeVariable="themeVariable">
    <router-view />
  </lay-config-provider>
</template>

<style scoped></style>
