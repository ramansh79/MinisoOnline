import {createRouter, createWebHistory} from 'vue-router'

import HomeView from '../views/HomeView.vue'
import Dashboard from '../views/auth/Dashboard.vue'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import { useAuthStore } from '../store/auth'
import PostIndex from '../views/posts/PostIndex.vue'
import PostCreate from '../views/posts/PostCreate.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: Dashboard,
            meta: { requiresAuth: true }
        },
        {
            path: '/dashboard/posts',
            name: 'PostIndex',
            component: PostIndex,
            meta: { requiresAuth: true },
        },
        {
            path: '/dashboard/posts/create',
            name: 'PostCreate',
            component: PostCreate,
            meta: { requiresAuth: true },
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: { requiresGuest: true }
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
            meta: { requiresGuest: true },
        },
        {
            path: "/404",
            name: '404',
            component: () => import("../views/404.vue"),
        },
        {
            path: "/500",
            name: '500',
            component: () => import("../views/500.vue"),
        }
    ]
});

router.beforeEach( (to, from, next) => {
    const auth = useAuthStore();
    if(to.matched.some( (record) => record.meta.requiresAuth) && !auth.isLoggedIn){
        next({ name: "login" });
    } 
    //to.matched.some()
    //When you click a link, Vue Router looks at your routes array. Sometimes a single URL matches multiple route records.( /dashboard,/dashboard/profile )
    //to.matched is an Array containing every route record that matches the current URL (from the parent down to the child).
    //.some() is a standard JavaScript Array Method, checks if at least one item in an array meets a certain condition.

    
    else if (to.matched.some( (record) => record.meta.requiresGuest ) && auth.isLoggedIn){
        next ({ name: "dashboard" });
    }
    else next();
});

export default router