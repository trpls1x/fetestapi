<template>
  <div id="app">
    <v-app fill-height>
      <v-container fluid v-scroll="onScroll">
        <header-item/>
        <v-row>
          <sidebar-item/>
          <router-view/>
        </v-row>
        <v-btn
          v-if="scrollPosition >= 500"
          @click="$vuetify.goTo(0)"
          fixed
          bottom
          right
          fab
          large
          dark
          color="#FE4250"
        >
          <v-icon dark>
            mdi-chevron-up
          </v-icon>
        </v-btn>
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
  },
  data: () => ({
    scrollPosition: null
  }),
  methods: {
    onScroll() {
      this.scrollPosition = window.pageYOffset
    }
  }
}
</script>

<style lang="sass" scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700;800&display=swap')
#app 
  font-family: 'Poppins', sans-serif
  background: $light-gray
  color: #fff
  *
    font-family: 'Poppins', sans-serif !important


.container 
  min-height: 100vh
  display: grid
  grid-template-rows: minmax(60px, auto) minmax(0, 100%)
</style>
