<template>
    <div class="wrapper ml-auto mr-auto">
        <table>
            <tr v-for="date in session" :key="date.showdate">
                <td class="pr-2">{{ date.showdate | luxon }}</td>
                <td>
                    <v-btn 
                        class="ma-1 pa-0"
                        v-for="time in date.daytime.split(';')" 
                        :key="time" 
                        :to="{ 
                            path:'/booking', 
                            query: { 
                                movie_id: movie.id, 
                                daytime: time, 
                                showdate: date.showdate 
                            } 
                        }"
                    >
                        {{ time }}
                    </v-btn>
                </td>
            </tr>
        </table>
    </div>
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
::-webkit-scrollbar 
    @extend %scrollbar
    
::-webkit-scrollbar-thumb 
    @extend %scrollbar-thumb

.wrapper
    overflow: auto

    @media screen and (max-width: $md-breakpoint) 
        width: 87vw

table
    width: fit-content

td   
    white-space: nowrap

.v-btn
    font-size: 0.8rem
    transition: 0.1s ease-in-out

    @media (hover: hover) and (pointer: fine)
        &:hover
            background: $light-red
            color: $white
</style>
