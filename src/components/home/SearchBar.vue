<template>
  <div class="search-bar">
    <div class="search-bar-wrapper" @click="onSearchBarClick">
      <van-icon class="search" name="search" size="16px" color="#858C96"></van-icon>
      <input type="text" class="search-bar-input" :focus="focus" :disabled="disabled" :maxlength="limit" :placeholder="hotSearch" v-model="searchWord" @input="onChange" confirm-type="search" @confirm="onConfirm" placeholder-style="color: #ADB4BE;font-size: 15px;">
      <van-icon class="clear" name="clear" size="16px" color="#ccc" @click="onClearClick" v-if="searchWord.length > 0"></van-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    focus: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 50
    },
    hotSearch: {
      type: String,
      default: '搜索'
    }
  },
  data() {
    return {
      searchWord: ''
    }
  },
  methods: {
    onSearchBarClick() {
      this.$emit('onClick')
    },
    onClearClick() {
      this.searchWord = ''
      this.$emit('onClear')
    },
    onChange(e) {
      const { value } = e.mp.detail
      this.$emit('onChange', value)
    },
    onConfirm(e) {
      const { value } = e.mp.detail
      this.$emit('onConfirm', value)
    },
    setValue(val) {
      this.searchWord = val
    },
    getValue() {
      return this.searchWord
    }
  }
}
</script>

<style lang="scss" scoped>
  .search-bar {
    padding: 15px 15.5px;
    .search-bar-wrapper {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      height: 40px;
      background: #F5F7F9;
      border-radius: 20px;
      padding: 12px 17px;
      .search-bar-input {
        flex: 1;
        margin: 0 8px;
        color: #333;
        font-size: 15px;
      }
      .search, .clear {
        display: flex;
        align-items: center;
        height: 100%;
      }
    }
  }
</style>
