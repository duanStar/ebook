<template>
  <div>
    <ShelfUserInfo :userInfo="userInfo" :readDay="readDay" :num="num" />
    <ShelfList :shelfList="shelfList"/>
  </div>
</template>

<script>
import { getStorageSync } from '../../api/wechat'
import ShelfUserInfo from '../../components/shelf/ShelfUserInfo.vue'
import ShelfList from '../../components/shelf/ShelfList.vue'
import { userDay, bookShelf } from '../../api/index'

export default {
  name: 'shelf',
  components: {
    ShelfUserInfo,
    ShelfList
  },
  data() {
    return {
      userInfo: {},
      readDay: 0,
      num: 0,
      shelfList: []
    }
  },
  methods: {
    onBookShelf() {
      const openId = getStorageSync('openid')
      bookShelf({
        openId
      }).then(res => {
        res.data.data.push({})
        this.shelfList = res.data.data
        this.num = res.data.data.length
      })
    },
    onUserDay() {
      const openId = getStorageSync('openid')
      userDay({
        openId
      }).then(res => {
        this.readDay = res.data.data.day
      })
    }
  },
  onShow() {
    const userInfo = getStorageSync('userInfo')
    this.userInfo = userInfo
    this.onUserDay()
    this.onBookShelf()
  }
}
</script>

<style lang="scss" scoped>

</style>
