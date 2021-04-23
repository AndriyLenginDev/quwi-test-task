<template>
  <button
    class="button"
    :class="[size]"
    v-bind="$attrs"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    size: {
      type: String,
      validator (val) {
        return ['sm', 'lg'].includes(val)
      },
      default: 'lg'
    }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
  .button {
    cursor: pointer;
    border: none;
    background: #2668c1;
    &.sm {
      height: 34px;
      padding: 0 15px;
      color: #fff;
      font-style: normal;
      font-weight: 700;
      font-size: 12.5px;
      line-height: 14px;
      background: #2567c0;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      outline: none;
    }
    &.lg {
      height: 52px;
      width: 100% !important;
      text-transform: none;
      text-shadow: none;
      font-size: 18px;
      border-radius: 9px;
      font-weight: 400;
      margin-top: 17px;
      color: #fff;
    }
    &:focus {
      outline: none;
    }
    &:hover {
      opacity: .7;
      text-decoration: none;
    }
  }
</style>
