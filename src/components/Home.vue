<template>
  <article class="center mx-auto p2 w-golden-1 sm-w-100 max-width-1">
    <header>
      <img class="block w-100 fit" src="../assets/the-downer-logo.png" alt="The Downer Logo">
      <h1 class="hidden">The Downer</h1>
    </header>
    <section class="my-1em children-mt-1em" v-if="doc" v-html="$options.filters.richtext(doc.text)"></section>
    <footer class="my4" v-show="doc">
      <subscribe></subscribe>
      <small class="block mt6 mx-auto" style="font-size:0.75em; max-width:18em">
        The Downer is made possible through the generosity of <a href=" http://www.mottodistribution.com/site/?page_id=1020" target="_blank" rel="nofollow">Motto Books</a>
      </small>
    </footer>
  </article>
</template>

<script>
import Vue from 'vue'
import Subscribe from '@/components/MailChimpSubscribe'
export default {
  name: 'Home',
  components: { Subscribe },
  data () {
    return {
      doc: null
    }
  },
  methods: {
    getDoc () {
      Vue.getPrismicAPI().then(api => {
        return api.getSingle('home')
          .then(doc => { this.doc = doc && doc.data })
          .catch(err => console.error(err))
      })
    }
  },
  created () {
    this.getDoc()
  }
}
</script>

<style>
</style>
