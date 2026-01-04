<script name="Navbar" setup>
import { useAppStore } from '@store/app'
import { useUserStore } from '@store/user'
import Avatar from '../Avatar'

const props = defineProps({
  height: {
    type: Number,
    default: 64,
  },
})

const router = useRouter()
const routes = router.options.routes[0]?.children?.filter(item => item.meta?.nav)
const showMenuDrawer = ref(false)
const { isLogin, userInfo } = storeToRefs(useUserStore())
const { isPhone, title } = storeToRefs(useAppStore())

function toLogin() {
  showMenuDrawer.value = false
  router.push('/login')
}
</script>

<template>
  <div class="nav-container slide-down" :style="{ height: `${height}px` }">
    <div class="nav-container-wrapper">
      <ul class="nav-menu">
        <svg-icon class="logo" icon="logo" @click="router.push('/')" />
        <h2 class="logo-title">红脉传承</h2>
        <li v-if="!isPhone" v-for="(item, index) in routes" :key="index">
          <router-link :to="`/${item.path}`">
            <svg-icon :icon="item.meta?.icon" />
            <span>{{ item.meta?.title }}</span>
          </router-link>
        </li>
      </ul>
      <template v-if="!isPhone">
        <Avatar v-if="isLogin" />
        <router-link class="login-btn" v-else to="/login">
          <svg-icon icon="right-to-bracket" />
          <span class="ml6px">登录 / 注册</span>
        </router-link>
      </template>
      <template v-else>
        <svg-icon class="dedent-btn" icon="dedent" @click="showMenuDrawer = true" />
        <lay-layer
          layer-classes="menu-drawer"
          v-model="showMenuDrawer"
          :area="['60%', '100%']"
          :title="title"
          type="4"
        >
          <div class="flex flex-col gap6px items-center my16px" @click="toLogin">
            <lay-avatar
              style="width: 48px; height: 48px"
              :src="userInfo.avatar"
              radius
              alt="avatar"
              fallback="@/assets/img/default-avatar.png"
            />
            <span class="text-ellipsis">{{ userInfo.username || '未登录' }}</span>
          </div>
          <ul class="menu-drawer-list">
            <li v-for="(item, index) in routes" :key="index">
              <router-link :to="`/${item.path}`" @vue:before-update="showMenuDrawer = false">
                <svg-icon :icon="item.meta?.icon" />
                <span>{{ item.meta?.title }}</span>
              </router-link>
            </li>
          </ul>
        </lay-layer>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nav-container {
  position: sticky;
  top: 0;
  left: 0;
  z-index: 999;
  box-sizing: border-box;
  width: 100%;
  height: 64px;
  padding: 0 20px;
  background: linear-gradient(90deg, var(--red-primary), var(--red-dark));
  border-bottom: 2px solid var(--gold);
  box-shadow: var(--shadow-out-md);

  .nav-container-wrapper {
    display: flex;
    gap: 30px;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 1600px;
    height: 100%;
    margin: 0 auto;

    .nav-menu {
      display: flex;
      gap: 20px;
      align-items: center;
      list-style: none;

      .logo {
        margin-left: 12px;
        font-size: 36px;
        color: var(--gold);
        cursor: pointer;
        animation: rotate 6s linear infinite;
      }

      .logo-title {
        margin-right: 12px;
        margin-left: -14px;
        font-family: MaoBi, '黑体', sans-serif;
        font-size: 22px;
        font-weight: 600;
        color: var(--gold);
        cursor: pointer;
        transition: all 0.3s ease;
      }

      a {
        position: relative;
        display: flex;
        gap: 5px;
        align-items: center;
        padding: 8px 12px 10px;
        overflow: hidden;
        font-size: 16px;
        color: #fff;
        text-decoration: none;
        outline: none;
        border-radius: 4px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

        &::after {
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          content: '';
          background-color: var(--gold);
          transform: translateX(-50%);
          transition: all 0.3s ease;
        }

        &:hover {
          color: var(--gold);
          background-color: rgb(255 255 255 / 10%);
        }

        &.router-link-active {
          color: var(--gold);
          background-color: rgb(255 255 255 / 10%);

          &::after {
            width: 100%;
          }
        }
      }
    }

    .login-btn {
      padding-bottom: 2px;
      font-size: 16px;
      color: #fff;
      text-decoration: none;
      outline: none;

      &.router-link-active,
      &:hover {
        color: var(--gold);
      }
    }

    .dedent-btn {
      font-size: 28px;
      color: var(--gold);
      cursor: pointer;
    }
  }
}
</style>

<style lang="scss">
.menu-drawer.layui-layer-drawer {
  background: url('@/assets/img/base-bg.jpg') no-repeat;

  .layui-layer-title {
    font-weight: 500;
    line-height: 55px;
  }

  .menu-drawer-list {
    list-style: none;

    li {
      padding: 0 12px;

      a {
        display: flex;
        gap: 8px;
        align-items: center;
        padding: 12px 20px;
        overflow: hidden;
        font-size: 15px;
        text-decoration: none;
        outline: none;

        &.router-link-active {
          color: var(--red-primary);
        }
      }

      &:not(:last-of-type) a {
        border-bottom: 1px solid #f0f0f0;
      }
    }
  }
}
</style>
