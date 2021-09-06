<template>
  <div id="app">
    <Home></Home>
  </div>
</template>

<script>
import Home from "@/views/layout/Home";
export default {
  name: 'App',
  components: {
    Home
  }
}
</script>

<style>
  #app{
    height: 100%;
  }
</style>
