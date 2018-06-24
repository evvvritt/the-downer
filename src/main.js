// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Prismic from 'prismic-javascript'
import { RichText } from 'prismic-dom'

Vue.config.productionTip = process.env.NODE_ENV === 'production'
Vue.config.PrismicAPI = process.env.PRISMIC

// Get Prismic API
Vue.getPrismicAPI = function () {
  return Prismic.getApi(this.config.PrismicAPI)
    .then(api => api)
    .catch(err => console.error(err))
}

// Prismic raw Text
Vue.filter('text', function (field) {
  if (!field || !field[0]) return ''
  return field[0].text
})

// Prismic Rich Text
Vue.filter('richtext', function (key) {
  if (!key) return ''
  const html = RichText.asHtml(key, (doc) => {
    // Link Resolving
    if (doc.type === 'exhibition') return '/exhibitions/' + doc.uid
    if (doc.type === 'home') return '/'
    // Fallback
    return '/doc/' + doc.uid
  })
  return html
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
