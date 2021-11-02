<template>
    <v-col class="sessions col-12 col-md-10 mt-4 mt-md-10 px-md-10 d-flex flex-column">
        <div v-if="contentLoaded">
            <v-row class="mb-12 px-3 px-md-0">
                <v-col class="col-5 col-sm-3 col-md-2">
                    <router-link :to="'/movies/' + movie.id">
                        <v-img :src="movie.image"></v-img>
                    </router-link>
                </v-col>
                <v-col class="col-7 col-sm-9 col-md-10 d-flex flex-column">
                    <router-link :to="'/movies/' + movie.id" class="text-decoration-none">
                        <span class="text-subtitle-1 text-sm-h4">{{ movie.name }}</span>
                    </router-link>
                    <span class="genre text-sm-h6 mb-5">{{ genres[movie.genre] }}</span>
                    <span class="text-sm-h5">{{ session.showdate | luxon }}</span>
                    <span class="text-sm-h5">{{ session.daytime }}</span>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="col-12 d-flex flex-column align-center">
                    <div class="wrapper mb-5">
                        <table class="ml-auto mr-auto">
                            <caption class="mb-3">
                                <span class="screen text-h5 text-center">SCREEN</span>
                                <svg viewBox="0 0 806 21" fill="#fff">
                                    <path d="M3.2,20l-2,0.2l-0.3-4l2-0.2C136.2,5.3,269.6,0,403,0s266.8,5.3,400.2,16l2,0.2l-0.3,4l-2-0.2 C669.5,9.3,536.3,4,403,4S136.4,9.3,3.2,20z"></path>
                                </svg>
                            </caption>
                            <tr v-for="row in places" :key="row[0].row">
                                <td>{{ row[0].row }}</td>
                                <td v-for="seat in row[1]" :key="seat.seat" >
                                    <div 
                                        class="seat d-flex justify-center align-center"
                                        :class="{ 'booked' : !seat.is_free, 
                                                'active' : chosenTickets.findIndex(ticket => ticket.id === `r${row[0].row}s${seat.seat}`) >= 0}"
                                        @click="clickSeat(row[0].row, seat.seat)"
                                    >
                                        <span>{{ seat.seat }}</span>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <v-dialog
                        v-model="dialog"
                        width="500"
                        scrollable
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-badge
                                :content="chosenTickets.length"
                                :value="chosenTickets.length"
                                color="#F73744"
                                small
                                overlap
                                bordered
                            >
                                <v-btn color="#FE4250" 
                                    v-bind="attrs"
                                    v-on="on"
                                    dark
                                >
                                    Book tickets
                                </v-btn>
                            </v-badge>
                        </template>

                        <v-card dark>
                            <v-card-title class="text-h5">
                                Book tickets
                            </v-card-title>

                            <v-card-text class="pb-2" style="max-height: 300px;">
                                <div v-if="!chosenTickets.length" class="d-flex justify-center mb-1">
                                    <span>Please choose at least one ticket</span>
                                </div>
                                <div v-for="ticket in chosenTickets" :key="ticket.id" class="ticket d-flex align-center pa-1 pa-sm-3 mb-1">
                                    <div class="ticket-info d-flex justify-space-around">
                                        <span>Row: {{ ticket.row }}</span>
                                        <span>Seat: {{ ticket.seat }}</span>
                                    </div>
                                    <v-btn 
                                        icon
                                        @click="clickSeat(ticket.row, ticket.seat)"
                                    >
                                        <v-icon>mdi-close-circle</v-icon>
                                    </v-btn>
                                </div>
                            </v-card-text>
                            
                            <v-card-actions class="justify-end">
                                <v-btn
                                    text
                                    @click="dialog = false"
                                >
                                    Back
                                </v-btn>
                                <v-btn color="#FE4250" 
                                    @click="bookTickets()"
                                    :disabled="!chosenTickets.length || bookingRequest"
                                    dark
                                >
                                    Book tickets
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-col>
            </v-row>
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

export default {
    data: () => ({
        movie: {},
        session: {},
        chosenTickets: [],
        dialog: false,
        bookingRequest: false,
        contentLoaded: false
    }),
    computed: mapGetters(['places', 'movies', 'genres']),
    async mounted() {
        this.contentLoaded = false;
        this.session = {
            movie_id: this.$route.query.movie_id,
            daytime: this.$route.query.daytime,
            showdate: this.$route.query.showdate
        }
        await this.fetchPlaces(this.session);
        await this.fetchMovies({ movie_id: this.session.movie_id});
        this.movie = this.movies[0];
        this.contentLoaded = true;
    }, 
    methods: {
        ...mapActions(['fetchPlaces', 'fetchMovies', 'bookTicket']),
        clickSeat(row, seat) {
            let ticketIndex = this.chosenTickets.findIndex(ticket => ticket.id === `r${row}s${seat}`);
            if(ticketIndex >= 0) {
                this.chosenTickets.splice(ticketIndex, 1);
                return;
            }
            this.chosenTickets.push({ 
                row: row, 
                seat: seat ,
                id: `r${row}s${seat}`
            });
        },
        async bookTickets() {
            this.bookingRequest = true;
            for (let ticket of this.chosenTickets) {
                await this.bookTicket({
                    movie_id: this.session.movie_id,
                    row: ticket.row,
                    seat: ticket.seat,
                    showdate: this.session.showdate,
                    daytime: this.session.daytime
                });
            }
            await this.fetchPlaces(this.session);
            this.chosenTickets.length = 0;
            this.dialog = false;
            this.bookingRequest = false;
        }
    }
}
</script>

<style lang="sass" scoped>
.sessions
    *
        font-family: 'Poppins', sans-serif !important

a
    color: #FFF

.genre
    color: $text-gray

.wrapper
    width: 80vw
    overflow-x: auto

    @media screen and (max-width: $md-breakpoint) 
        width: 93vw
    
table
    border-spacing: 5px
    position: relative
    user-select: none

caption
    position: relative
    padding-left: 35px
    padding-right: 7px

.screen
    left: 45%
    position: absolute
    padding: 0 10px
    top: -5px
    background: $light-gray

td
    &:first-child
        padding-right: 10px
        text-align: center

.seat
    width: 20px
    height: 25px
    background: #FFF
    font-size: 0.8rem
    border-radius: 7px 7px 2px 2px
    transition: 0.1s ease-in-out

    @media (hover: hover) and (pointer: fine)
        &:hover
            cursor: pointer
            background: $light-red
        
.active
    background: $dark-red

.booked
    visibility: hidden

.v-card
    background: $light-gray !important
    border: 1px solid #FFF

.ticket
    background: $dark-gray

.ticket-info
    width: 100%
</style>