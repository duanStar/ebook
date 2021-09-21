<template>
  <div class="tag-wrapper">
    <div class="tag" @click="onClick">{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: 'Tag',
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  methods: {
    onClick() {
      this.$emit('onClick')
    }
  }
}
</script>

<style lang="scss" scoped>
  .tag-wrapper {
    background-color: #F7F7F9;
    border-radius: 16px;
    padding: 6px 17px;
    text-align: center;
    .tag {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 14px;
      color: #272E37;
      line-height: 20px;
    }
  }
</style>
