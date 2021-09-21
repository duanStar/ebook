<template>
  <div class="auth-wrapper">
    <div class="auth">
      <div class="auth-info">
        <div class="auth-img">
          <ImageView src="https://www.youbaobao.xyz/mpvue-res/logo.jpg" round :height="'100%'" mode="scaleToFill" />
        </div>
        <div class="sub-title">登录小慕读书</div>
        <div class="title">全场好书免费读</div>
      </div>
      <button class="auth-btn" open-type="getUserInfo" @getuserinfo="getUserInfo">授权登录</button>
    </div>
  </div>
</template>

<script>
import ImageView from './ImageView.vue'
export default {
  components: { ImageView },
  name: 'Auth',
  methods: {
    getUserInfo() {
      console.log(1)
      this.$emit('getUserInfo')
    }
  }
}
</script>

<style lang="scss" scoped>
  .auth-wrapper {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: #999;
    z-index: 1000;
    .auth {
      position: relative;
      width: 270px;
      height: 248px;
      padding: 22.5px 0 0 0;
      background-color: #f5f5f5;
      border-radius: 18px;
      .auth-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .auth-img {
          width: 74px;
          height: 74px;
        }
        .sub-title {
          font-size: 13px;
          color: #999;
          margin-top: 18px;
        }
        .title {
          font-size: 16px;
          color: #333;
          line-height: 18.5px;
          font-weight: 700;
          margin-top: 3.5px;
        }
      }
      .auth-btn {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 49px;
        font-size: 15px;
        color: #fff;
        line-height: 49px;
        background-image: linear-gradient(90deg, #1EA3F5 0%, #0F87FC 100%);
        border-radius: 0 0 18px 18px;
      }
    }
  }
</style>
