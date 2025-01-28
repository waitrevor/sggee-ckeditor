<template>
  <div class="side-panel-container" :style="{ top: topMenuOffset, height: `calc(100vh - ${topMenuOffset})`}">
    <aside class="right-side-area" :class="{ 'closed': isClosed }" :style="{ height: `calc(100vh - ${topMenuOffset})`}">
      <header class="panel-header">
        <h3>On This Page</h3>
      </header>
      <nav class="section-list">
        <ul>
          <li v-for="section in sections" :key="section">
            <a @click="scrollToSection(section);">{{ section }}</a>
          </li>
        </ul>
        <br>
      </nav>
    </aside>
    <button class="close-button" @click="togglePanel">
      <font-awesome-icon class="side-icon" v-if="isClosed" :icon="['fas', 'fa-info-circle']" />
      <font-awesome-icon class="side-icon" v-else :icon="['fas', 'fa-times']" />
    </button>
  </div>
</template>

<script setup lang='ts'>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { router } from '../router/routes';
import { topMenuOffset, updateMarginTop } from '../utilities/spacing';

const { sections } = defineProps([
  'sections'
]);

const isClosed = ref(false);
let hasClosedOnce = false; // Flag to track if it has closed once

const togglePanel = () => {
  isClosed.value = !isClosed.value;
};

const togglePanelOnWidth = () => {
  if (!isClosed.value && !hasClosedOnce && window.innerWidth <= 1700) {
    togglePanel();
    hasClosedOnce = true;
  }
  if (isClosed.value && hasClosedOnce && window.innerWidth >= 1700) {
    togglePanel();
    hasClosedOnce = false;
  }
};

const scrollToSection = (sectionId: string, additionalOffset: number = 16) => {
  const target = document.getElementById(sectionId);
  if (target) {
    let offset = parseInt(topMenuOffset.value, 10) + additionalOffset;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });
    router.push(`#${sectionId}`)
    if (window.innerWidth <= 1700) {
      togglePanel();
    }
  }
};

const resizeEventListener = () => {
  updateMarginTop();
  togglePanelOnWidth();
};

onMounted(() => {
  nextTick(() => {
    resizeEventListener();
  });
  window.addEventListener('resize', resizeEventListener);

  const urlFragments = window.location.hash.split('#');
  if (urlFragments.length > 1) {
    const lastFragment = urlFragments.pop();
    if (lastFragment) {
      const decodedAnchor = decodeURIComponent(lastFragment);
      scrollToSection(decodedAnchor)
    }
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeEventListener);
});
</script>

  
<style scoped lang='scss'>
  @import '../scss/main.scss';
  $content-width: 330px;

  .side-panel-container {
    position: fixed;
    right: 0;
    width: $content-width;
    z-index: 999;
  }

  .right-side-area {
    position: absolute;
    right: 0;
    width: $content-width;
    background-color: $primary-bg;
    box-shadow: 0 0 10px rgba(4, 4, 4, 0.4);
    border: 4px $border-style #00000030;
    border-color: $menu-bar-bg;
    color: $text-color;
    transform: translateX(0);
    transition: transform 0.1s ease-in-out;
  }

  .section-list {
    position: relative;
    margin-top: 60px;
    height: 92%;
    overflow-y: auto; /* Add a vertical scrollbar when content overflows */
    padding-right: 10px;

    /* Style the scrollbar */
    &::-webkit-scrollbar {
      width: 12px;
      height: auto;
    }
    &::-webkit-scrollbar-thumb {
      background-color: $menu-bar-dark;
      border-radius: 8px;
    }
    &::-webkit-scrollbar-track {
      background-color: $menu-bar-light;
      border-radius: 8px;
    }
  }
  
  .closed {
    transform: translateX($content-width + 8px);
  }

  .panel-header {
    top: 0;
    position: fixed;
    height: 40px; /* Set the height of the fixed header */
    width: $content-width - 20px;
    background-color: $menu-bar-bg;
    color: $text-color;
    padding: 10px;
    text-align: center;
    display: flex;
    align-items: center;
    box-shadow: 0 0 10px rgba(4, 4, 4, 0.3);
  }

  .close-button {
    position: absolute;
    margin-top: 16px;
    right: 20px;
    height: 50px;
    width: 50px;
    background-color: rgba(red($menu-bar-bg), green($menu-bar-bg), blue($menu-bar-bg), 0.6);
    border: 2px $border-style #48768960;
    padding: 12px;
    cursor: pointer;
  }

  .side-icon {
    width: 32px;
    height: 32px;
    font-size: 32px;
    color: $primary-bg;
    margin-top: -5px;
    margin-left: -5px;
  }

  @media (max-width: 856px) {
    .side-icon {   
      color: rgba(red($primary-bg), green($primary-bg), blue($primary-bg), 0.6);
    }
  }

  ul {
    list-style: none;
    text-align: left;
  }

  li {
    list-style: square; /* Add bullet points inside the <li> elements */
    position: relative; /* Position the bullet points and text relative to the <li> */
    padding-left: 0.5em; /* Adjust the space between the bullet point and text */
    padding-bottom: 0.65em;
  }

  li::first-line {
    margin: 10px; /* Add margin to the first line of each list item */
  }

  a {
    cursor: pointer;
    text-decoration: underline;
  }

</style>
  