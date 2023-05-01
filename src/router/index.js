import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/Login';
import Profile from '@/views/Profile';
import Chat from '@/views/Chat';
import Dashboard from '@/views/Dashboard';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/chat',
    name: 'Chat',
    component: Chat
  }
]

const router = new VueRouter({ routes });

export default router
