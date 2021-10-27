const routes = [
    {
        path: '/',
        redirect: '/movies'
    },
    {
        name: 'movies',
        path: '/movies',
        component: () => import('@/views/Movies')
    }
]
export default routes