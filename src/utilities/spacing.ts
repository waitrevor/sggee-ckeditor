import { ref } from 'vue';

/* NOTE: These functions assumes that by default:
  'header' => scss class for the top colored strip
  'top-menu' => scss class for the top nav menu
  'sggee-app' => the root scss class/container */
  
export const topMenuOffset = ref('0px');
export const leftMarginWidth = ref('0px');

export const updateMarginTop = (headerClass='.header', topMenuClass='.top-menu'): void => {
  const header = document.querySelector(headerClass);
  const topMenu = document.querySelector(topMenuClass);
  if (header && topMenu) {
    topMenuOffset.value = `${(header as HTMLElement).offsetHeight + (topMenu as HTMLElement).offsetHeight}px`;
  }
};

export const updateAppWidth = (appContainer='.search-main-content'): void => {
  const app = document.querySelector(appContainer);
  if (app) {
    leftMarginWidth.value = `${(window.innerWidth-(app as HTMLElement).offsetWidth)/2}px`;
  }
};
