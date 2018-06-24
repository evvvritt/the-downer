<template>
  <div id="app" class="bg-white center">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import 'style/variables';
@import 'style/global';
@import 'style/atomic';

#app {
  font-family: 'Times New Roman', serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size:var(--basefont);
}

@media (min-width:1440px) {
  html{font-size:calc(10/1440 * 100vw);}
  #app{font-size:calc(18/1440 * 100vw);}
}

/* transitions */
.fade-enter-active,.fade-leave-active{transition:opacity 800ms;}
.fade-enter,.fade-leave-to{opacity:0;}
</style>
