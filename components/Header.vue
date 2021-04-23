<template>
  <div class="app-navbar">
    <div class="app-quwi">
      <img src="https://quwi.com/img/quwi-logo.png" />
    </div>
    <div v-if="$auth.loggedIn" class="user-navigation">
      <nuxt-link to="/">Projects</nuxt-link>
      <a class="logout-link" @click="logout">Logout</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {}
  },
  methods: {
    logout () {
      this.$auth.logout()
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-navbar {
    display: flex;
    background: #fafafa;
    border: none;
    box-shadow: 0 0 5px rgb(0 0 0 / 25%);
    text-align: right;
    padding-right: 20px;
    height: 46px;
    position: fixed;
    width: 100%;
    z-index: 1001;
    .app-quwi {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 28px;
      color: #000;
      font-weight: 700;
      font-family: Google Sans,sans-serif;
      width: 44px;
      height: 44px;
      margin-left: 13px;
      margin-right: 13px;
      margin-top: 1px;
      border-radius: 50%;
      img {
        width: 25px;
        height: 25px;
      }
    }
    .user-navigation {
      margin-left: auto;
      a {
        color: #999;
        text-decoration: none;
        text-transform: uppercase;
        display: inline-block;
        cursor: pointer;
        padding: 16px;
        &:hover {
          color: #2975dc;
        }
      }
    }
  }
</style>
