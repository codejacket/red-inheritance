<script name="HeroDetail" setup>
import { getHeroDetail } from '@/api/hero'
import { layer } from '@layui/layui-vue'

const route = useRoute()
const hero = ref({})
const active = ref('life')

getHeroDetail(route.params.heroId).then(res => {
  hero.value = res.data
})

function handleMenory() {
  layer.msg('🍃 祭扫成功！铭记先烈事迹，传承红色精神，是对英雄最好的告慰。', {
    time: 3000,
    offset: 't',
  })
}
</script>

<template>
  <div class="app-container">
    <div class="hero-info-wrapper card">
      <div class="hero-card">
        <img v-if="hero.img" :src="hero.img" :alt="hero.name" />
        <div v-else>
          <img :alt="hero.name" src="@/assets/img/default-hero-avatar.png" />
          <div class="hero-img-name">{{ hero.name }}</div>
        </div>
      </div>
      <div class="hero-info">
        <h2 class="hero-name">{{ hero.name }}</h2>
        <div class="flex">
          <div class="w110px">性别</div>
          <div>{{ hero.sex }}</div>
        </div>
        <div class="flex">
          <div class="w100px">出生日期</div>
          <div>{{ `${hero.birthYear}年` }}</div>
        </div>
        <div class="flex">
          <div class="w100px">出生地</div>
          <div>{{ `${hero.sheng}${hero.shi}` }}</div>
        </div>
        <div class="flex">
          <div class="w100px">政治面貌</div>
          <div>{{ hero.politicalStatus }}</div>
        </div>
        <div class="memorial-btn" @click="handleMenory">
          <img class="w20px mr4px" src="@/assets/img/candle.png" />
          <span>祭奠烈士</span>
        </div>
      </div>
    </div>
    <div class="card p30px">
      <lay-tab v-model="active" type="brief">
        <lay-tab-item id="life" title="生平简介"></lay-tab-item>
        <lay-tab-item id="contribution" title="历史贡献"></lay-tab-item>
        <lay-tab-item id="honor" title="荣誉成就"></lay-tab-item>
        <lay-tab-item id="photo" title="历史照片"></lay-tab-item>
      </lay-tab>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin: 30px auto;

  .hero-info-wrapper {
    display: flex;
    gap: 40px;
    align-items: center;
    padding: 30px 60px;

    .hero-card {
      position: relative;
      width: 200px;
      overflow: hidden;
      cursor: pointer;
      border-radius: 2px;
      box-shadow: var(--shadow-out-sm);

      img {
        box-sizing: border-box;
        width: 100%;
        vertical-align: middle;
        background: #ccc;
        border: 8px solid #ccc;
      }

      .hero-img-name {
        position: absolute;
        top: 12%;
        left: 14%;
        font-size: 18px;
        font-weight: 900;
        color: transparent;
        letter-spacing: 4px;
        background: linear-gradient(to right, #f67633, #be000d);
        background-clip: text;
      }
    }

    .hero-info {
      display: flex;
      flex-direction: column;
      gap: 14px;

      .hero-name {
        font-size: 28px;
        font-weight: 500;
        letter-spacing: 2px;
      }
    }
  }

  .memorial-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    height: 36px;
    margin-top: 8px;
    font-weight: 500;
    color: #fff;
    letter-spacing: 1px;
    cursor: pointer;
    background: linear-gradient(to right, var(--red-primary), var(--red-secondary));
    border-radius: var(--radius-sm);
    box-shadow: var(--shadow-out-sm);
    transition: var(--transition-base);

    &:hover {
      background: linear-gradient(to right, var(--red-dark), var(--red-primary));
      box-shadow: 0 4px 12px rgb(199 28 34 / 30%);
      transform: translateY(-2px);
    }
  }
}
</style>
