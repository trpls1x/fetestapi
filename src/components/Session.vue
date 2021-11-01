<template>
    <v-row class="mb-12">
        <v-col class="col-4 col-sm-2 col-md-3">
            <router-link :to="'/movies/' + movie.id">
               <v-img :src="movie.image"></v-img>
            </router-link>
        </v-col>
        <v-col class="col-8 col-sm-10 col-md-9 d-flex flex-column">
            <router-link :to="'/movies/' + movie.id" class="text-decoration-none">
                <span class="text-h5">{{ movie.name }}</span>
            </router-link>
            <span class="genre text-subtitle-2 mb-4">{{ genres[movie.genre] }}</span>

            <div class="wrapper d-none">
                <session-table :movie="movie" :session="session"></session-table>
            </div>
        </v-col>
        <v-col class="col-12 d-none pa-0">
            <div class="wrapper ml-auto mr-auto">
                <session-table :movie="movie" :session="session"></session-table>
            </div>
        </v-col>
    </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
import SessionTable from '@/components/SessionTable'

export default {
    components: {
        SessionTable
    },
    props: {
        movie: {
            type: Object
        },
        session: {
            type: Array
        }
    },
    computed: mapGetters(['genres'])
}
</script>

<style lang="sass" scoped>
a
    color: #FFF

.genre
    color: $text-gray

.wrapper
    overflow: auto
    width: 20vw

    @media screen and (max-width: 959px) 
        width: 88vw

</style>