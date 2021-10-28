<template>
    <v-col class="col-10 pt-12 px-10">
        <v-row v-if="movie">
            <v-col class="col-5 col-lg-4">
                <v-img :src="movie.image">
                </v-img>
            </v-col>
            <v-col class="col-7 col-lg-8 d-flex flex-column">
                <span class="text-h2 mb-5">{{ movie.name }}</span>
                <div v-html="movie.additional"></div>
            </v-col>
            <v-col class="col-12">
                <div class="description" v-html="movie.description"></div>
            </v-col>
        </v-row>
    </v-col>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    data: () => ({
        movie: {}
    }),
    computed: mapGetters(['movies']),
    async created() {
        await this.fetchMovies({ movie_id: this.$route.params.id });
        this.movie = this.movies[0];
    },
    methods: {
        ...mapActions(['fetchMovies'])
    }
}
</script>

<style lang="sass">
ul
    padding-left: 0 !important
    list-style-type: none
li
    display: flex

    a
        pointer-events: none
        text-decoration: none
        color: #FFF !important

    .key 
        font-weight: 600
        margin-right: 10px
        white-space: nowrap

.age_hint
    display: none

.description
    text-align: justify !important
    *
        text-align: justify !important
</style>