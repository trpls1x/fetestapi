<template>
    <v-col class="col-10 pt-12 px-10 d-flex flex-column">
        <span class="text-h3 mb-12">Tickets</span>

        <div v-for="ticket in tickets" :key="ticket.ticketkey">
            {{ ticket }}
        </div>
    </v-col>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    computed: mapGetters(['tickets'])
}
</script>