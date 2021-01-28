<template lang="pug">
  .global-wrapper
    .floor-wrapper
      .floor
        .book-list
          template(v-for="book in $data.books")
            .book-item(@click="selectBook(book)")
              img(class="cover" :src="book.coverImage")
              .back
    template(v-if="$data.selected")
      .menu-overlay(@click="closeMenu")
    transition(name="menu" tag="div")
      template(v-if="$data.selected")
        .side-menu
          p(class="volume") VOL.{{$data.selectedBook.volume}}
          img(class="cover" :src="$data.selectedBook.coverImage")
          p(class="title") {{$data.selectedBook.title}}
          p(class="price") ￥{{$data.selectedBook.price}}
          p(class="date") {{$data.selectedBook.publishedAt}}
          .description {{$data.selectedBook.description}}
</template>

<script>
export default {
  data() {
    return {
      books: [],
      selected: false,
      selectedBook: {
        volume: null,
        coverImage: null,
        title: null,
        publishedAt: null,
        description: null,
        price: null
      }
    };
  },
  mounted: function () {
    axios
      .get("https://s3-us-west-2.amazonaws.com/s.cdpn.io/1315882/books.json")
      .then((res) => {
        this.$data.books = res.data.books;
      });
  },
  methods: {
    selectBook(book) {
      this.$data.selected = true;
      this.$data.selectedBook = book;
    },
    closeMenu() {
      this.$data.selected = false;
    }
  }
};
</script>

<style lang="scss">
.global-wrapper {
  background: linear-gradient(-45deg, #ccc, #fff);
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.menu-enter-active,
.menu-leave-active {
  transition: all 0.45s cubic-bezier(0.15, 0.6, 0.52, 1);
}
.menu-enter, .menu-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateX(100%);
  opacity: 0;
}

.floor-wrapper {
  width: 1000px;
  perspective: 500px;

  > .floor {
    transform-style: preserve-3d;
    transform: rotateX(35deg) rotateZ(-30deg) translateY(-50%);
    width: 880px;
    margin-left: 100px;
  }
}

.book-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: -80px;
}

.book-item {
  width: 200px;
  margin-bottom: 30px;
  transform: translateZ(2px);
  cursor: pointer;
  transform-style: preserve-3d;
  position: relative;

  &::before,
  &::after {
    content: "";
    display: block;
    position: absolute;
  }

  &::before {
    background-color: #777;
    height: 100%;
    width: 10px;
    top: 0;
    left: 0;
    transform-origin: left;
    transform: rotateY(90deg);
  }

  &::after {
    background: linear-gradient(to bottom, #fff, #dadada);
    height: 10px;
    width: 100%;
    top: 100%;
    transform-origin: top;
    transform: rotateX(-90deg);
  }

  &:hover {
    > .cover {
      animation: blink .5s linear alternate infinite;
      box-shadow: 0 0 10px yellow;
    }
  }

  > .cover {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: filter .2s;
  }

  > .back {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    transform: translateZ(-10px);
    box-shadow: 0 0 10px rgba(black, 0.2);
  }
  
  @keyframes blink {
    from {
      filter: brightness(1);
    }
    
    to {
      filter: brightness(1.2);
    }
  }
}

.side-menu {
  width: 440px;
  height: 100vh;
  overflow-y: scroll;
  background-color: rgba(white, 0.9);
  position: absolute;
  top: 0;
  right: 0;
  padding: 20px 20px 80px 40px;
  box-sizing: border-box;

  > .cover {
    display: block;
    width: 100%;
    margin-bottom: 20px;
  }

  > .volume {
    font-family: "Raleway", sans-serif;
    color: #888;
    font-size: 14px;
    margin-bottom: 14px;
  }

  > .title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  > .price {
    font-family: "Raleway", sans-serif;
    color: #888;
    font-size: 16px;
    margin-bottom: 12px;
  }

  > .date {
    font-family: "Raleway", sans-serif;
    color: #888;
    font-size: 16px;
    margin-bottom: 20px;
  }

  > .description {
    line-height: 1.7;
    font-size: 14px;
  }
}

.menu-overlay {
  width: 100vw;
  height: 100vh;
  background-color: rgba(black, 0.4);
  position: absolute;
  top: 0;
  left: 0;
}
</style>
