import { createRouter, createWebHistory } from 'vue-router';
import Index from '@/views/index.vue';
import comment from '@/views/comment.vue'

const routes = [
    { path: '/', component: Index }, 
    { path: '/comments', component: comment}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;