<template>
    <v-row class="header mb-3">
        <v-col class="logo col-2 col-md-2 d-flex justify-center align-center pa-0">
            <router-link 
                :to="'/'" 
                class="d-none d-md-flex justify-center align-center text-decoration-none"
            >
                <v-icon 
                    class="mr-1" 
                    color="white"
                    small 
                >
                    mdi-movie-open
                </v-icon>
                <span class="d-none d-md-block">FETEST API</span>
            </router-link>

            <v-btn dark icon @click="drawer = !drawer" class="d-block d-md-none">
                <v-icon>mdi-menu</v-icon>
            </v-btn>
            <v-navigation-drawer
                v-model="drawer"
                absolute
                clipped
            >
                <v-list dark>
                    <v-list-item-group>
                        <v-list-item link :to="'/movies'">Movies</v-list-item>
                        <v-list-item link :to="'/sessions'">Sessions</v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-navigation-drawer>
        </v-col>
        
        <template v-if="$route.name === 'movies'">
            <v-col class="col-8 col-md-8">
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
            <v-col class="col-2 col-md-2 pa-0">      
                <v-menu offset-y rounded="0"  :close-on-content-click="false">
                    <template v-slot:activator="{ attrs, on }">
                        <v-btn
                            class="pa-0"
                            text 
                            tile 
                            block 
                            dark
                            v-bind="attrs"
                            v-on="on"
                            height="100%"
                        >
                            <span class="d-none d-md-block">Genres</span>
                            <v-badge
                                :content="searchGenres.length"
                                :value="searchGenres.length"
                                color="#181C1F"
                                small
                                overlap
                            >
                                <v-icon 
                                    class="" 
                                    color="white"
                                >
                                    mdi-filter-variant
                                </v-icon>
                            </v-badge>
                        </v-btn>
                    </template>
                    <v-list color="#181C1F">
                        <v-list-item
                            v-for="(genre, index) in genres"
                            :key="index"
                        >
                            <v-checkbox
                                v-model="searchGenres"
                                :label="genre"
                                :value="index"
                                hide-details="auto"
                                dark
                                color="#F84250"
                            ></v-checkbox>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-col>
        </template>
        <v-col v-else class="logo d-flex d-md-none align-center justify-end">
            <router-link 
                :to="'/'" 
                class="d-flex justify-end align-center text-decoration-none"
            >
                <v-icon 
                    class="mr-1" 
                    color="white"
                    small 
                >
                    mdi-movie-open
                </v-icon>
                <span>FETEST API</span>
            </router-link>
        </v-col>
    </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    data: () => ({
        searchText: null,
        searchTimeout: null,
        searchGenres: [],
        drawer: false
    }),
    computed: mapGetters(['genres']),
    watch: {
        searchGenres() {
            this.search();
        },
        $route() {
            this.searchText = null;
            this.searchGenres.length = 0
        }
    },
    methods: {
        ...mapActions(['fetchMovies']),
        typing() {
            clearTimeout(this.searchTimeout);
        },
        finishedTyping() {
            clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(() => this.search(), 500);
        },
        async search() {
            await this.fetchMovies({
                name: this.searchText,
                genres: this.searchGenres
            });
        }
    }
}
</script>

<style lang="sass">

.header
    font-weight: 100
    height: 65px
    background: $light-red
    color: #FFF

.logo
    background: $dark-red
    font-size: 1.2rem
    font-weight: 800
    a
        height: 100%
        width: 100%
        color: #FFF !important

.v-navigation-drawer 
    width: 100% !important
    background: $dark-gray !important
    
.v-navigation-drawer--is-mobile 
    height: auto !important
    transform: translateY(0%) !important

.v-navigation-drawer--close 
    transform: translateY(-100%) !important

.v-list-item-group 
    * 
        display: flex
        justify-content: center

.v-btn
    *
        font-family: 'Poppins', sans-serif !important

.v-menu__content
    left: auto !important
    right: 0 !important

.v-list-item
    &:hover
        background: $light-gray

    .v-input
        width: 100%
        padding: 0
        margin: 0
</style>