<template>
  <article class="min-h-100vh">
    <transition name="fade">
      <div v-if="doc">
        <header class="pt6 px2 mb4 max-width-1 mx-auto content-box">
          <h1 class="h6 bold" v-if="doc.title">{{doc.title | text}}</h1>
          <h2 class="h6 mt-1em" v-if="doc.subtitle">{{doc.subtitle | text}}</h2>
        </header>
        <section class="px2 sm-p1 flex flex-wrap items-center justify-center">
          <figure class="p2 sm-p1 w-100 max-width-thmb" v-for="(item, index) in doc.images" :key="index">
            <img class="block w-100 cursor-pointer" :src="item.primary.image.thumbnail.url" :alt="item.primary.image.alt" @click="openViewer(index)">
          </figure>
          <div style="flex:1 0 auto"></div>
        </section>
        <section class="max-width-1 mx-auto content-box px2">
          <header class="my4 center">
            <span class="cursor-pointer underline inline-block px1" style="width:4em" @click="showText = !showText" cl>Text</span><a v-if="doc.pdf.url" class="inline-block border-left px1" style="width:4em" :href="doc.pdf.url" target="_blank" rel="noopener">PDF</a></header>
          <div class="mt6 left-align" :class="{'opacity-0 h-0': !showText}" v-html="$options.filters.richtext(doc.text)"></div>
        </section>
      </div>
    </transition>
    <transition name="quickfade">
      <div id="viewer" v-if="renderViewer" class="fixed overlay bg-white z1" v-show="viewer">
        <viewer ref="viewer" :slides="doc.images" :index="viewerIndex"></viewer>
        <a class="absolute top-0 right-0 cursor-pointer p2" title="Close" @click="viewer = false" style="font-size:1.5em">&#x2715;</a>
      </div>
    </transition>
  </article>
</template>

<script>
import Vue from 'vue'
import Viewer from '@/components/Viewer'
export default {
  name: 'Exhibition',
  props: ['uid'],
  components: { Viewer },
  data () {
    return {
      doc: null,
      showText: false,
      renderViewer: false,
      viewer: false,
      viewerIndex: 0
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
    },
    openViewer (index) {
      this.viewer = this.renderViewer = true
      this.viewerIndex = index
      if (this.$refs.viewer) return this.$refs.viewer.goTo(index)
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
