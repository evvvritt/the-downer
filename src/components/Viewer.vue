<template>
  <div class="carousel w-100">
    <figure v-for="(slide, index) in slides" class="carousel-cell w-100 min-h-100vh relative" :key="index">
      <div class="absolute bg-contain bg-center bg-no-repeat" :data-flickity-bg-lazyload="slide.primary.image.url">
      </div>
    </figure>
  </div>
</template>

<script>
import Flickity from 'flickity-bg-lazyload'
export default {
  name: 'Viewer',
  props: {
    slides: {type: Array, default: () => []},
    index: {type: Number, default: 0}
  },
  data () {
    return {
      flkty: null
    }
  },
  methods: {
    init () {
      this.flkty = new Flickity(this.$el, {
        initialIndex: this.index > -1 ? this.index : 0,
        lazyLoad: 1,
        bgLazyLoad: 1,
        // imagesLoaded: true,
        pageDots: false,
        prevNextButtons: false,
        selectedAttraction: 0.02,
        friction: 0.28,
        wrapAround: true
      })
      // next on static click
      this.flkty.on('staticClick', function (event, pointer, cellElement, cellIndex) {
        if (event.x < cellElement.offsetWidth * 0.33) return this.previous()
        return this.next()
      })
    },
    goTo (index) {
      if (!this.flkty || index < 0) return
      this.flkty.selectCell(index, true, true)
      this.focus()
    },
    focus () {
      setTimeout(() => this.$el.focus(), 0)
    }
  },
  mounted () {
    this.init()
    this.focus()
  }
}
</script>

<style scoped>
figure > div{
  top:3rem;
  left:3rem;
  width:calc(100% - 6rem);
  height:calc(100% - 6rem);
}
</style>
