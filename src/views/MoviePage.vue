<template>
    <v-col class="col-12 col-md-10 mt-4 mt-md-10 px-5 px-md-10">
        <v-row v-if="contentLoaded && movie">
            <v-col class="col-12 col-sm-5 col-lg-4">
                <v-img :aspect-ratio="4/6" :src="movie.image"></v-img>
            </v-col>
            <v-col class="col-12 col-sm-7 col-lg-8 d-flex flex-column">
                <span class="text-h5 text-sm-h4 text-lg-h3 mb-5">{{ movie.name }}</span>
                <div v-html="movie.additional"></div>
            </v-col>
            <v-col class="col-12 pt-0">
                <div class="description" v-html="movie.description"></div>
            </v-col>
            <v-col class="col-12">
                <span class="text-h5 text-sm-h4 text-lg-h3 ">Available sessions</span>
                <session-table :movie="movie" :session="movieShows[movie.id]" class="mt-3 mb-12"></session-table>
            </v-col>
        </v-row>
        <div v-else class="d-flex justify-center align-center fill-height">
            <v-progress-circular
                indeterminate
            ></v-progress-circular>
        </div>
    </v-col>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SessionTable from '@/components/SessionTable'

export default {
    components: {
        SessionTable
    },
    data: () => ({
        movie: {},
        contentLoaded: false
    }),
    computed: mapGetters(['movies', 'movieShows']),
    async mounted() {
        await this.fetchMovies({ movie_id: this.$route.params.id });
        await this.fetchMovieShows({ movie_id: this.$route.params.id });
        !this.movies.length && this.$router.push({ path: '/page-not-found' });
        this.movie = this.movies[0];
        this.contentLoaded = true;
    },
    methods: {
        ...mapActions(['fetchMovies', 'fetchMovieShows'])
    }
}
</script>

<style lang="sass">
ul
    padding-left: 0 !important
    list-style-type: none
li
    display: flex
    text-align: justify

    a
        pointer-events: none
        text-decoration: none
        color: $white !important

    .key 
        font-weight: 600
        margin-right: 10px
        white-space: nowrap

    @media screen and (max-width: $sm-breakpoint) 
        display: block
        .key
            margin-bottom: 0

.rating
    @media screen and (max-width: $sm-breakpoint) 
        margin-bottom: 16px

.age_hint
    display: none

.description
    text-align: justify !important
    *
        text-align: justify !important
</style>
