<template>
    <v-col class="sessions col-12 col-md-10 mt-4 mt-md-10 px-5 px-md-10 d-flex flex-column">
        <span class="text-h3 mb-10">Sessions</span>
        <div v-if="contentLoaded">
            <session v-for="movie in movies" :key="movie.id" :movie="movie" :session="movieShows[movie.id]"/>
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
import Session from '@/components/Session'

export default {
    data: () => ({
        contentLoaded: false
    }),
    components: {
        Session
    },
    computed: mapGetters(['movieShows', 'movies']),
    async mounted() {
        this.contentLoaded = false;
        await this.fetchMovies();
        await this.fetchMovieShows();
        this.contentLoaded = true;
    }, 
    methods: {
        ...mapActions(['fetchMovieShows', 'fetchMovies'])
    }
}
</script>

<style lang="sass" scoped>
.sessions
    *
        font-family: 'Poppins', sans-serif !important

</style>