import App from './App.vue';
import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { createPinia } from 'pinia';
import { router } from "./router/routes";
import { errorInterceptor, requestInterceptor } from "./errorInterceptor";
import './scss/main.scss';

// @ts-ignore
import VueStripeMenu from 'vue-stripe-menu';

import 'vuefinder/dist/style.css'
// @ts-ignore
import VueFinder from 'vuefinder/dist/vuefinder'

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faList,
  faLock,
  faHome,
  faGauge,
  faCartShopping,
  faGear,
  faHomeLg,
  faArrowRight,
  faArrowLeft,
  faPeopleGroup,
  faDolly,
  faBookOpen,
  faMessage,
  faDatabase,
  faHandshake,
  faUsersBetweenLines,
  faGlobe,
  faMagnifyingGlass,
  faUser,
  faInfoCircle,
  faTimes,
  faPause,
  faPlay,
  faCaretDown,
  faSort,
  faSortUp,
  faSortDown,
  faCaretRight,
  faPencil,
  faCheck,
  faX,
  faEye,
  faEyeSlash,
  faCaretUp,
  faRightFromBracket,
  faCircleUser,
  faAngleLeft,
  faAngleRight,
  faFilter,
  faSquareCaretDown,
  faSquareCaretUp,
  faUpRightFromSquare,
  faLockOpen,
  faFilePdf,
  faQuestionCircle,
  faAngleDoubleDown,
  faAngleDoubleUp
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faList,
  faLock,
  faHome,
  faGauge,
  faCartShopping,
  faGear,
  faHomeLg,
  faArrowRight,
  faArrowLeft,
  faPeopleGroup,
  faDolly,
  faBookOpen,
  faMessage,
  faDatabase,
  faHandshake,
  faUsersBetweenLines,
  faGlobe,
  faMagnifyingGlass,
  faUser,
  faInfoCircle,
  faTimes,
  faPause,
  faPlay,
  faCaretDown,
  faSort,
  faSortUp,
  faSortDown,
  faCaretRight,
  faPencil,
  faCheck,
  faX,
  faEye,
  faEyeSlash,
  faCaretUp,
  faRightFromBracket,
  faCircleUser,
  faAngleLeft,
  faAngleRight,
  faFilter,
  faSquareCaretDown,
  faSquareCaretUp,
  faUpRightFromSquare,
  faLockOpen,
  faFilePdf,
  faQuestionCircle,
  faAngleDoubleDown,
  faAngleDoubleUp
);

// Set up Axios Interceptors
errorInterceptor();
requestInterceptor();

// Set up Vue app (with Axios and FontAwesome)
const app = createApp(App)
  .use(VueStripeMenu, VueAxios, axios)
  .use(VueFinder)
  .component('font-awesome-icon', FontAwesomeIcon);

// Add our custom vue router
app.use(router);

// Set up Pinia 
const pinia = createPinia();
app.use(pinia);

// Register Service Worker
if ('serviceWorker' in navigator) {
  const version = '1.1.2'; // Change this when making an update to the Service Worker (sw.js or this file)
  const sw = navigator.serviceWorker as ServiceWorkerContainer;

  sw.register(`/sw.js?version=${version}`, { type: 'module', scope: '/' })
    .then(async (registration: ServiceWorkerRegistration) => {
      console.log('Service Worker registered with scope:', registration.scope);

      // If there is a waiting service worker, inform it to skip waiting and activate
      if (registration.waiting) {
        console.log('[Service Worker] New version waiting...');
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      }

      // Listen for updatefound and handle state changes
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('[Service Worker] New version found, waiting to activate...');
              newWorker.postMessage({ type: 'SKIP_WAITING' });
            }
          });
        }
      });
    })
    .catch((error: Error) => {
      console.error('Service Worker registration failed:', error.message, error);
    });

  // Reload the page when the new version is activated
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    console.log('[Service Worker] New version activated, reloading page...');
    window.location.reload(); // Ensure latest version is used
  });
}

// Mount the app
app.mount('#app');
