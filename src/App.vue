<template>
  <div id="app">
    <h3>demo1 link</h3>
    <vue-quill/>
    <h3 style="margin-top: 60px">demo2 line-height</h3>
    <vue-line-height/>
  </div>
</template>

<script>
/* eslint-disable */
import vueQuill from './components/vueQuill.vue'
import vueLineHeight from './components/vueLineHeight.vue'

export default {
  name: 'app',
  components: {
    vueQuill,
    vueLineHeight
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
