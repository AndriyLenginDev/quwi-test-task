<template>
  <div class="container login-wrapper">
    <div class="user-login">
      <form id="login-form" class="b-box" @submit.prevent="login">
        <div class="logo">
          <img src="https://quwi.com/img/quwi-logo.png" />
          <div class="logo-text">
            QUWI
          </div>
        </div>
        <div class="input-wrapper">
          <Field
            v-model="form.email"
            name="email"
            type="email"
            placeholder="Email"
            autocomplete="autocomplete"
            :errors="errors"
          />
        </div>
        <div class="input-wrapper">
          <Field
            v-model="form.password"
            name="password"
            type="password"
            placeholder="Password"
            autocomplete="autocomplete"
            :errors="errors"
          />
        </div>
        <Button>Login</Button>
        <nuxt-link class="forgot-link" to="/forgot">
          Forgot password?
        </nuxt-link>
      </form>
    </div>
  </div>
</template>

<script>
import Field from '~/components/Form/Field'
import Button from '~/components/Form/Button'
export default {
  name: 'Login',
  middleware ({ $auth, redirect }) {
    if ($auth.user) {
      return redirect('/')
    }
  },
  components: {
    Field,
    Button
  },
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      requestProcessing: false,
      errors: {}
    }
  },
  methods: {
    async login () {
      if (this.requestProcessing) {
        return
      }
      this.requestProcessing = true
      try {
        const { data } = await this.$auth.loginWith('local', {
          data: this.form
        })
        this.$auth.setUser(data.app_init.user)
      } catch (e) {
        this.errors = e.response.data.first_errors
      } finally {
        this.requestProcessing = false
      }
    },
    clearErrors () {
      this.errors = {}
    }
  }
}
</script>

<style lang="scss" scoped>
  .login-wrapper {
    min-height: calc(100vh - 46px);
    display: flex;
    align-items: center;
    background: url('https://quwi.com/img/backgrounds/gray_blur.png');
    .user-login {
      width: 440px;
      margin: auto;
      text-align: center;
      #login-form {
        &.b-box {
          padding: 25px 40px 35px;
          background: #fff;
          border: 1px solid rgba(0,0,0,.11);
          box-shadow: 0 0 12px rgb(0 0 0 / 25%);
          border-radius: 15px;
        }
        .logo {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 26px;
          color: #000;
          text-decoration: none;
          img {
            margin-right: 14px;
            width: 40px;
            height: 40px;
          }
          .logo-text {
            font-family: Arial,sans-serif;
            font-weight: 700;
            font-size: 24px;
            text-transform: uppercase;
          }
        }
        .input-wrapper {
          margin-bottom: 12px;
        }
        .forgot-link {
          display: inline-block;
          margin-top: 18px;
          color: #2975dc !important;
          text-decoration: none;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
</style>
