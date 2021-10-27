<template>
    <v-row class="header mb-3">
        <v-col class="logo col-2 d-flex justify-center align-center">
            <v-icon 
                class="mr-1" 
                color="white"
                small 
            >
                mdi-movie-open
            </v-icon>
            <span>FETEST API</span>
        </v-col>
        <v-col class="col-8 d-flex align-center">
            <v-text-field 
                v-model="searchText"
                class="pa-0"
                placeholder="Search movies"
                hide-details="auto"
                prepend-icon="mdi-magnify"
                color="white"
                @keydown="typing()"
                @keyup="finishedTyping()"
                dark
            ></v-text-field>
        </v-col>
        <v-col class="col-2 d-flex justify-center align-center pa-0">
            
            <v-menu offset-y rounded="0"  :close-on-content-click="false">
                <template v-slot:activator="{ attrs, on }">
                    <v-btn
                        text 
                        tile 
                        block 
                        dark
                        v-bind="attrs"
                        v-on="on"
                        height="100%"
                    >
                        <v-icon 
                            class="mr-1" 
                            color="white"
                        >
                            mdi-filter-variant
                        </v-icon>
                        <span>Genres</span>
                    </v-btn>
                </template>
                <v-list color="#181C1F">
                    <v-list-item
                    v-for="(genre, index) in genres"
                    :key="index"
                    >
                        <v-checkbox
                            @click="test"
                            v-model="searchGenres"
                            :label="genre"
                            :value="index"
                            dark
                            color="#F84250"
                        ></v-checkbox>
                    </v-list-item>
                </v-list>
                </v-menu>
        </v-col>
    </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    data: () => ({
        searchText: null,
        searchTimeout: null,
        searchGenres: []
    }),
    computed: mapGetters(['genres']),
    methods: {
        ...mapActions(['fetchMovies']),
        test() {
            console.log(this.searchGenres);
        },
        typing() {
            clearTimeout(this.searchTimeout);
        },
        finishedTyping() {
            clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(() => this.search(), 500);
        },
        async search() {
            await this.fetchMovies({name: this.searchText})
        }
    }
}
</script>

<style lang="sass">
.header
    font-weight: 100
    height: 65px
    background: #FE4250
    color: #FFF

.logo
    background: #F73744
    font-size: 1.2rem
    font-weight: 800

.v-btn
    font-family: 'Poppins', sans-serif !important

.v-menu__content
    left: auto !important
    right: 0 !important
</style>