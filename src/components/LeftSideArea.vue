<template>
  <div class="left-margin" :style="{ top: topMenuOffset, height: `calc(100vh - ${topMenuOffset})`, width: leftMarginWidth }">
    <aside class="left-side-area" :class="{ 'hidden': isMenuHidden }" :style="{ maxHeight: `calc(97vh - ${topMenuOffset})` }">
      <div class="scrollable-content">
        <component :is="contentComponent" />
      </div>
    </aside>
  </div>

  <aside v-if="isMenuHidden">
    <button class="learn-more-button" @click="toggleMobileArea"  v-if="isMobileMenuHidden">
      {{ buttonLabel }}
      <font-awesome-icon :icon="['fas', 'fa-info-circle']" class="icon"/>
    </button>
    <div class="mobile-area" v-if="!isMobileMenuHidden">
      <component :is="contentComponent" style="transform: translateX(20px);"/> 
      <button class="close-button" @click="toggleMobileArea" >
        <font-awesome-icon :icon="['fas', 'fa-times']" class="x-img"/>
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { topMenuOffset, leftMarginWidth, updateMarginTop, updateAppWidth } from '../utilities/spacing';

const maxContentWidth = 1600;
const isMenuHidden = ref(false);
const isMobileMenuHidden = ref(true);

const props = defineProps({
  contentComponent: {
    type: Object,
    required: true,
  },
  buttonLabel: {
    type: String,
    required: true
  }
});

const checkWindowSize = () => {
  isMenuHidden.value = window.innerWidth < maxContentWidth;
};

const toggleMobileArea = () => {
  isMobileMenuHidden.value = !isMobileMenuHidden.value;
};

const resizeEventListener = () => {
  updateMarginTop();
  checkWindowSize();
  updateAppWidth('.sggee-app');
};

onMounted(() => {
  nextTick(() => {
    resizeEventListener();
  });
  window.addEventListener('resize', resizeEventListener);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeEventListener);
});
</script>

<style lang="scss">
@import "../scss/main.scss";

.left-margin {
  position: fixed;
  left: 0;
  display: flex; /* Use flexbox for layout */
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  z-index: 1000;
}

.left-side-area {
  width: 250px;
  position: fixed;
  overflow-y: auto;
  padding-right: 20px;
  padding-left: 10px;
  padding-top: 0px;
  padding-bottom: 0px;
  transition: transform 0.3s ease;

  @media (max-width: 1900px) {
    //margin-left: 100px !important;
    left: 20px;
  }

  color: $text-color;
  background-color: $menu-bar-bg;
  //background: linear-gradient(45deg, $menu-bar-bg, $header-bg);

  /* Border styles */
  //border: $border-thickness $border-style $menu-bar-bg;
  border-radius: 16px; 

  /* Drop shadow */
  $blur-radius: 50px;
  $horizontal-offset: -20px;
  $vertical-offset: 10px;
  $shadow-color: rgba(0, 0, 0, 0.3); // rgba(92, 148, 181, 0.7)
  box-shadow: $horizontal-offset $vertical-offset $blur-radius $shadow-color; 

  /* Style the scrollbar */
  &::-webkit-scrollbar {
    width: 10px; //12px;
    height: 100px; /* Set the height of the scrollbar */
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

.left-side-area.hidden {
  transform: translateX(-200%);
}

.scrollable-content {
  height: 95%;
  //overflow-y: auto;
  padding: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
  padding-right: 10px;
  margin-bottom: 30px;
  position: relative;
  top: 10px;
  left: 12px;

  a {
    color: black;
  }
}

.mobile-area {
  display: flex;
  flex-basis: auto;
  flex-direction: row;
  justify-content: center; 
  width: 80%;
  max-width: 600px; /* Set a maximum width if needed */
  color: $text-color;
  background-color: $menu-bar-bg;
  margin: 20px auto; /* Center horizontally */
  padding: 20px;
  border-radius: 16px; 
  
  a {
    color: black;
  }
}

.icon {
  color: white;
  width: 20px;
  height: 20px;
  position: relative;
  top: 3px;
  left: 3px;
}

.learn-more-button {
  margin-top: 25px;
  background-color: $menu-bar-bg;
  border: 2px $border-style #48768960;
  padding: 10px;
  cursor: pointer;
}


.close-button {
  transform: translate(10px, -10px);
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  flex-wrap: wrap;
  height: 40px;
  padding: 15px;
  background-color: $menu-bar-bg;
  border: 2px $border-style #48768960;
  cursor: pointer;
}

.x-img {
  position: absolute;
  left: 3px;
  width: 24px;
  height: 24px;
}

</style>
