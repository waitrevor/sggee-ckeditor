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
// import CMS from "decap-cms-app";
// // Initialize the CMS object
// CMS.init();
// Now the registry is available via the CMS object.
// CMS.registerPreviewTemplate("my-template", MyTemplate);

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
  const version = '1.0.0';
  const sw = navigator.serviceWorker as ServiceWorkerContainer;
  sw.register(`/sw.js?version=${version}`, { type: 'module', scope: '/' })
    .then((registration: ServiceWorkerRegistration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((error: Error) => {
      console.error('Service Worker registration failed:', error.message, error);
    });
}

// Mount the app
app.mount('#app');
