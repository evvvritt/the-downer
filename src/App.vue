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
</style>
