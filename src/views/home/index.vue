<script name="Home" setup>
import { listHero } from '@/api/hero'
import Card from '@/components/Card'
import Swiper from '@/components/Swiper'
import { deathTimeOptions, nativePlaceOptions } from '@/constants'
import { SwiperSlide } from 'swiper/vue'

const heroList = ref([])

getHeroList()

async function getHeroList() {
  const { data } = await listHero({
    query: {
      nativePlace: nativePlaceOptions[0],
      deathTime: deathTimeOptions[0],
    },
    pageNum: 1,
    pageSize: 9,
  })
  heroList.value = data.list
}
</script>

<template>
  <div class="app-container">
    <swiper class="card my30px">
      <swiper-slide>
        <img class="img-zoom" src="@/assets/img/carousel-1.jpg" />
      </swiper-slide>
      <swiper-slide>
        <img class="img-zoom" src="@/assets/img/carousel-2.jpg" />
      </swiper-slide>
      <swiper-slide>
        <img class="img-zoom" src="@/assets/img/carousel-3.jpg" />
      </swiper-slide>
      <swiper-slide>
        <img class="img-zoom" src="@/assets/img/carousel-4.jpg" />
      </swiper-slide>
      <swiper-slide>
        <img class="img-zoom" src="@/assets/img/carousel-5.jpg" />
      </swiper-slide>
      <swiper-slide>
        <img class="img-zoom" src="@/assets/img/carousel-6.jpg" />
      </swiper-slide>
    </swiper>
    <lay-row space="20">
      <lay-col md="6" xs="12">
        <div class="fast-card card p20px">
          <svg-icon icon="book" />
          <div>
            <h3>红色历史</h3>
            <p>回顾峥嵘岁月，传承红色记忆</p>
          </div>
        </div>
      </lay-col>
      <lay-col md="6" xs="12">
        <div class="fast-card card p20px">
          <svg-icon icon="shield" />
          <div>
            <h3>英雄事迹</h3>
            <p>铭记英雄壮举，致敬时代楷模</p>
          </div>
        </div>
      </lay-col>
      <lay-col md="6" xs="12">
        <div class="fast-card card p20px">
          <svg-icon icon="landmark" />
          <div>
            <h3>红色地标</h3>
            <p>探访红色阵地，感悟精神力量</p>
          </div>
        </div>
      </lay-col>
      <lay-col md="6" xs="12">
        <div class="fast-card card p20px">
          <svg-icon icon="open-reader" />
          <div>
            <h3>纪念专栏</h3>
            <p>汇聚缅怀之情，书写不朽篇章</p>
          </div>
        </div>
      </lay-col>
    </lay-row>
    <card class="my30px">
      <div class="card-header">
        <h3 class="card-title">
          <svg-icon icon="book" />
          <span>红色动态·学习传承</span>
        </h3>
        <router-link class="more-btn" to="/history">更多</router-link>
      </div>
      <lay-line margin="20px" />
      <div class="learn-card">
        <swiper>
          <swiper-slide v-for="_ in 5">
            <img class="img-zoom" src="@/assets/img/learn-item.png" />
          </swiper-slide>
        </swiper>
        <ul class="learn-list">
          <li class="learn-item">
            <span>
              退役军人事务部代表团赴马来西亚、巴布亚新几内亚踏勘祭扫境外抗战烈士纪念设施
            </span>
            <span class="color-#999">2025-08-27</span>
          </li>
          <li class="learn-item">
            <span> 驻哥打基纳巴卢总领事朱兴龙出席“卓还来烈士公祭典礼” </span>
            <span class="color-#999">2025-08-27</span>
          </li>
          <li class="learn-item">
            <span> 中国驻黎巴嫩使馆与赴黎维和部队祭扫杜照宇烈士墓 </span>
            <span class="color-#999">2025-08-27</span>
          </li>
          <li class="learn-item">
            <span> 中国驻朝鲜使馆祭奠中国人民志愿军先烈 </span>
            <span class="color-#999">2025-08-27</span>
          </li>
          <li class="learn-item">
            <span>心相近｜“永远不会忘记”——中俄友谊故事世代流传</span>
            <span class="color-#999">2025-08-27</span>
          </li>
        </ul>
      </div>
    </card>
  </div>
</template>

<style lang="scss" scoped>
.fast-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border-left: 3px solid var(--red-primary);
  border-radius: var(--radius-md);
  transition: all 0.3s ease;

  svg {
    font-size: 30px;
    color: var(--red-primary);
  }

  p {
    color: #888;
  }

  &:hover {
    transform: translateY(-5px);
  }
}

.learn-card {
  display: flex;
  gap: 20px;
  justify-content: space-between;

  .swiper {
    width: 400px;
    margin-right: 0;
    margin-left: 0;

    @include respond-to('phone') {
      width: 100%;
    }
  }

  @include respond-to('phone') {
    flex-direction: column;
  }
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: -10px;
  margin-bottom: 20px;

  h3 {
    font-size: 22px;
    color: var(--red-primary);

    span {
      margin-left: 5px;
    }
  }

  .more-btn {
    font-size: 16px;
  }
}

.learn-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: space-between;
  width: 100%;
  list-style: inside;
  list-style-type: square;

  .learn-item {
    display: flex;
    justify-content: space-between;

    &:hover {
      color: var(--red-primary);
      cursor: pointer;
    }
  }
}
</style>
