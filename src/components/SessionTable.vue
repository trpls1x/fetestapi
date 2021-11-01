<template>
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
</template>

<script>
export default {
    props: {
        movie: {
            type: Object
        },
        session: {
            type: Array
        }
    }
}
</script>

<style lang="sass" scoped>
table
    width: fit-content
tr
    td   
        white-space: nowrap
        &:first-child 
            vertical-align: top 
            padding-right: 10px
            padding-top: 10px
            width: 1%
        
        .v-btn
            font-size: 0.8rem
            transition: 0.1s ease-in-out

            &:hover
                background: $light-red
                color: #FFF
</style>