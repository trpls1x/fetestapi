<template>
    <v-row class="mb-3">
        <v-col class="col-2">
            <router-link :to="'/movies/' + movie.id">
                <v-img :src="movie.image"></v-img>
            </router-link>
        </v-col>
        <v-col class="col-10 d-flex flex-column">
            <router-link :to="'/movies/' + movie.id" class="text-decoration-none">
                <span class="text-h5">{{ movie.name }}</span>
            </router-link>
            <span class="genre text-subtitle-2 mb-4">{{ genres[movie.genre] }}</span>
            <table>
                <tr v-for="date in session" :key="date.showdate">
                    <td>{{ date.showdate | luxon }}</td>
                    <td>
                        <v-btn 
                            v-for="time in date.daytime.split(';')" 
                            :key="time" 
                            :to="{ path:'/booking', query: { movie_id: movie.id, daytime: time, showdate: date.showdate } }"
                            class="ma-1 pa-0"
                        >
                            {{ time }}
                        </v-btn>
                    </td>
                </tr>
            </table>
        </v-col>
    </v-row>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
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

tr
    td  
        &:first-child 
            vertical-align: top 
            padding-right: 10px
            padding-top: 10px
            width: 1%
            white-space: nowrap
        
        .v-btn
            font-size: 0.8rem
            transition: 0.1s ease-in-out

            &:hover
                background: $light-red
                color: #FFF

</style>