<template>
    <v-col class="sidebar col-2 pt-12 px-0 d-flex flex-column">
        <router-link :to="'/movies'" class="item py-3 px-8 text-decoration-none">Movies</router-link>
        <router-link :to="'/sessions'" class="item py-3 px-8 text-decoration-none">Sessions</router-link>
    </v-col>
</template>

<style lang="sass" scoped>
.sidebar
    background: $dark-gray

.item 
    color: #FFF

    &:hover
        background: $light-gray
        color: $light-red
        font-weight: 700
        cursor: pointer
</style>