<template>
  <div>
    <DetailBook :book="book" />
    <DetailStat :readerNum="readerNum" :readers="readers" :rankAvg="rankAvg" :rankNum="rankNum" />
    <DetailRate @onRateChange="onRateChange" :rateValue="rankAvg" />
    <DetailContents :contents="contents" @readBook="readBook" />
    <DetailBottom :isInShelf="isInShelf" @handleShelf="handleShelf" @readBook="readBook"/>
  </div>
</template>

<script>
import DetailBook from '../../components/detail/DetailBook.vue'
import DetailStat from '../../components/detail/DetailStat.vue'
import DetailRate from '../../components/detail/DetailRate.vue'
import DetailContents from '../../components/detail/DetailContents.vue'
import DetailBottom from '../../components/detail/DetailBottom.vue'
import { bookDetail, bookRate, bookContents, bookIsInShelf, bookShelfSave, bookShelfRemove } from '../../api/index'
import { getStorageSync, showToast, showModal } from '../../api/wechat'

export default {
  name: 'detail',
  components: {
    DetailBook,
    DetailStat,
    DetailRate,
    DetailContents,
    DetailBottom
  },
  data() {
    return {
      book: {},
      openId: '',
      contents: [],
      isInShelf: false
    }
  },
  mounted() {
    const openId = getStorageSync('openid')
    this.openId = openId
    this.getBookDetail(openId)
    this.getBookContents()
    this.getBookIsInShelf(openId)
  },
  computed: {
    readers() {
      return this.book.readers ? this.book.readers : []
    },
    rankNum() {
      return this.book.rankNum ? this.book.rankNum : 0
    },
    readerNum() {
      return this.book.readerNum ? this.book.readerNum : 0
    },
    rankAvg() {
      return this.book.rankAvg ? this.book.rankAvg : 0
    }
  },
  methods: {
    onRateChange(rank) {
      const { fileName } = this.$route.query
      bookRate({
        fileName,
        openId: this.openId,
        rank
      }).then(res => {
        showToast('评分成功', 'success').then(res => {
          this.getBookDetail(this.openId)
        })
      })
    },
    getBookDetail(openId) {
      const { fileName } = this.$route.query
      bookDetail({
        openId,
        fileName
      }).then(res => {
        this.book = res.data.data
      })
    },
    getBookContents() {
      const { fileName } = this.$route.query
      bookContents({
        fileName
      }).then(res => {
        this.contents = res.data.data
      })
    },
    readBook(href) {
      let query = {
        fileName: this.book.fileName,
        opf: this.book.opf
      }
      if (href) {
        query.navigation = href.replace(/^OEBPS\/{1}/, '')
      }
      if (this.book && this.book.fileName) {
        this.$router.push({
          path: '/pages/read/main',
          query
        })
      }
    },
    getBookIsInShelf(openId) {
      const { fileName } = this.$route.query
      bookIsInShelf({
        openId,
        fileName
      }).then(res => {
        const { data } = res.data
        if (data && data.length > 0) {
          this.isInShelf = true
        } else {
          this.isInShelf = false
        }
      })
    },
    handleShelf() {
      const { fileName } = this.$route.query
      if (!this.isInShelf) {
        bookShelfSave({
          fileName,
          openId: this.openId
        }).then(res => {
          showToast('加入成功', 'success')
          this.getBookIsInShelf(this.openId)
        })
      } else {
        showModal(this.book.title, () => {
          bookShelfRemove({
            fileName,
            openId: this.openId
          }).then(res => {
            showToast('移出成功', 'success')
            this.getBookIsInShelf(this.openId)
          })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
