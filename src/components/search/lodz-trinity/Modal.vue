<template>
  <div>
    <!-- Button to open the modal -->
    <div :class="[buttonClass, 'cursor-pointer']" @click="openModal">
      <img v-if="iconSrc == 'Birth'" src="../../../../public/icons/BirthFamily.svg" alt="Birth Family Image" :height="iconHeight" :width="iconWidth" />
      <img v-if="iconSrc == 'Sources'" src="../../../../public/icons/Sources.svg" alt="Source Info Image" :height="iconHeight" :width="iconWidth" />
      {{ buttonText }}
    </div>

    <!-- Modal -->
    <div v-if="isModalOpen" class="modal" @click.self="closeModalOutside">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <div class="modal-header">
          <img v-if="iconSrc == 'Birth'" src="../../../../public/icons/BirthFamily.svg" alt="Birth Family Image" :height="iconHeight" :width="iconWidth" />
          <img v-if="iconSrc == 'Sources'" src="../../../../public/icons/Sources.svg" alt="Source Info Image" :height="iconHeight" :width="iconWidth" />
          <h2>{{ header }}</h2>
        </div>
        <div class="info-panel">
          <div v-if="subheading" class="subheading">
            <router-link :to="'search?id=' + individualId + '&pageNum=1&perPage=10'">{{ subheading }}</router-link>
          </div>
          <p class="info" v-if="info">{{ info }}</p>
          <span v-if="siblings">
            <Siblings :siblings="siblings"/>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import Siblings from './Siblings.vue';

const props = defineProps({
  header: String,
  subheading: String,
  info: String,
  individualId: String,
  buttonText: {
    type: String,
    default: ''
  },
  buttonClass: {
    type: String,
    default: 'btn-default' // Default button class
  },
  iconSrc: {
    type: String,
    default: '' // Default SVG image source
  },
  iconHeight: {
    type: String,
    default: '80' // Default height of the SVG image
  },
  iconWidth: {
    type: String,
    default: '80' // Default width of the SVG image
  },
  siblings: {}
});

// Define reactive variables
const isModalOpen = ref(false);
const iconPath = ref('');

const emits = defineEmits(['modal-opened', 'modal-closed']);

// Function to open the modal
const openModal = () => {
  isModalOpen.value = true;
  emits('modal-opened', true);
};

// Function to close the modal
const closeModal = () => {
  isModalOpen.value = false;
  emits('modal-opened', false);
};

// Function to close the modal when clicking outside of it
const closeModalOutside = (event: MouseEvent) => {
  const modalContent = document.querySelector('.modal-content');
  if (modalContent && !modalContent.contains(event.target as Node)) {
    closeModal();
  }
};

// Event listener to close modal on Escape key press
onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isModalOpen.value) {
    closeModal();
  }
};
</script>

<style scoped lang="scss">
@import "../../../scss/variables";

.modal {
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fefefe;
  border-radius: 16px;
  width: auto;
  max-width: 80%;
  max-height: 80%;
  overflow-y: auto;
  position: relative;
  min-width: 300px;
  min-height: 175px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  border: 2px solid $menu-bar-bg;
}

.modal-header {
  display: flex;
  background-color: $menu-bar-bg;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.2);
  padding-right: 80px;
  width: auto;
  h2 {
    margin: auto;
  }
}

.close {
  color: #ffffff;
  position: absolute;
  top: 12px;
  right: 8px;
  font-size: 50px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

/* Add cursor pointer to the button */
.cursor-pointer {
  cursor: pointer;
}

.info {
  white-space: pre-line;
}

.info-panel {
  padding: 16px;
}
</style>
