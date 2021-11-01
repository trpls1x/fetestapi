<template>
    <v-col class="col-6 col-sm-4 col-lg-3">
        <router-link 
            :to="'/movies/' + movie.id" 
            class="text-decoration-none"
        >
            <v-hover v-slot="{ hover }">
                <div class="card d-flex flex-column">
                    <v-img 
                        class="mb-3 elevation-10" 
                        :aspect-ratio="4/6"
                        :src="movie.image"
                    >
                        <div
                            class="hover-wrap fill-height d-flex justify-center align-center"
                            :class="{ 'hover-active' : hover }"
                        >
                            <v-icon color="white" x-large>mdi-movie-open</v-icon>
                        </div>
                    </v-img>
                    <span class="text-subtitle-1 text-md-h6">{{ movie.name }}</span>
                    <span class="genre text-subtitle-2 text-subtitle-md-1">{{ genres[movie.genre] }}</span>
                </div>
            </v-hover>
        </router-link>
    </v-col>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    props: {
        movie: {
            type: Object
        }
    },
    computed: mapGetters(['genres'])
}
</script>

<style lang="sass" scoped>
.card
    color: #FFF
    &:hover
        cursor: pointer
        color: $light-red
        
.genre
    color: $text-gray

.hover-wrap
    transition: 0.15s ease-out
    background: $light-red
    opacity: 0

.hover-active 
    opacity: 0.7
</style>