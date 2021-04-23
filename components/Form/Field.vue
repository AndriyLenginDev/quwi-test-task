<template>
  <div
    class="input"
    :class="[{ 'has-error' : errors[$attrs.name] }, size]"
  >
    <div v-if="errors[$attrs.name]" class="top-text error">{{ errors[$attrs.name] }}</div>
    <div v-else-if="value" class="top-text placeholder">{{ $attrs.placeholder }}</div>
    <input
      v-bind="$attrs"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: 'Field',
  inheritAttrs: false,
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    size: {
      type: String,
      validator (val) {
        return ['sm', 'lg'].includes(val)
      },
      default: 'lg'
    },
    errors: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {}
  },
  computed: {},
  methods: {},
  created () {}
}
</script>

<style lang="scss" scoped>
  .input {
    position: relative;
    input {
      border: 1px solid #dadada;
      border-radius: 5px;
      width: 100%;
      outline: none;
      box-sizing: border-box;
    }
    &.lg {
      input {
        padding: 15px;
      }
    }
    &.sm {
      input {
        padding: 10px;
      }
    }
    &.has-error {
      input {
        border-color: #d40000 !important;
      }
    }
    .top-text {
      margin: 0 10px;
      max-width: calc(100% - 20px);
      position: absolute;
      top: -.55em;
      background: #fff;
      display: block;
      float: left;
      padding: 0 3px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      &.placeholder {
        color: #999;
      }
      &.error {
        color: #d40000;
      }
    }
  }
</style>
