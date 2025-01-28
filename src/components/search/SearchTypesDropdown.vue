<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Dropdown } from './SearchCriteria.vue';

const props = defineProps(['modelValue', 'options', 'otherDropdowns', 'disabled']);
const emits = defineEmits(['update:modelValue']);
const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);


const handleOptionClick = (option: string) => {
  emits('update:modelValue', option);
  isOpen.value = !isOpen.value;
};

const handleDropdownClick = (event: MouseEvent) => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value;
    event.stopPropagation();
    props.otherDropdowns.forEach((dropdown: Dropdown) => {
      dropdown.isOpen = false;
    });
  }
};

const handleDocumentClick = (event: MouseEvent) => {
  if (!props.disabled) {
      if (isOpen.value && dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
      isOpen.value = false;
    }
  }
};

onMounted(() => {
  document.addEventListener('click', handleDocumentClick);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick);
});

defineExpose({
  isOpen
});
</script>

<template>
  <div class="custom-dropdown" ref=dropdownRef>
    
    <div v-if="!props.disabled" class="dropdown-header" @click="handleDropdownClick">
      <div class="checkmark" v-if="!props.disabled">
        <font-awesome-icon :icon="['fas', isOpen ? 'fa-caret-up' : 'fa-caret-down']"/>
      </div>
      <div class="text-container">
        <span class="non-selectable-text">{{ modelValue }}</span>
      </div>
    </div>
    <div v-else class="dropdown-header" style="cursor: auto;" :class="{'disable-hover': props.disabled}">
      <div class="text-container">
        <span class="non-selectable-text">{{ modelValue }}</span>
      </div>
    </div>
    <transition> <!--  name="fade" -->
      <div v-if="isOpen" class="dropdown-options">
        <div v-if="!props.disabled">
          <div v-for="option in options" :key="option" @click="handleOptionClick(option)" class="option">
            <span class="non-selectable-text">{{ option }}</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
  
<style scoped lang="scss">
@import "../../scss/variables";

.custom-dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-header {
  cursor: pointer;
  margin-left: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 6px;
  padding-inline: 15px;
  color: #333;
  border: 1px solid #bbb;
  border-radius: 10px;

  .checkmark {
    width: 12px;
    height: auto;
    margin-right: 5px;
    margin-left: -5px;
    align-items: center;
    justify-content: center;
  }

  &:not(.disable-hover):hover {
    background-color: #eee;
  }
}

.dropdown-options {
  z-index: 100;
  position: absolute;
  top: 80%;
  left: 10%;
  background-color: $content-bg;
  box-shadow: 4px 4px 48px rgba($pms-540, 0.2);
  overflow-y: auto;
  align-items: center;
  justify-content: center;
  width: 190px;
  border: 1px solid $menu-bar-bg;
  border-radius: 8px;
}

.non-selectable-text {
  user-select: none;
}

.option {
  border: 1px solid #ccc;
  cursor: pointer;
  padding-inline: 5px;
}

.option:hover {
  background-color: #ddd;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s; 
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
