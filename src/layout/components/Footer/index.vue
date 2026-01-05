<script name="Footer" setup>
import { useMediaQuery } from '@vueuse/core'

const links = [
  {
    name: '中国国家博物馆',
    url: 'https://www.chnmuseum.cn/',
  },
  {
    name: '党史学习教育官网',
    url: 'http://dangshi.people.com.cn/index.html',
  },
  {
    name: '央视网红色频道',
    url: 'https://tv.cctv.com/special/',
  },
]
const showFooterImage = useMediaQuery('(min-width: 1280px)')
</script>

<template>
  <footer class="footer">
    <img
      v-enter:slideInRight.force
      class="left-0"
      v-if="showFooterImage"
      draggable="false"
      src="@/assets/img/revolution-statue.png"
      alt="革命"
    />
    <img
      v-enter:slideInLeft.force
      class="right-0"
      v-if="showFooterImage"
      draggable="false"
      src="@/assets/img/monument.png"
      alt="纪念碑"
    />
    <div class="footer-container">
      <h3 class="footer-title">红脉传承 ☆ 致敬先烈</h3>
      <p class="footer-text">
        <span>© 2025 红脉传承平台 版权所有</span>
        <span class="divider" />
        <span>传承红色基因，弘扬革命精神</span>
      </p>
      <p class="footer-reference">
        红色资源参考：
        <a v-for="(link, index) in links" :key="index" :href="link.url" target="_blank">
          {{ link.name + (index === links.length - 1 ? '' : '、') }}
        </a>
      </p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  position: relative;
  padding: 40px 0;
  color: #fff;
  background: linear-gradient(to right, var(--red-primary), var(--red-dark));
  border-top: 3px solid var(--gold);
  box-shadow: var(--shadow-out-md);

  img {
    position: absolute;
    bottom: calc(100% + 2px);
    z-index: 1;
    pointer-events: none;
    user-select: none;
    mix-blend-mode: multiply;
  }

  .footer-container {
    padding: 0 20px;
    margin: 0 auto;
    text-align: center;

    .footer-title {
      margin-bottom: 20px;
      font-size: 20px;
      font-weight: bold;
      color: var(--gold);
    }

    .footer-text {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      line-height: 1.8;
      opacity: 0.9;

      .divider {
        display: inline-block;
        width: 1px;
        height: 0.8em;
        margin: 0 6px;
        vertical-align: middle;
        border-left: 1px solid currentcolor;
      }

      @include respond-to('phone') {
        flex-direction: column;

        .divider {
          display: none;
        }
      }
    }

    .footer-reference {
      margin-top: 10px;
      font-size: 14px;
      opacity: 0.8;

      a {
        color: inherit;
        text-decoration: none;
      }
    }
  }
}
</style>
