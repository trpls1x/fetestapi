<template>
    <v-col class="col-12 col-md-10 mt-4 mt-md-10 px-5 px-md-10 d-flex flex-column">
        <span class="text-h3">Tickets</span>
        <v-row v-if="tickets.length" class="mt-4 mt-md-10">
            <ticket 
                v-for="ticket in tickets" 
                :key="ticket.ticketkey" 
                :ticket="ticket"
            ></ticket>
        </v-row>
        <div v-else class="d-flex justify-center align-center fill-height">
            <span class="text-h6 text-sm-h4 text-center">You haven't booked any tickets yet</span>
        </div>
    </v-col>
</template>

<script>
import { mapGetters } from 'vuex'
import Ticket from '@/components/Ticket'

export default {
    components: {
        Ticket
    },
    computed: mapGetters(['tickets'])
}
</script>
