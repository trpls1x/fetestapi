<template>
    <v-col class="sidebar d-none col-md-2 pt-12 px-0 d-md-flex flex-column">
        <router-link 
            v-for="(link, key) in links" 
            :key="key" 
            :to="'/'+ key"
            class="item d-flex justify-space-between align-center text-decoration-none py-3 px-8 mb-1"
            :class="{ 'active' : $route.name === key }"
        >
            <span>{{ link }}</span>
            <v-icon v-if="$route.name === key" dark>
                mdi-chevron-right
            </v-icon>
        </router-link>
    </v-col>
</template>

<script>
export default {
    data: () => ({
        links: {
            'movies' : 'Movies',
            'sessions' : 'Sessions'
        }
    }),
}
</script>

<style lang="sass" scoped>

.sidebar
    background: $dark-gray

.item 
    &:not(.active)
        color: #FFF
        
    &:hover
        background: $light-gray
        cursor: pointer

.active
    background: $light-gray
    color: $light-red
    font-weight: 700

</style>