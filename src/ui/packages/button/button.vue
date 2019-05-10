<template>
  <button
    :disabled="disabled"
    @click="handleClick"
    :class="[
      prefixCls,
      type ? prefixCls + '-' + type : '',
      size ? prefixCls + '-' + size : '',
      disabled ? prefixCls + '-disabled' : '',
      loading ? prefixCls + '-loading' : ''
    ]"
  >
    <slot></slot>
  </button>
</template>
<script>
  export default {
    name: 'Button',
    data: () => ({
      prefixCls: 'ai-btn'
    }),
    props: {
      type: {
        type: String,
        default: 'default'
      },
      size: String,
      disabled: {
        type: Boolean,
        default: false
      },
      loading: {
        type: Boolean,
        default: false
      }
    },
    computed: {},
    methods: {
      handleClick (e) {
        !this.disabled && this.$emit(e.type, e)
      }
    }
  }
</script>
