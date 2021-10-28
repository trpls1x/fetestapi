import api from '@/services/apiInstance'
import qs from 'qs'

export default {
    actions: {
        async fetchMovies({ commit }, payload) {
            const response = await api.get('/movies', {
                params: payload,
                paramsSerializer: params => qs.stringify(params)
            });
            commit('updateMovies', response);
        },
        async fetchMovieShows({ commit }, payload) {
            const response = await api.get('/movieShows', {
                params: payload
            });
            commit('updateMovieShows', response);
        }
    },
    mutations: {
        updateMovies(state, data) {
            state.movies = data;
        },
        updateMovieShows(state, data) {
            state.movieShows = data;
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
        },
        movieShows: []
    },
    getters: {
        movies: (state) => state.movies,
        genres: (state) => state.genres,
        movieShows: (state) => state.movieShows
    }
}