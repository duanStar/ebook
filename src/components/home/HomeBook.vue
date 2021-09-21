<template>
  <div class="home-book" :style="{backgroundImage: linearBg ? 'linear-gradient(-180deg, #FFFFFF 0%, #F9F9F9 100%)' : ''}">
    <div class="home-book-header" v-if="showTitle">{{ title }}</div>
    <div class="home-book-content" :style="{padding: mode === HOME_BOOK_MODE.CATEGORY ? '10.5px 14px 0' : ''}">
      <div class="home-book-row" v-for="(rowData, index) in bookData" :key="index">
        <div class="home-book-col" :style="{flex: '0 0 ' + (100 / col) + '%', padding: mode === HOME_BOOK_MODE.CATEGORY ? '0 6px' : ''}" v-for="(book, bookIndex) in rowData" :key="bookIndex">
          <div class="book-wrapper" :style="{ flexDirection: mode }" @click="onBookClick(book)" v-if="mode === HOME_BOOK_MODE.COL || mode === HOME_BOOK_MODE.ROW">
            <ImageView :src="book.cover"></ImageView>
            <div class="book-title-wrapper book-title-col" v-if="HOME_BOOK_MODE.COL === mode">
              <div class="book-title">{{book.title}}</div>
            </div>
            <div class="book-title-wrapper book-title-row" v-else-if="HOME_BOOK_MODE.ROW === mode">
              <div class="book-title">{{book.title}}</div>
              <div class="title-author-wrapper">
                <div class="book-title book-author">{{book.author}}</div>
                <div class="book-title book-author">{{book.categoryText}}</div>
              </div>
            </div>
          </div>
          <div class="category-wrapper" @click="onBookClick(book)" v-else>
            <div class="category-text">{{book.text}}</div>
            <div class="category-num">{{book.num}}本书</div>
            <div class="category-img-wrapper">
              <div class="category-img1">
                <ImageView :src="book.cover"></ImageView>
              </div>
              <div class="category-img2">
                <ImageView :src="book.cover2"></ImageView>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="home-book-footer" v-if="showBtn">
      <van-button round custom-class="home-book-btn" @click="onMoreClick">{{btnText}}</van-button>
    </div>
  </div>
</template>

<script>
import { HOME_BOOK_MODE, CATEGORY } from '../../utils/constant'
import ImageView from '../base/ImageView.vue'

export default {
  name: 'HomeBook',
  props: {
    title: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default: []
    },
    btnText: {
      type: String,
      default: ''
    },
    row: {
      type: Number,
      default: 0
    },
    col: {
      type: Number,
      default: 1
    },
    mode: {
      type: String,
      default: HOME_BOOK_MODE.ROW
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    showBtn: {
      type: Boolean,
      default: true
    },
    linearBg: {
      type: Boolean,
      default: true
    }
  },
  components: {
    ImageView
  },
  methods: {
    onMoreClick() {
      this.$emit('onMoreClick')
    },
    onBookClick(book) {
      this.$emit('onBookClick', book)
    }
  },
  computed: {
    bookData() {
      const { row, col, data } = this
      if (data && data.length) {
        data.forEach(item => {
          if (item.categoryText) {
            item.text = CATEGORY[item.categoryText.toLowerCase()]
          }
        })
        const number = row * col
        const _bookData = data.slice(0, number)
        const _bookDataRow = []
        let _row = 0
        while (_row < row) {
          _bookDataRow.push(_bookData.slice(_row * col, _row * col + col))
          _row++
        }
        return _bookDataRow
      } else {
        return []
      }
    },
    HOME_BOOK_MODE() {
      return HOME_BOOK_MODE
    }
  }
}
</script>

<style lang="scss" scoped>
  .home-book {
    .home-book-header {
      padding: 16px 0 0 20.5px;
      font-weight: 700;
    }
    .home-book-content {
      padding: 10.5px 12px 0;
      .home-book-row {
        display: flex;
        flex-wrap: nowrap;
        margin-top: 12px;
        box-sizing: border-box;
        overflow: hidden;
        .home-book-col {
          padding: 0 8px;
          box-sizing: border-box;
          .book-wrapper {
            display: flex;
            .book-title-wrapper {
              &.book-title-col {
                .book-title {
                  font-size: 12px;
                  color: #212731;
                  line-height: 16.5px;
                  max-height: 33px;
                  font-weight: 500;
                  overflow: hidden;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                  word-break: break-all;
                }
              }
              &.book-title-row {
                flex: 0 0 50%;
                padding: 10px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .book-title {
                  font-size: 14px;
                  color: #1f1f1f;
                  line-height: 18px;
                  max-height: 36px;
                  font-weight: 500;
                  overflow: hidden;
                  word-break: break-all;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                }
                .book-author {
                  font-size: 12px;
                  color: #868686;
                  line-height: 14px;
                  max-height: 14px;
                  font-weight: 500;
                  -webkit-line-clamp: 1;
                }
              }
            }
          }
          .category-wrapper {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background-color: #F8F9FB;
            border-radius: 10px;
            height: 96px;
            padding: 13px 0 14.5px 16px;
            box-sizing: border-box;
            .category-text {
              width: 150px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 16px;
              color: #212832;
              line-height: 22.5px;
              font-weight: 500;
            }
            .category-num {
              font-size: 12px;
              line-height: 16.5px;
              color: #868686;
            }
            .category-img-wrapper {
              position: absolute;
              right: 0;
              bottom: 0;
              .category-img1 {
                position: absolute;
                right: 0;
                bottom: -5px;
                z-index: 100;
                width: 48px;
              }
              .category-img2 {
                position: absolute;
                right: 30px;
                bottom: -5px;
                z-index: 90;
                width: 36px;
              }
            }
          }
        }
      }
    }
    .home-book-footer {
      padding: 12px 20px 20px;
    }
  }
</style>
<style lang="scss">
  .home-book-footer {
    .home-book-btn {
      width: 100%;
      color: #3696EF;
      font-size: 14px;
      border-color: #EDEEEE;
    }
  }
  .category-img1 {
    image {
      border-radius: 0 0 10px 0;
    }
  }
</style>
