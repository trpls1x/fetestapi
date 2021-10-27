import api from '@/services/apiInstance'

export default {
    actions: {
        async fetchMovies({ commit }, payload) {
            const response = await api.get('/movies', {
                params: payload
            });
            commit('updateMovies', response);
        }
    },
    mutations: {
        updateMovies(state, data) {
            state.movies = data;
        }
    },
    state: {
        movies: [],
        genres: {
            0: 'Action',
            1: 'Adventures',
            2: 'Comedy',
            3: 'Drama',
            4: 'Horror',
            5: 'Western'
        }
    },
    getters: {
        movies: (state) => state.movies,
        genres: (state) => state.genres
    }
}