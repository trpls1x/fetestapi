<template>
    <v-col class="movies col-10 pt-12 px-10 d-flex flex-column">
        <span class="text-h3">Movies</span>
        <div v-if="contentLoaded" class="fill-height">
            <v-row class="mt-12" v-if="movies.length">
                <movie-card v-for="movie in movies" :key="movie.id" :movie="movie"></movie-card>
            </v-row>
            <div class="d-flex justify-center align-center fill-height" v-else>
                <span class="text-h4">No such movies :(</span>
            </div>
        </div>
        <div v-else class="d-flex justify-center align-center fill-height">
            <v-progress-circular
                indeterminate
            ></v-progress-circular>
        </div>
    </v-col>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MovieCard from '@/components/MovieCard'

export default {
    components: {
        MovieCard
    },
    data: () => ({
        contentLoaded: false
    }),
    computed: mapGetters(['movies']),
    async mounted() {
        this.contentLoaded = false;
        await this.fetchMovies();
        this.contentLoaded = true;
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