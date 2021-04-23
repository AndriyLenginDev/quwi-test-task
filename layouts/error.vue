<template>
  <div class="b-container">
    <div>
      <h1 v-if="error.statusCode === 404">404 Page not found</h1>
      <h1 v-else>An error occurred</h1>
      <nuxt-link to="/">Home page</nuxt-link>
    </div>
  </div>
</template>

<style>
</style>
<script>
export default {
  props: {
    error: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
  .b-container {
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    h1 {
      font-size: 1.5em;
      margin-bottom: 20px;
    }
  }
</style>
