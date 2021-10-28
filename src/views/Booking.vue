<template>
    <v-col class="sessions col-10 pt-12 px-10 d-flex flex-column">
        <span class="text-h3 mb-12">Sessions</span>
        
        <v-row>
            <v-col class="col-12 d-flex flex-column align-center">
                <h3 class="mb-3">SCREEN</h3>
                <table>
                    <tr v-for="row in places" :key="row[0].row">
                        <td>{{ row[0].row }}</td>
                        <td v-for="seat in row[1]" :key="seat.seat" >
                            <div 
                                class="seat d-flex justify-center align-center"
                                :class="{ 'booked' : !seat.is_free , 'active' : chosenTickets.findIndex(i => i.row === row[0].row && i.seat === seat.seat) >= 0}"
                                @click="clickSeat(row[0].row, seat.seat)"
                            >
                                <span>{{ seat.seat }}</span>
                            </div>
                        </td>
                    </tr>
                </table>
            </v-col>
        </v-row>
    </v-col>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    data: () => ({
        chosenTickets: []
    }),
    computed: mapGetters(['places']),
    async mounted() {
        await this.fetchPlaces({
            movie_id: this.$route.query.movie_id,
            daytime: this.$route.query.daytime,
            showdate: this.$route.query.showdate
        });
    }, 
    methods: {
        ...mapActions(['fetchPlaces']),
        clickSeat(row, seat) {
            let ticketIndex = this.chosenTickets.findIndex(i => i.row === row && i.seat === seat);
            if(ticketIndex >= 0) {
                this.chosenTickets.splice(ticketIndex, 1);
                return;
            }
            this.chosenTickets.push({ row: row, seat: seat });
        }
    }
}
</script>

<style lang="sass" scoped>
.sessions
    *
        font-family: 'Poppins', sans-serif !important

table
    border-spacing: 5px
    overflow-x: auto

td
    &:first-child
        padding-right: 10px
        text-align: center

.seat
    width: 20px
    height: 25px
    background: #fff
    font-size: 0.8rem
    border-radius: 7px 7px 2px 2px
    transition: 0.1s ease-in-out

    &:hover
        cursor: pointer
        background: $light-red
        color: #FFF
        
        span
            visibility: visible

    span
        visibility: hidden


.active
    background: $dark-red
    color: #FFF

    span
        visibility: visible

.booked
    pointer-events: none
    background: $light-gray
    
    span
        visibility: hidden
</style>