<script name="Avatar" setup>
import { layer } from '@layui/layui-vue'
import { useUserStore } from '@store/user'

const router = useRouter()
const { userInfo, logout } = storeToRefs(useUserStore())

async function handleLogout() {
  layer.confirm('确定退出登录吗？', {
    btn: [
      {
        text: '确定',
        callback: async id => {
          await logout()
          await router.push('/')
          layer.close(id)
        },
      },
      {
        text: '取消',
        callback: id => {
          layer.close(id)
        },
      },
    ],
  })
}
</script>

<template>
  <lay-dropdown contentOffset="6px">
    <div class="avatar-wrapper">
      <lay-avatar
        :src="userInfo.avatar"
        size="sm"
        radius
        alt="avatar"
        fallback="@/assets/img/default-avatar.png"
      />
      <span class="username-label text-ellipsis">{{ userInfo.username }}</span>
    </div>
    <template #content>
      <lay-dropdown-menu>
        <lay-dropdown-menu-item>
          我的首页
          <template #prefix>
            <svg-icon icon="home" />
          </template>
        </lay-dropdown-menu-item>
        <lay-dropdown-menu-item>
          我的设置
          <template #prefix>
            <svg-icon icon="gear" />
          </template>
        </lay-dropdown-menu-item>
        <lay-dropdown-menu-item @click="handleLogout">
          退出登录
          <template #prefix>
            <svg-icon icon="power-off" />
          </template>
        </lay-dropdown-menu-item>
      </lay-dropdown-menu>
    </template>
  </lay-dropdown>
</template>

<style scoped lang="scss">
.avatar-wrapper {
  display: flex;
  align-items: center;
  cursor: pointer;

  .layui-avatar {
    box-sizing: border-box;
    margin-right: 5px;
    transition: all 0.1s cubic-bezier(0.645, 0.045, 0.355, 1);
  }

  .username-label {
    max-width: 100px;
    color: #fff;
  }

  svg {
    transition: var(--el-transition-duration);
  }

  &:hover {
    .username-label {
      color: var(--gold);
    }

    .layui-avatar {
      box-shadow: 0 0 0 3px hsl(51deg 100% 50% / 30%);
    }
  }

  &[aria-expanded='true'] {
    svg {
      transform: rotate(90deg);
    }
  }
}
</style>
