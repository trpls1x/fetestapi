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
          fixed
          bottom
          right
          fab
          dark
          color="#FE4250"
          @click="$vuetify.goTo(0)"
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
#app 
  background: $light-gray
  color: $white

.container 
  min-height: 100vh
  display: grid
  grid-template-rows: minmax(60px, auto) minmax(0, 100%)
</style>
