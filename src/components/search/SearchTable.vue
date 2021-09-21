<template>
  <div class="search-table-wrapper">
    <div class="search-table-inner">
      <div class="search-table" @click="onClick(item)" v-for="(item, index) in bookData" :key="index">
        <div class="book-img-wrapper">
          <ImageView :src="item.cover" height="100%" mode="scaleToFill" />
        </div>
        <div class="book-info-wrapper">
          <div class="book-title book-common">{{item.title}}</div>
          <div class="book-author book-common">{{item.author}}</div>
          <div class="book-category book-common">{{item.text}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageView from '../base/ImageView.vue'
import { CATEGORY } from '../../utils/constant'

export default {
  name: 'SearchTable',
  components: {
    ImageView
  },
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  methods: {
    onClick(book) {
      this.$router.push({
        path: '/pages/detail/main',
        query: {
          fileName: book.fileName
        }
      })
      this.$emit('onClick', book)
    }
  },
  computed: {
    bookData() {
      const _bookData = this.data
      _bookData.forEach(item => {
        item.text = CATEGORY[item.categoryText.toLowerCase()]
      })
      return _bookData
    }
  }
}
</script>

<style lang="scss" scoped>
  .search-table-wrapper {
    .search-table-inner {
      .search-table {
        display: flex;
        align-items: center;
        padding: 14px 16px;
        .book-img-wrapper {
          width: 47px;
          height: 68.5px;
        }
        .book-info-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          margin-left: 15.5px;
          overflow: hidden;
          .book-common {
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            word-break: break-all;
          }
          .book-title {
            width: 100%;
            font-size: 16px;
            color: #333333;
            line-height: 22.5px;
            font-weight: 500;
            max-height: 22.5px;
          }
          .book-author {
            font-size: 13px;
            color: rgba(0,0,0,0.65);
            line-height: 18px;
            max-height: 18px;
            margin-top: 5px;
          }
          .book-category {
            font-size: 13px;
            color: rgba(0,0,0,0.45);
            line-height: 18px;
            max-height: 18px;
          }
        }
      }
    }
  }
</style>
