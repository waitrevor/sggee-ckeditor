<template>
  <TopMenu/>
  <div class="main-content-container" :style="contentStyles">
    <router-view v-slot="{ Component, route }" >
      <component :is="Component" :key="route.path"/>
    </router-view>
  </div>
  <!-- <AppFooter/> -->
</template>

<script setup lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, nextTick, computed} from 'vue';
import { topMenuOffset, updateMarginTop } from './utilities/spacing';
import TopMenu from './components/menu/TopMenu.vue';
import footerTemplate from '../public/footer.html?raw';
import { useUserStore } from './utilities/user';

const userStore = useUserStore();

const AppFooter = defineComponent({ 
  template: footerTemplate 
});

const contentStyles = computed(() => {
  const additionalTopPadding = '20px';
  return {
    'margin-top': `calc(${topMenuOffset.value} + ${additionalTopPadding})`,
  };
});

onMounted(() => {
  nextTick(() => {
    updateMarginTop();
  });
  window.addEventListener('resize', () => {
    updateMarginTop();
  });
  userStore.loadFromLocalStorage();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', () => {
    updateMarginTop();
  });
});
</script>
