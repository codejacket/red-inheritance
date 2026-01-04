<script name="Swiper" setup>
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper } from 'swiper/vue'

const modules = [Autoplay, Navigation, Pagination]
</script>

<template>
  <swiper
    :modules="modules"
    :pagination="{
      clickable: true,
    }"
    :autoplay="{
      delay: 500000000,
      pauseOnMouseEnter: true,
      disableOnInteraction: false,
    }"
    navigation
    loop
  >
    <slot />
  </swiper>
</template>

<style lang="scss" scoped>
.swiper {
  --swiper-theme-color: var(--gold);

  :deep(.swiper-button-prev),
  :deep(.swiper-button-next) {
    position: absolute;
    top: var(--swiper-navigation-top-offset, 50%);
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    color: #fff;
    cursor: pointer;
    user-select: none;
    background: rgb(0 0 0 / 20%);
    border-radius: 50%;
    opacity: 0;
    transform: translateY(-50%);
    transition: 0.3s;

    &:hover {
      opacity: 1;
    }
  }

  :deep(.swiper-button-prev) {
    left: 10px;

    svg {
      transform: rotate(180deg);
    }
  }

  :deep(.swiper-button-next) {
    right: 10px;
  }

  :deep(.swiper-wrapper) {
    &:hover ~ {
      .swiper-button-prev,
      .swiper-button-next {
        opacity: 1;
      }
    }
  }
}
</style>
