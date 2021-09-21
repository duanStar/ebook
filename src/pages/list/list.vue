<template>
  <div>
    <SearchTable :data="data" />
  </div>
</template>

<script>
import SearchTable from '../../components/search/SearchTable.vue'
import { searchList } from '../../api/index'
import { hideLoading, showLoading, showToast, setNavigationBarTitle } from '../../api/wechat'

export default {
  name: 'list',
  components: {
    SearchTable
  },
  data() {
    return {
      data: [],
      page: 1
    }
  },
  methods: {
    onSearchList() {
      const { text, key } = this.$route.query
      searchList({
        [`${key}`]: text,
        page: this.page
      }).then(res => {
        this.data = res.data.data
      })
    }
  },
  mounted() {
    const { text } = this.$route.query
    this.page = 1
    this.onSearchList()
    setNavigationBarTitle(text)
  },
  onReachBottom() {
    showLoading('正在加载中')
    this.page++
    const { text, key } = this.$route.query
    searchList({
      [`${key}`]: text,
      page: this.page
    }).then(res => {
      const { data } = res.data
      if (data && data.length > 0) {
        this.data.push(...data)
      } else {
        showToast('已经到底啦')
      }
      hideLoading()
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
