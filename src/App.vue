<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import '@/assets/sass/common.sass'
export default {
    name: 'App',
    created () {
        // this.$router.push('/home')
    }
}
</script>
<style>
    #app{
        height: 100%;
    }
</style>

