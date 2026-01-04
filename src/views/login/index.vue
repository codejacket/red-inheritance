<script name="Login" setup>
import LoginForm from './loginForm'
import RegisterForm from './registerForm'

const route = useRoute()
const router = useRouter()
const active = ref('login')

function handleSuccess() {
  router.push({ path: route.query?.redirect || '/' })
}
</script>

<template>
  <div class="login-container">
    <div class="login-form">
      <svg-icon class="login-logo" icon="logo" />
      <lay-tab v-model="active" type="brief">
        <lay-tab-item id="login" title="登录">
          <LoginForm @login-success="handleSuccess" />
        </lay-tab-item>
        <lay-tab-item id="register" title="注册">
          <RegisterForm @register-success="handleSuccess" />
        </lay-tab-item>
      </lay-tab>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  min-height: calc(100vh - 248px);
  background: url('@/assets/img/body-bg.jpg') no-repeat;

  .login-form {
    padding: 40px;
    padding-bottom: 0;
    margin-top: 80px;
    margin-bottom: 20px;
    background: #fff;
    border-radius: var(--radius-md);
    filter: drop-shadow(0 0 6px rgb(0 0 0 / 10%));

    @include respond-to('phone') {
      width: 90%;
      margin-top: 64px;
      margin-bottom: 14px;
    }

    @include respond-to('pad') {
      width: 400px;
    }

    @include respond-to('desktop') {
      width: 450px;
    }

    .login-logo {
      position: absolute;
      top: 0;
      left: 50%;
      font-size: 120px;
      color: var(--red-primary);
      background: inherit;
      border-radius: 50%;
      translate: -50% -50%;
      animation: rotate 5s linear infinite;

      @include respond-to('phone') {
        font-size: 100px;
      }
    }

    .login-btn {
      width: 100%;
      padding: 10px 20px;
      margin-top: 24px;
      font-weight: 500;
      color: #fff;
      text-align: center;
      letter-spacing: 2px;
      cursor: pointer;
      background: linear-gradient(to right, var(--red-primary), var(--red-secondary));
      border-radius: var(--radius-sm);
      box-shadow: var(--shadow-out-md);
      transition: var(--transition-base);
    }
  }
}
</style>
