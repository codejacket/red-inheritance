<script name="Main" setup></script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition :name="route.meta?.transition" mode="out-in">
      <component :is="Component" :key="route.path" />
    </transition>
  </router-view>
</template>
