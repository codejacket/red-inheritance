import { useMediaQuery } from '@vueuse/core'

export const useAppStore = defineStore('app', () => {
  const title = ref('红脉传承')
  const isPhone = useMediaQuery('(min-width: 320px) and (max-width: 480px)')
  const isDesktop = useMediaQuery('(min-width: 769px)')

  const deviceType = computed(() => {
    return isDesktop.value ? 'desktop' : isPhone.value ? 'phone' : 'pad'
  })

  return {
    title,
    deviceType,
    isPhone,
    isDesktop,
  }
})
