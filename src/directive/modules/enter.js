const map = new WeakMap()
const keyframes = {
  fadeIn: [
    {
      opacity: 0,
    },
    {
      opacity: 1,
    },
  ],
  fadeInUp: [
    {
      transform: `translateY(150px)`,
      opacity: 0,
    },
    {
      transform: `translateY(0)`,
      opacity: 1,
    },
  ],
  fadeInDown: [
    {
      transform: `translateY(-150px)`,
      opacity: 0,
    },
    {
      transform: `translateY(0)`,
      opacity: 1,
    },
  ],
  fadeInLeft: [
    {
      transform: `translateX(150px)`,
      opacity: 0,
    },
    {
      transform: `translateX(0)`,
      opacity: 1,
    },
  ],
  fadeInRight: [
    {
      transform: `translateX(-150px)`,
      opacity: 0,
    },
    {
      transform: `translateX(0)`,
      opacity: 1,
    },
  ],
  slideInUp: [
    {
      transform: `translateY(150px)`,
    },
    {
      transform: `translateY(0)`,
    },
  ],
  slideInDown: [
    {
      transform: `translateY(-150px)`,
    },
    {
      transform: `translateY(0)`,
    },
  ],
  slideInLeft: [
    {
      transform: `translateX(150px)`,
    },
    {
      transform: `translateX(0)`,
    },
  ],
  slideInRight: [
    {
      transform: `translateX(-150px)`,
    },
    {
      transform: `translateX(0)`,
    },
  ],
}

const ob = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      const animation = map.get(entry.target)
      if (animation) {
        animation.play()
        ob.unobserve(entry.target)
      }
    }
  }
})

export default {
  mounted(el, binding) {
    const { arg, modifiers, value } = binding
    const rect = el.getBoundingClientRect()
    if (rect.top - 150 > window.innerHeight || modifiers.force) {
      const animation = el.animate(
        keyframes[arg] || keyframes.fadeInUp,
        value || {
          duration: 600,
          easing: 'ease-in-out',
          fill: 'forwards',
        },
      )
      animation.pause()
      ob.observe(el)
      map.set(el, animation)
    }
  },
  unmounted(el) {
    ob.unobserve(el)
  },
}
