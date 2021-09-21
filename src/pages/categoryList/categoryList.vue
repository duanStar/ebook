<template>
  <div>
    <HomeBook :row="category.length / 2" :col="2" :data="category" mode="category" :btnText="'查看全部'"  showBtn :showTitle="false" :linearBg="false" @onMoreClick="onCategoryMoreClick" @onBookClick="onBookClick"></HomeBook>
  </div>
</template>

<script>
import { categoryList } from '../../api'
import HomeBook from '../../components/home/HomeBook.vue'

export default {
  name: 'categoryList',
  components: {
    HomeBook
  },
  data() {
    return {
      category: []
    }
  },
  mounted() {
    categoryList().then(res => {
      this.category = res.data.data
    })
  },
  methods: {
    onBookClick(book) {
      this.$router.push({
        path: '/pages/list/main',
        query: {
          text: book.categoryText,
          key: 'category'
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
