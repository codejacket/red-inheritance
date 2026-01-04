<script name="LoginForm" setup>
import { useUserStore } from '@store/user'

const emits = defineEmits(['loginSuccess'])

const loading = ref(false)
const formRef = useTemplateRef('formRef')
const userStore = useUserStore()
const form = reactive({
  username: '',
  password: '',
})
const rules = ref({
  username: {
    type: 'string',
    min: 2,
    max: 30,
  },
  password: {
    type: 'string',
    min: 6,
    max: 30,
  },
})

async function handleLogin() {
  try {
    loading.value = true
    await formRef.value.validate()
    await userStore.login(form)
    loading.value = false
    emits('loginSuccess')
  } catch {
    loading.value = false
  }
}
</script>

<template>
  <lay-form label-width="auto" :model="form" :rules="rules" ref="formRef" pane>
    <lay-form-item class="mt5px" prop="username">
      <template #label>
        <svg-icon icon="user" />
      </template>
      <lay-input v-model="form.username" allow-clear placeholder="user" />
    </lay-form-item>
    <lay-form-item prop="password">
      <template #label>
        <svg-icon icon="lock" />
      </template>
      <lay-input v-model="form.password" placeholder="123456" />
    </lay-form-item>
    <lay-form-item class="text-center">
      <div class="login-btn" @click="handleLogin">登录</div>
    </lay-form-item>
  </lay-form>
</template>

<style scoped lang="scss">
.login-btn {
  padding: 9px 20px;
  font-weight: 500;
  color: #fff;
  letter-spacing: 2px;
  cursor: pointer;
  user-select: none;
  background: linear-gradient(to right, var(--red-primary), var(--red-secondary));
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-out-md);
  transition: var(--transition-base);
}
</style>
