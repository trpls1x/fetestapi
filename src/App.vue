<template>
  <div id="app">
    <cinema-header/>
  </div>
</template>

<script>
import CinemaHeader from '@/components/Header'

export default {
  components: {
    CinemaHeader
  }
}
</script>

<style lang="sass">
#app 
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale  
  background: #222B31
  min-height: 100vh
    
</style>
