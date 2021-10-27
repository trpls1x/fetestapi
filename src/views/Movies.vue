<template>
    <v-col class="movies col-10 pt-12 px-10 d-flex flex-column">
        <span class="text-h3">Movies</span>
        <v-row class="mt-12" v-if="movies.length">
            <movie-card v-for="movie in movies" :key="movie.id" :movie="movie"></movie-card>
        </v-row>
        <v-row class="d-flex justify-center align-center" v-else>
            <span class="text-h4">No such movies :(</span>
        </v-row>
    </v-col>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MovieCard from '@/components/MovieCard'

export default {
    components: {
        MovieCard
    },
    computed: mapGetters(['movies']),
    async mounted() {
        await this.fetchMovies();
    },
    methods: {
        ...mapActions(['fetchMovies'])
    }
    
}
</script>

<style lang="sass" scoped>
.movies
    *
        font-family: 'Poppins', sans-serif !important

</style>