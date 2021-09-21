<template>
  <div class="tag-group-wrapper">
    <div class="tag-group-header">
      <div class="header-text">{{ headerText }}</div>
      <div class="header-btn" @click="onBtnClick">{{ btnText }}</div>
    </div>
    <div class="tag-group">
      <div class="tag-group-inner" v-for="(item, index) in value" :key="index">
        <Tag :text="item" @onClick="onTagClick(item, index)" />
      </div>
    </div>
  </div>
</template>

<script>
import Tag from './Tag.vue'

export default {
  name: 'TagGroup',
  components: {
    Tag
  },
  props: {
    headerText: {
      type: String,
      default: ''
    },
    btnText: {
      type: String,
      default: ''
    },
    value: {
      type: Array,
      default: []
    }
  },
  methods: {
    onTagClick(text, index) {
      this.$emit('onTagClick', text, index)
    },
    onBtnClick() {
      this.$emit('onBtnClick')
    }
  }
}
</script>

<style lang="scss" scoped>
  .tag-group-wrapper {
    width: 100%;
    margin-top: 35px;
    .tag-group-header {
      padding: 0 16.5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .header-text {
        font-size: 14px;
        color: #333333;
        line-height: 20px;
      }
      .header-btn {
        font-size: 14px;
        color: #3696EF;
        line-height: 20px;
      }
    }
    .tag-group {
      width: 100%;
      box-sizing: border-box;
      display: flex;
      flex-wrap: wrap;
      padding: 4px 10px 0 10px;
      .tag-group-inner {
        max-width: 100%;
        overflow: hidden;
        padding: 12px 6px 0 6px;
      }
    }
  }
</style>
