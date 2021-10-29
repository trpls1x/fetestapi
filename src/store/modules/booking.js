import api from '@/services/apiInstance'

export default {
    actions: {
        async fetchPlaces({ commit }, payload) {
            const response = await api.get('/showPlaces', {
                params: payload
            });
            commit('updatePlaces', response)
        },
        async bookTicket({ commit }, payload) {
            const response = await api.post('/bookPlace', payload);
            commit('updateTickets', response)
        }
    },
    mutations: {
        updatePlaces(state, data) {
            state.places = data
        },
        updateTickets(state, data) {

            state.tickets.push(data);
            localStorage.setItem('tickets', JSON.stringify(state.tickets));
            console.log(state.tickets);
        } 
    },
    state: {
        places: [],
        tickets: JSON.parse(localStorage.getItem('tickets')) || []
    },
    getters: {
        places: (state) => state.places,
        tickets: (state) => state.tickets
    }
}