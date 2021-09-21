<template>
  <div class="search-item-wrapper" @click="onClick">
    <div class="search-item-icon">
      <div class="icon-wrapper">
        <van-icon :name="icon" color="rgba(0, 0, 0, .5)" :style="{ width: '15px', height: '15px'}"/>
      </div>
    </div>
    <div class="search-item-info">
      <div class="search-item-title search-item-common">{{ title }}</div>
      <div class="search-item-sub-title search-item-common">{{ subTitle }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchItem',
  props: {
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    },
    icon: {
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
  .search-item-wrapper {
    display: flex;
    padding: 10px 15px;
    height: 36.5px;
    align-items: center;
    .search-item-icon {
      .icon-wrapper {
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #F7F7F9;
        border-radius: 50%;
      }
    }
    .search-item-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      margin-left: 10px;
      .search-item-common {
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        word-break: break-all;
      }
      .search-item-title {
        font-size: 14px;
        color: #333333;
        line-height: 20px;
        font-weight: 500;
        max-height: 20px;
      }
      .search-item-sub-title {
        font-size: 12px;
        color: rgba(0,0,0,0.45);
        line-height: 16.5px;
        max-height: 16.5px;
      }
    }
  }
</style>
