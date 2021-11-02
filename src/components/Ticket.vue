<template>
    <v-col class="col-6 col-sm-4 col-lg-3">
        <div class="d-flex flex-column align-center">
            <canvas :id="ticket.ticketkey"></canvas>
            <span class="text-center text-subtitle-1 text-md-h6 mt-3">{{ movie.name }}</span>
            <div class="align-self-stretch d-flex justify-space-around">
                <span class="text-center text-subtitle-2 text-sm-subtitle-1">Row: {{ ticket.row }}</span>
                <span class="text-center text-subtitle-2 text-sm-subtitle-1">Seat: {{ ticket.seat }}</span>
            </div>
            <span class="text-center text-caption text-sm-subtitle-2">Show Date: {{ ticket.showdate | luxon}}</span>
            <span class="text-center text-caption text-sm-subtitle-2">Show Time: {{ ticket.daytime }}</span>
        </div>
    </v-col>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import QRCode from 'qrcode'

export default {
    props: {
        ticket: {
            type: Object
        }
    },
    data: () => ({
        movie: {}
    }),
    computed: mapGetters(['movies']),
    async mounted() {
        await this.fetchMovies({ movie_id: this.ticket.movie_id});
        this.movie = this.movies[0];
        let canvas = document.getElementById(this.ticket.ticketkey);
        QRCode.toCanvas(canvas, this.ticket.ticketkey, (error) => error && console.error(error));
    },
    methods: {
        ...mapActions(['fetchMovies'])
    }
}
</script>
