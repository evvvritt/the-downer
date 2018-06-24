<template>
  <article class="min-h-100vh">
    <transition name="fade">
      <div v-if="doc">
        <header class="mt6 px2 mb4">
          <h1 class="h6" v-if="doc.title">{{doc.title | text}}</h1>
          <h2 class="h6 mt-1em" v-if="doc.date">{{doc.date}}</h2>
        </header>
        <section class="px2 sm-p1 flex flex-wrap items-center justify-center">
          <figure class="p2 sm-p1 w-100 max-width-thmb" v-for="(item, index) in doc.images" :key="index">
            <img class="block w-100 cursor-pointer" :src="item.primary.image.thumbnail.url" :alt="item.primary.image.alt">
          </figure>
          <figure class="p2 sm-p1 w-100 max-width-thmb" v-for="(item, index) in doc.images" :key="index">
            <img class="block w-100 cursor-pointer" :src="item.primary.image.thumbnail.url" :alt="item.primary.image.alt">
          </figure>
          <figure class="p2 sm-p1 w-100 max-width-thmb" v-for="(item, index) in doc.images" :key="index">
            <img class="block w-100 cursor-pointer" :src="item.primary.image.thumbnail.url" :alt="item.primary.image.alt">
          </figure>
          <figure class="p2 sm-p1 w-100 max-width-thmb" v-for="(item, index) in doc.images" :key="index">
            <img class="block w-100 cursor-pointer" :src="item.primary.image.thumbnail.url" :alt="item.primary.image.alt">
          </figure>
          <figure class="p2 sm-p1 w-100 max-width-thmb" v-for="(item, index) in doc.images" :key="index">
            <img class="block w-100 cursor-pointer" :src="item.primary.image.thumbnail.url" :alt="item.primary.image.alt">
          </figure>
          <figure style="flex:1 0 auto"></figure>
        </section>
        <section class="my4 content-box px2" v-html="$options.filters.richtext(doc.text)"></section>
        <footer></footer>
      </div>
    </transition>
  </article>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'Exhibition',
  props: ['uid'],
  data () {
    return {
      doc: null
    }
  },
  methods: {
    getDoc (uid) {
      if (!uid) return this.$router.push('/not-found')
      Vue.getPrismicAPI().then(api => {
        return api.getByUID('exhibition', uid)
          .then(doc => { this.doc = doc && doc.data })
          .catch(err => console.err(err))
      })
    }
  },
  created () {
    this.getDoc(this.uid)
  }
}
</script>

<style scoped>
figure{
  flex: 0 1 50%;
}
@media (min-width:568px) {
  figure{
    flex:0 1 33.33%;
  }
}
@media (min-width:812px) {
  figure{
    flex: 0 1 25%;
  }
}
@media (min-width:1280px) {
  figure{
    flex: 0 1 20%;
  }
}
</style>
