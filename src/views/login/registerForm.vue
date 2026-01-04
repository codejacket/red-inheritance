<script name="RegisterForm" setup>
import { register } from '@/api/login'

const emits = defineEmits(['registerSuccess'])

const loading = ref(false)
const t = ref(null)
let timer = null
const formRef = useTemplateRef('formRef')
const form = reactive({
  phoneNumber: '',
  code: '',
  password: '',
  passwordAgain: '',
})
const rules = ref({
  phoneNumber: {
    type: 'string',
    validator(rule, value, callback) {
      if (value.length === 11) {
        return true
      } else {
        callback(new Error('手机号输入错误'))
      }
    },
  },
  password: {
    type: 'string',
    min: 6,
    max: 30,
  },
  passwordAgain: {
    validator(rule, value, callback) {
      if (value === form.password) {
        return true
      } else {
        callback(new Error('两次输入的密码不一致'))
      }
    },
  },
})

function send() {
  if (t.value === null) {
    t.value = 60
    timer = setInterval(() => {
      t.value--
      if (t.value === 0) {
        clearInterval(timer)
        t.value = null
      }
    }, 1000)
  }
}

async function handleRegister() {
  try {
    loading.value = true
    await formRef.value.validate()
    await register(form)
    loading.value = false
    emits('registerSuccess')
  } catch {
    loading.value = false
  }
}
</script>

<template>
  <lay-form label-width="auto" :model="form" :rules="rules" ref="formRef" pane>
    <lay-form-item class="mt5px" prop="phoneNumber">
      <template #label>
        <svg-icon icon="phone" />
      </template>
      <lay-input v-model="form.phoneNumber" allow-clear placeholder="请输入手机号" />
    </lay-form-item>
    <lay-form-item prop="code">
      <template #label>
        <svg-icon icon="shield" />
      </template>
      <lay-input v-model="form.code" allow-clear placeholder="请输入验证码">
        <template #suffix>
          <span class="get-captcha-btn" v-if="t">{{ t }}s后重新发送</span>
          <span class="get-captcha-btn" v-else @click="send">获取验证码</span>
        </template>
      </lay-input>
    </lay-form-item>
    <lay-form-item prop="password">
      <template #label>
        <svg-icon icon="unlock" />
      </template>
      <lay-input v-model="form.password" placeholder="请输入密码" />
    </lay-form-item>
    <lay-form-item prop="passwordAgain">
      <template #label>
        <svg-icon icon="lock" />
      </template>
      <lay-input v-model="form.passwordAgain" placeholder="请输入确认密码" />
    </lay-form-item>
    <lay-form-item class="text-center">
      <div class="register-btn" @click="handleRegister">注册</div>
    </lay-form-item>
  </lay-form>
</template>

<style scoped lang="scss">
.register-btn {
  padding: 9px 20px;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  background: linear-gradient(to right, var(--red-primary), var(--red-secondary));
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-out-md);
  transition: var(--transition-base);
}

.get-captcha-btn {
  color: #999;
  cursor: pointer;
}
</style>
