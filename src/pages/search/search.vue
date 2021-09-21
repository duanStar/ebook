<template>
  <div>
    <SearchBar :focus="searchFocus" @onChange="onChange" @onClear="onClear" :hotSearch="hotKeyword" @onConfirm="onConfirm" ref="searchRef"></SearchBar>
    <TagGroup :value="hotSearchArray" headerText="热门搜索" btnText="换一批" @onTagClick="showBookDetail" @onBtnClick="changeHotSearch" v-if="hotSearchArray.length > 0 && !showList" />
    <div :style="{ marginBottom: '15px' }">
      <TagGroup :value="historySearch" headerText="历史搜索" btnText="清空" @onBtnClick="clearHistorySearch" @onTagClick="searchKeyWord" v-if="historySearch.length > 0 && !showList" />
    </div>
    <SearchList :data="searchList" v-if="showList"/>
  </div>
</template>

<script>
import SearchBar from '../../components/home/SearchBar.vue'
import TagGroup from '../../components/base/TagGroup.vue'
import SearchList from '../../components/search/SearchList.vue'
import { getStorageSync, setStorageSync, showLoading, hideLoading, showToast } from '../../api/wechat'
import { search, hotSearch } from '../../api/index'

export default {
  name: 'search',
  components: {
    TagGroup,
    SearchBar,
    SearchList
  },
  data() {
    return {
      hotSearch: [],
      historySearch: [],
      searchList: {},
      searchFocus: true,
      openId: '',
      hotKeyword: '',
      page: 1
    }
  },
  methods: {
    showBookDetail(text, index) {
      console.log(text, index)
    },
    changeHotSearch() {
      this.onHotSearch()
    },
    clearHistorySearch() {
      this.historySearch = []
      setStorageSync('historySearch', [])
    },
    searchKeyWord(keyword) {
      this.onSearch(keyword)
      this.$refs.searchRef.setValue(keyword)
    },
    onChange(keyword) {
      if (!keyword || keyword.trim().length === 0) {
        this.onClear()
        return
      }
      this.page = 1
      this.onSearch(keyword.trim())
    },
    onSearch(keyword) {
      search({
        keyword,
        openId: this.openId,
        page: this.page
      }).then(res => {
        this.searchList = res.data.data
      })
    },
    onClear() {
      this.page = 1
      this.searchList = {}
    },
    onHotSearch() {
      hotSearch().then(res => {
        this.hotSearch = res.data.data
      })
    },
    onConfirm(keyword) {
      if (!keyword || keyword.trim().length === 0) {
        keyword = this.hotKeyword
        this.$refs.searchRef.setValue(keyword)
      }
      this.onSearch(keyword)
      if (!this.historySearch.includes(keyword)) {
        this.historySearch.push(keyword)
        setStorageSync('historySearch', this.historySearch)
      }
      this.searchFocus = false
    }
  },
  computed: {
    showList() {
      const keys = Object.keys(this.searchList)
      return keys.length > 0
    },
    hotSearchArray() {
      const _hotSearch = []
      this.hotSearch.forEach(item => {
        _hotSearch.push(item.title)
      })
      return _hotSearch
    }
  },
  mounted() {
    this.page = 1
    this.openId = getStorageSync('openid')
    this.onHotSearch()
    this.hotKeyword = this.$route.query.hotSearch
    this.historySearch = getStorageSync('historySearch') || []
  },
  onPageScroll() {
    this.searchFocus && (this.searchFocus = false)
  },
  onReachBottom() {
    if (this.showList) {
      this.page++
      const keyword = this.$refs.searchRef.getValue()
      showLoading('正在加载中')
      search({
        keyword,
        openId: this.openId,
        page: this.page
      }).then(res => {
        const { book } = res.data.data
        if (book && book.length > 0) {
          this.searchList.book = this.searchList.book.concat(book)
        } else {
          showToast('没有更多数据了')
        }
        hideLoading()
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
