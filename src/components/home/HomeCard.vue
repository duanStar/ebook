<template>
  <div class="home-card">
    <div class="home-card-inner">
      <div class="user-info">
        <div class="avatar-wrapper">
          <image-view :src="avatar" round :height="'100%'" mode="scaleToFill"></image-view>
        </div>
        <div class="nickname">{{nickname}}</div>
        <div class="shelf-text">书架共有{{data.num}}本好书</div>
        <div class="round-item"></div>
        <div class="shelf-text">特别精选</div>
      </div>
      <div class="book-info">
        <div class="book-wrapper">
          <div class="book-img-wrapper" v-for="(item, index) in bookList" :key="index" @click="onBookClick(item)">
            <image-view :src="item.cover"></image-view>
          </div>
        </div>
        <div class="shelf-wrapper" @click="gotoShelf">
          <div class="shelf">书架</div>
          <van-icon class="arrow" name="arrow" size="11px" color="#828489"></van-icon>
        </div>
      </div>
      <div class="feedback-wrapper" @click="onFeedBackClick">反馈</div>
    </div>
    <van-dialog id="van-dialog" />
  </div>
</template>

<script>
import ImageView from '../base/ImageView.vue'
import Dialog from 'vant-weapp/dist/dialog/dialog'

export default {
  name: 'HomeCard',
  components: { ImageView },
  props: {
    data: {
      type: Object,
      default: null
    },
    hasSign: {
      type: Boolean,
      default: false
    },
    signDay: {
      type: Number,
      default: 0
    }
  },
  methods: {
    gotoShelf() {
      this.$router.push({
        path: '/pages/shelf/main'
      })
    },
    onBookClick(book) {
      this.$emit('onClick', book)
    },
    sign() {},
    onFeedBackClick() {
      Dialog.confirm({
        selector: '#van-dialog',
        title: '反馈',
        message: '您是否确认提交反馈信息?',
        confirmButtonText: '是',
        cancelButtonText: '否'
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  },
  computed: {
    avatar() {
      return (this.data && this.data.userInfo && this.data.userInfo.avatarUrl) || ''
    },
    nickname() {
      return (this.data && this.data.userInfo && this.data.userInfo.nickName) || ''
    },
    bookList() {
      return (this.data && this.data.bookList) || []
    }
  }
}
</script>

<style lang="scss" scoped>
  .home-card {
    background-image: linear-gradient(-90deg, #54575F 0%, #595B60 100%);
    border-radius: 15px;
    margin: 22px 20px 0;
    .home-card-inner {
      position: relative;
      padding: 21.5px 17px 20px 20px;
      box-sizing: border-box;
      .user-info {
        display: flex;
        align-items: center;
        .avatar-wrapper {
          width: 20px;
          height: 20px;
        }
        .nickname {
          margin: 0 8.5px;
          font-size: 12px;
          color: #fff;
        }
        .shelf-text {
          opacity: 0.7;
          font-size: 12px;
          color: #fff;
        }
        .round-item {
          width: 4px;
          height: 4px;
          margin: 0 8px;
          border-radius: 50%;
          background-color: #A2A2A2;
        }
      }
      .book-info {
        margin-top: 18.5px;
        display: flex;
        .book-wrapper {
          display: flex;
          flex: 1;
          .book-img-wrapper {
            width: 72px;
            height: 101px;
            margin-right: 20px;
          }
        }
        .shelf-wrapper {
          display: flex;
          align-items: center;
          .shelf {
            width: 11px;
            font-size: 11px;
            word-break: break-word;
            opacity: 0.8;
            color: #fff;
          }
        }
      }
      .feedback-wrapper {
        position: absolute;
        top: 19.5px;
        right: 0;
        // opacity: .3;
        width: 44.5px;
        height: 23.5px;
        line-height: 23.5px;
        text-align: center;
        border-radius: 100px 0 0 100px;
        background-color: #707070;
        color: #fff;
        font-size: 11px;
      }
    }
  }
</style>
