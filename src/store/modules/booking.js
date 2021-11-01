import api from '@/services/apiInstance'

export default {
    actions: {
        async fetchPlaces({ commit }, payload) {
            const response = await api.get('/showPlaces', {
                params: payload
            });
            commit('updatePlaces', response)
        },
        async bookTicket(ctx, payload) {
            await api.post('/bookPlace', payload)
        }
    },
    mutations: {
        updatePlaces(state, data) {
            state.places = data
        }
    },
    state: {
        places: []
    },
    getters: {
        places: (state) => state.places
    }
}