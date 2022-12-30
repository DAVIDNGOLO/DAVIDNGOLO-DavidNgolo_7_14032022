import { createApp } from 'vue'
import App from './App.vue'
//on importe notre router
import router from './router';
//on importe le store
import store from './store';
//on branche notre router
createApp(App).use(router).use(store).mount('#app')
