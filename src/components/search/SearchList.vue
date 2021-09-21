<template>
  <div class="search-list-wrapper">
    <SearchItem icon="apps-o" :title="category" subTitle="Category" @onClick="showList(category, 'category')" v-if="category" />
    <SearchItem icon="contact" :title="author" subTitle="Author" @onClick="showList(author, 'author')" v-if="author" />
    <SearchItem icon="newspaper-o" :title="publisher" subTitle="Publisher" @onClick="showList(publisher, 'publisher')" v-if="publisher" />
    <SearchTable :data="data.book" />
  </div>
</template>

<script>
import SearchItem from './SearchItem.vue'
import SearchTable from './SearchTable.vue'

export default {
  name: 'SearchList',
  components: {
    SearchItem,
    SearchTable
  },
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  methods: {
    showList(text, key) {
      this.$router.push({
        path: '/pages/list/main',
        query: {
          text,
          key
        }
      })
    }
  },
  computed: {
    category() {
      return (this.data && this.data.category && this.data.category.length > 0 && this.data.category[0].categoryText) || null
    },
    author() {
      return (this.data && this.data.author && this.data.author.length > 0 && this.data.author[0].author) || null
    },
    publisher() {
      return (this.data && this.data.publisher && this.data.publisher.length > 0 && this.data.publisher[0].publisher) || null
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
