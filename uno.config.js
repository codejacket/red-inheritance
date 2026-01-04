import { defineConfig, presetWind3 } from 'unocss'

export default defineConfig({
  presets: [presetWind3()],
  theme: {
    colors: {
      'red-primary': 'var(--red-primary)',
      'red-secondary': 'var(--red-secondary)',
      'red-dark': 'var(--red-dark)',
      'gold': 'var(--gold)',
      'gold-light': 'var(--gold-light)',
    },
    breakpoints: {
      'xs': '320px',
      'sm': '768px',
      'md': '992px',
      'lg': '1200px',
    },
  },
})
