const routes = [
    {
        path: '/',
        redirect: '/movies'
    },
    {
        name: 'movies',
        path: '/movies',
        component: () => import('@/views/Movies')
    },
    {
        name: 'movie-page',
        path: '/movies/:id',
        component: () => import('@/views/MoviePage')
    },
    {
        name: 'sessions',
        path: '/sessions',
        component: () => import('@/views/Sessions')
    },
    {
        name: 'booking',
        path: '/booking',
        component: () => import('@/views/Booking')
    }
]
export default routes