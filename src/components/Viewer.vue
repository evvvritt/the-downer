<template>
  <div class="carousel w-100">
    <div v-for="(slide, index) in slides" class="carousel-cell w-100 h-100vh flex items-center justify-center" :key="index">
      <figure class="relative w-100 h-100vh">
        <div v-if="optimalImgW" class="absolute bg-contain bg-center bg-no-repeat" :data-flickity-bg-lazyload="thumb(slide.primary.image)"></div>
      </figure>
    </div>
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
      flkty: null,
      optimalImgW: null,
      optimalImgH: null,
      sizes: [
        { label: 'xs', length: 640 },
        { label: 'small', length: 1024 },
        { label: 'medium', length: 1440 },
        { label: 'large', length: 1920 },
        { label: 'xl', length: 2880 }
      ]
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
    },
    getOptimalSize (length) {
      const dpx = window.devicePixelRatio || 1
      length = length * (dpx * 0.8)
      const isLarger = this.sizes.filter(size => size.length >= length)
      const best = isLarger.length > 0 ? isLarger[0] : this.sizes[this.sizes.length - 1]
      return best.label
    },
    thumb (image) {
      if (!image) return ''
      const isPortrait = image.dimensions.height > image.dimensions.width
      const size = isPortrait ? this.optimalImgH + '_h' : this.optimalImgW
      console.log(size)
      return (image[size] && image[size].url) || image.thumbnail.url
    }
  },
  created () {
    this.optimalImgW = this.getOptimalSize(window.innerWidth)
    this.optimalImgH = this.getOptimalSize(window.innerHeight)
  },
  mounted () {
    this.init()
    this.focus()
  }
}
</script>

<style scoped>
figure{
  max-width:2880px;
  max-height:2880px;
}
figure > div{
  top:3rem;
  left:3rem;
  width:calc(100% - 6rem);
  height:calc(100% - 6rem);
}
</style>
