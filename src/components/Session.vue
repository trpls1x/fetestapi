<template>
    <v-row class="mb-12">
        <v-col class="col-4 col-sm-2 col-md-3 pb-0">
            <router-link :to="'/movies/' + movie.id">
               <v-img :aspect-ratio="4/6" :src="movie.image"></v-img>
            </router-link>
        </v-col>
        <v-col class="col-8 col-sm-10 col-md-9 d-flex flex-column pb-0">
            <router-link :to="'/movies/' + movie.id" class="text-decoration-none">
                <span class="text-h6 text-sm-h5">{{ movie.name }}</span>
            </router-link>
            <span class="genre text-subtitle-2 mb-4">{{ genres[movie.genre] }}</span>

            <div class="wrapper d-none d-md-block">
                <session-table :movie="movie" :session="session"></session-table>
            </div>
        </v-col>
        <v-col class="col-12 d-md-none pt-0">
            <session-table class="mb-4" :movie="movie" :session="session"></session-table>
            <v-divider dark/>
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
</style>