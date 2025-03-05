import { createRouter, createWebHistory } from 'vue-router';
import Index from '@/views/index.vue';
import comments from '@/views/comments.vue'

const routes = [
    { path: '/', component: Index }, 
    { path: '/comments', component: comments}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;