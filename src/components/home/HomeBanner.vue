<template>
  <div class="home-banner">
    <div class="bg-img" @click="onClick" :style="{ backgroundImage: bgImage }">
      <div class="title">
        {{ title }}
      </div>
      <div class="sub-title">
        {{ subTitle }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeBanner',
  props: {
    title: {
      type: String,
      default: ''
    },
    img: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    }
  },
  methods: {
    onClick() {
      this.$emit('onClick')
    }
  },
  computed: {
    bgImage() {
      return `url(${this.img.length ? this.img : ''})`
    }
  }
}
</script>

<style lang="scss" scoped>
  .home-banner {
    padding: 20px 20px 0;
    .bg-img {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 125px;
      border-radius: 10px;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      .title {
        font-size: 18px;
        font-weight: 500;
        color: #fff;
        text-align: center;
      }
      .sub-title {
        padding: 5px 15px;
        background-color: #4585ff;
        margin-top: 10px;
        font-size: 14px;
        color: #fff;
        text-align: center;
        border: 1px solid #fff;
        border-radius: 50px;
      }
    }
  }
</style>
