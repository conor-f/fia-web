import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuestic, createIconsConfig } from 'vuestic-ui';
import "vuestic-ui/css";
import "material-design-icons-iconfont/dist/material-design-icons.min.css";

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Check here for Vuestic style configuration. e.g. colour classes.
// https://ui.vuestic.dev/getting-started/configuration-guide
app.use(createVuestic())

app.mount('#app')
