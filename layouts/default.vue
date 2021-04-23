<template>
  <div>
    <Header />
    <section id="content">
      <Nuxt />
    </section>
  </div>
</template>

<style>
</style>
<script>
import Header from '~/components/Header'
export default {
  components: { Header }
}
</script>
<style lang="scss" scoped>
  #content {
    min-height: 100%;
    height: auto;
    padding-top: 46px;
  }
</style>
