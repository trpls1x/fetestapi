import Vue from 'vue'
import Vuex from 'vuex'
import movies from '@/store/modules/movies'
import booking from '@/store/modules/booking'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        movies,
        booking
    }
})