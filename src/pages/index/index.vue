<template>
  <Global>
    <div class="home" v-if="isAuth">
      <SearchBar disabled @onClick="onSearchBarClick" :hotSearch="hotSearch.keyword"></SearchBar>
      <HomeCard :data="homeCard" @onClick="onHomeBookClick"></HomeCard>
      <HomeBanner :title="banner.title" :img="banner.img" :subTitle="banner.subTitle"></HomeBanner>
      <div style="margin-top: 23px;">
        <HomeBook :title="'为你推荐'" :row="1" :col="3" :data="recommend" mode="column" :btnText="'换一批'"   showBtn linearBg @onMoreClick="recommendChange('recommend')" @onBookClick="onHomeBookClick"></HomeBook>
      </div>
      <div>
        <HomeBook :title="'免费阅读'" :row="2" :col="2" :data="freeRead" mode="row" :btnText="'换一批'"   showBtn :linearBg="false" @onMoreClick="recommendChange('freeRead')" @onBookClick="onHomeBookClick"></HomeBook>
      </div>
      <div>
        <HomeBook :title="'当前最热'" :row="1" :col="4" :data="hotBook" mode="column" :btnText="'换一批'"   showBtn linearBg @onMoreClick="recommendChange('hotBook')" @onBookClick="onHomeBookClick"></HomeBook>
      </div>
      <div>
        <HomeBook :title="'分类'" :row="3" :col="2" :data="category" mode="category" :btnText="'查看全部'"  showBtn :linearBg="false" @onMoreClick="onCategoryMoreClick" @onBookClick="onCategoryClick"></HomeBook>
      </div>
    </div>
    <Auth v-else @getUserInfo="init"/>
  </Global>
</template>

<script>
import SearchBar from '../../components/home/SearchBar.vue'
import HomeCard from '../../components/home/HomeCard.vue'
import HomeBanner from '../../components/home/HomeBanner.vue'
import HomeBook from '../../components/home/HomeBook.vue'
import { getHomeData, recommend, hotBook, freeRead, register } from '../../api/index'
import { getSetting, getUserInfo, setStorageSync, getStorageSync, getUserOpenId, showLoading, hideLoading } from '../../api/wechat'
import Auth from '../../components/base/Auth.vue'
import Global from '../../components/Global.vue'

export default {
  name: 'index',
  components: {
    SearchBar,
    HomeCard,
    HomeBanner,
    HomeBook,
    Auth,
    Global
  },
  data() {
    return {
      hotSearch: '',
      banner: {},
      recommend: [],
      freeRead: [],
      hotBook: [],
      category: [],
      homeCard: {},
      isAuth: true
    }
  },
  methods: {
    getHomeData(openid, userInfo) {
      getHomeData({ openid }).then(res => {
        const { hotSearch, shelf, banner, recommend, freeRead, hotBook, category, shelfCount } = res.data.data
        this.hotSearch = hotSearch
        this.banner = banner
        this.recommend = recommend
        this.freeRead = freeRead
        this.hotBook = hotBook
        this.category = category
        this.homeCard = {
          bookList: shelf,
          num: shelfCount,
          userInfo
        }
        hideLoading()
      }).catch(err => {
        console.log(err)
        hideLoading()
      })
    },
    onSearchBarClick() {
      this.$router.push({
        path: '/pages/search/main',
        query: {
          hotSearch: this.hotSearch.keyword
        }
      })
    },
    recommendChange(key) {
      switch (key) {
        case 'recommend':
          recommend().then(res => {
            this.recommend = res.data.data
          })
          break
        case 'freeRead':
          freeRead().then(res => {
            this.freeRead = res.data.data
          })
          break
        case 'hotBook':
          hotBook().then(res => {
            this.hotBook = res.data.data
          })
          break
        default:
          break
      }
    },
    onCategoryMoreClick() {
      this.$router.push({
        path: '/pages/categoryList/main'
      })
    },
    getSetting() {
      getSetting('userInfo', () => {
        this.isAuth = true
        showLoading('正在加载中')
        this.getUserInfo()
      }, () => {
        this.isAuth = false
      })
    },
    getUserInfo() {
      const onOpenIdComplete = (openid, userInfo) => {
        this.getHomeData(openid, userInfo)
        register(openid, userInfo)
      }
      getUserInfo((userInfo) => {
        setStorageSync('userInfo', userInfo)
        const openid = getStorageSync('openid')
        if (!openid || openid.length === 0) {
          getUserOpenId((openid) => {
            onOpenIdComplete(openid, userInfo)
          })
        } else {
          onOpenIdComplete(openid, userInfo)
        }
      }, (res) => {
        console.log(res)
      })
    },
    init() {
      this.getSetting()
    },
    onHomeBookClick(book) {
      this.$router.push({
        path: '/pages/detail/main',
        query: {
          fileName: book.fileName
        }
      })
    },
    onCategoryClick(book) {
      this.$router.push({
        path: '/pages/list/main',
        query: {
          text: book.categoryText,
          key: 'category'
        }
      })
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style scoped>

</style>
