<template>
  <div id="app">
    <v-app fill-height>
      <v-container fluid>
        <header-item/>
        <v-row>
          <sidebar-item/>
          <router-view/>
        </v-row>
      </v-container>
    </v-app>
  </div>
</template>

<script>
import HeaderItem from '@/components/Header'
import SidebarItem from '@/components/Sidebar'

export default {
  components: {
    HeaderItem,
    SidebarItem
  }
}
</script>

<style lang="sass" scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;800&display=swap')
#app 
  font-family: 'Poppins', sans-serif
  background: #222b32
  color: #fff

.container 
  min-height: 100vh
  display: grid
  grid-template-rows: minmax(60px, auto) minmax(0, 100%)
</style>
