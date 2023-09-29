import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuestic, createIconsConfig } from 'vuestic-ui';
import "vuestic-ui/css";
import "material-design-icons-iconfont/dist/material-design-icons.min.css";

import { getWebInstrumentations, initializeFaro } from '@grafana/faro-web-sdk';
import { TracingInstrumentation } from '@grafana/faro-web-tracing';

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

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Check here for Vuestic style configuration. e.g. colour classes.
// https://ui.vuestic.dev/getting-started/configuration-guide
app.use(createVuestic({
  config: {
    colors: {
      presets: {
        light: {
          primary:"#952e41",
          secondary:"#d44730",
          success:"#3D9209",
          info:"#158DE3",
          danger:"#E42222",
          warning:"#FFD43A",
          gray: "#babfc2",
          backgroundPrimary:"#FFFAFA",
          backgroundSecondary:"#f4e8e8",
          backgroundElement:"#ECF0F1",
          backgroundBorder:"#DEE5F2",
          textPrimary:"#262824",
          textInverted:"#FFFAFA",
          shadow:"rgba(0, 0, 0, 0.12)",
          focus:"#49A8FF",
          transparent:"rgba(0, 0, 0, 0)",
          backgroundLanding:"#f4f9fc",
          backgroundLandingBorder:"rgba(155, 179, 206, 0.8)"
        }
      }
    }
  }
}))

app.mount('#app')
