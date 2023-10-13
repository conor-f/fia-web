import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "material-design-icons-iconfont/dist/material-design-icons.min.css";

import { getWebInstrumentations, initializeFaro } from '@grafana/faro-web-sdk';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

var faro = initializeFaro({
  url: 'https://faro-collector-prod-eu-west-2.grafana.net/collect/c48c99765af94fbe0e6d6fc42c7e0b5f',
  app: {
    name: 'Fia',
    version: '1.0.0',
    environment: 'production'
  },
  instrumentations: [
    // Mandatory, overwriting the instrumentations array would cause the default instrumentations to be omitted
    ...getWebInstrumentations(),

    // Initialization of the tracing package.
    // This packages is optional because it increases the bundle size noticeably. Only add it if you want tracing data.
    new TracingInstrumentation(),
  ],
});


import App from './App.vue'
import router from './router'

import './assets/style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Toast, {});

app.mount('#app')
