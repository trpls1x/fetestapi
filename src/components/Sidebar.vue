<template>
    <v-col class="sidebar d-none col-md-2 pt-12 px-0 d-md-flex flex-column">
        <router-link 
            v-for="(link, key) in links" 
            :key="key" 
            :to="'/'+ key"
            class="item d-flex justify-space-between align-center text-decoration-none py-3 px-3 px-lg-8 mb-1"
            :class="{ 'active' : $route.name === key }"
        >
            <v-badge 
                v-if="key === 'tickets'" 
                :content="tickets.length"
                :value="tickets.length"
                inline 
                color="#FE4250"
            >
                <span class="mr-1">{{ link }}</span>
            </v-badge>
            <span v-else>{{ link }}</span>
            <v-icon v-if="$route.name === key" dark>
                mdi-chevron-right
            </v-icon>
        </router-link>
    </v-col>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data: () => ({
        links: {
            'movies' : 'Movies',
            'sessions' : 'Sessions',
            'tickets' : 'My tickets'
        }
    }),
    computed: mapGetters(['tickets'])
}
</script>

<style lang="sass" scoped>
.sidebar
    background: $dark-gray

.item 
    color: $white
        
    @media (hover: hover) and (pointer: fine)
        &:hover
            background: $light-gray

.active
    background: $light-gray
    color: $light-red
    font-weight: 700
</style>
