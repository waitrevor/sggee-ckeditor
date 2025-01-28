<template>
  <aside :class="{ 'search-closed': isClosed }">
    <div class="filter-container" :style="{ 
        top: isBottom ? `calc(${topMenuOffset}) ` : topMenuOffset,
        left: leftValue,
        height: isBottom ? `calc(100vh - ${topMenuOffset} - ${footerSize})` : `calc(100vh - ${topMenuOffset})`,
        boxShadow: checkNarrow() ? '0 0 20px rgba(0, 0, 0, 0.3)' : '0 0 10px rgba(0, 0, 0, 0.1)'
      }">

      <h2 class="centered-content" style="width: 320px; margin: 0px; margin-top: 4px;">Search Criteria</h2>

      <div class="filter">
        
        <div v-if="checkNarrow()">
          <div class="close-button1" @click="togglePanel">
            <font-awesome-icon class="search-side-icon" :icon="['fas', 'fa-times']" />
          </div>
        </div>


        <!-- Button Section-->
        <div style="margin-top: -50px; width: 300px;">
          <button class="search-button" @click="handleSearchClicked" ref="searchButton">
            <i class="fa-solid fa-magnifying-glass"></i>
            Search
          </button>
          
          <button class="reset-button" @click="resetFlag = !resetFlag;" ref="resetButton">
            <i class="fa-solid fa-rotate-left"></i>
            Reset
          </button>
        </div>

        

        <!-- Slots for extending content in child components and Minimize/Expand toggle button for slot -->
        <div :style="{ marginLeft: '-16px', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', marginTop: '-1px' }">
          <div @click="isSlotMinimized = !isSlotMinimized" @mouseover="expandHovered = true" @mouseleave="expandHovered = false" :style="{ paddingBlock: '6px', textAlign: 'left', paddingLeft: '10px', cursor: 'pointer', backgroundColor: expandHovered ? '#eee' : '#fff'} ">
            
            <template v-if="!expandHovered">
              <font-awesome-icon :icon="isSlotMinimized ? ['fas', 'square-caret-down'] : ['fas', 'square-caret-up']" 
              :style="{ fontSize: '22px', color: '#00AFAA' }"/>
            </template>
            <template v-else>
              <font-awesome-icon :icon="isSlotMinimized ? ['fas', 'square-caret-down'] : ['fas', 'square-caret-up']" 
              :style="{ fontSize: '25px', width: '24px', height: 'auto', marginBottom: '-3px', marginTop: '-2px', marginLeft: '-3px', color: '#00AFAA' }"/>
            </template>

            <template v-if="isSlotMinimized || !isSlotMinimized" style="background-color: #fff;">
              <b style="padding-left: 10px;">Search Terms</b>
            </template>
          </div>

          <!-- Dynamic search bubbles -->
          <div class="search-bubbles-section" :style="{ marginTop: isSlotMinimized && allEmpty ? '0px' : '8px' }">
            <span v-for="(value, key) in searchFields" :key="key" class="search-bubble">
              <template v-if="value">
                <button @click="clearField(key)">
                  <template v-if="value.length < 17">
                    
                    <template v-if="key == 'recordtype'">
                      <template v-if="value == 'M'">
                        {{ 'Marriage' }}
                      </template>
                      <template v-else-if="value == 'B'">
                        {{ 'Birth' }}
                      </template>
                      <template v-else-if="value == 'D'">
                        {{ 'Death' }}
                      </template>
                    </template>
                    <template v-else>
                      {{ value }}
                    </template>
                    
                  </template>
                  <template v-else>
                    {{ value.substring(0, 15) + '... ' }}
                  </template>

                  <i class="fa fa-circle-xmark" style="color: black; margin-left: 5px;"></i>
                </button>
              </template>
            </span>
          </div>

          <div v-if="!isSlotMinimized" style="margin-left: 16px; margin-bottom: 10px;">
            <slot></slot>
          </div>
        </div>

        <!-- Sorting Section-->
        <div :style="{ marginLeft: '-16px', borderTop: '1px solid #ddd', borderBottom: '1px solid #ddd', marginTop: '-1px' }">

          <div @click="isSortingMinimized = !isSortingMinimized" @mouseover="expandSortHovered = true" @mouseleave="expandSortHovered = false" :style="{ paddingBlock: '6px', textAlign: 'left', paddingLeft: '10px', cursor: 'pointer', backgroundColor: expandSortHovered ? '#eee' : '#fff'} ">
            
            <template v-if="!expandSortHovered">
              <font-awesome-icon :icon="isSortingMinimized ? ['fas', 'square-caret-down'] : ['fas', 'square-caret-up']" 
              :style="{ fontSize: '22px', color: '#00AFAA' }"/>
            </template>
            <template v-else>
              <font-awesome-icon :icon="isSortingMinimized ? ['fas', 'square-caret-down'] : ['fas', 'square-caret-up']" 
              :style="{ fontSize: '25px', width: '24px', height: 'auto', marginBottom: '-3px', marginTop: '-2px', marginLeft: '-3px', color: '#00AFAA' }"/>
            </template>

            <template v-if="isSortingMinimized || !isSortingMinimized" style="background-color: #fff;">
              <b style="padding-left: 10px;">Sorting</b>
            </template>
          </div>
          <div v-if="!isSortingMinimized" style="margin-top: 8px; margin-left: 16px; margin-bottom: 10px;">

            <p style="margin-top: -12px; margin-bottom: 5px; margin-right: 12px;">

              Choose one or more search terms to order your results by:
              <div style="margin-left: 24px; margin-bottom: 16px;">
                <li><i class="fa fa-arrow-down-a-z" style="color: #093153;"></i> Ascending order (A-Z)</li>
                <li><i class="fa fa-arrow-up-a-z" style="color: #093153;"></i> Descending order (Z-A)</li>
              </div>
            </p>

            <!-- Dropdowns with Plus and Minus buttons -->
            <div v-for="(selectedField, index) in selectedFields" :key="index" style="display: flex; align-items: center; margin-left: 40px;">

              
              <!-- Add New Dropdown Button -->
              <div v-if="selectedFields.length < Object.keys(searchFields).length - 1 && index == 0" style="margin-left: -36px; margin-right: 15px;">
                <i @click="addSortOption" :disabled="selectedFields.length >= Object.keys(searchFields).length - 1" class="fa-solid fa-square-plus"  style="font-size: 24px; cursor: pointer; margin-bottom: 20px; color: #093153;"></i>
              </div>

              <!-- Sort by Field Dropdown -->
              <select v-model="selectedFields[index]" style="padding: 6px; width: 200px; margin-right: 10px;">
                <option disabled value="">Select a search term</option>
                <option v-for="(field, key) in availableFields(index)" :key="key" :value="key">{{ field }}</option>
              </select>

              <!-- Toggle Sorting Order -->
              <div>
                <i @click="toggleSortOrder(index)" :class="sortOrders[index] === 'DESC' ? 'fa fa-arrow-up-a-z' : 'fa fa-arrow-down-a-z'" style="font-size: 24px; cursor: pointer; margin-bottom: 20px; margin-right: 10px; color: #093153;"></i>
              </div>
              
              <!-- Minus Button to Remove Dropdown -->
              <div v-if="index == 0">
                <i @click="selectedFields[index] = ''; removeSortOption(index); sortOrders[index] = DEFAULT_SORT_ORDER;" class="fa fa-circle-xmark" style="font-size: 24px; cursor: pointer; margin-bottom: 20px; color: #093153;"></i>
              </div>
              <div v-else>
                <i @click="removeSortOption(index)" class="fa fa-circle-xmark" style="font-size: 24px; cursor: pointer; margin-bottom: 20px; color: #093153;"></i>
              </div>
              
            </div>
          </div>
        </div>

      <!-- Help Section -->
      <div :style="{ marginLeft: '-16px', borderTop: '0px solid #ddd', borderBottom: '1px solid #ddd' }">
                
          <div @click="isSectionMinimized = !isSectionMinimized" @mouseover="expand2Hovered = true" @mouseleave="expand2Hovered = false" :style="{ paddingBlock: '6px', textAlign: 'left', paddingLeft: '10px', cursor: 'pointer', backgroundColor: expand2Hovered ? '#eee' : '#fff'} ">
            
            <template v-if="!expand2Hovered">
              <font-awesome-icon :icon="isSectionMinimized ? ['fas', 'square-caret-down'] : ['fas', 'square-caret-up']" :style="{ fontSize: '22px', color: '#00AFAA' }"/>
            </template>
            <template v-else>
              <font-awesome-icon :icon="isSectionMinimized ? ['fas', 'square-caret-down'] : ['fas', 'square-caret-up']" :style="{ fontSize: '25px', width: '24px', height: 'auto', marginBottom: '-3px', marginTop: '-2px', marginLeft: '-3px', color: '#00AFAA' }"/>
            </template>

            <template v-if="isSectionMinimized || !isSectionMinimized" style="background-color: #fff;">
              <b style="padding-left: 10px;">Need More Help?</b>
            </template>
          </div>
          
          <div v-if="!isSectionMinimized" style="margin-top: -26px; margin-left: 16px;">
            <!-- Help section added here -->
            <div class="help-section">

              <p>Check out the <a href="https://drive.google.com/file/d/1kyB4uLCfYDyDfmFBLOPlA_T2AQvQgA-s/view?usp=drive_link" target="_blank">Search Results Guide</a> pdf for more information.</p>

              <!-- Search Instructions -->
              <p>
                <span>
                  <div style="display: flex; justify-content: right; align-items: right; margin-top: -18px;">
                    <template v-if="isFaqCollapsed">
                      <a @click="isFaqCollapsed = !isFaqCollapsed" style="cursor: pointer;">Show FAQs</a>
                    </template>
                    <template v-else>
                      <a @click="isFaqCollapsed = !isFaqCollapsed" style="cursor: pointer;">Hide FAQs</a>
                    </template>
                    <!--i @click="isFaqCollapsed = !isFaqCollapsed" :class="isFaqCollapsed ? 'fa fa-toggle-off' : 'fa fa-toggle-on'" style="font-size: 28px; margin-left: 6px; margin-right: 4px; cursor: pointer; color: #093153"></i-->
                  </div>

                  <div v-if="!isFaqCollapsed">
                    <h3>FAQs</h3>
                    <strong>Q:</strong> How do I use the dropdown below each field?
                    <br>
                    <strong>A:</strong> Click the <i>Search Types</i> dropdown below any compatible keyword, and select from the following options:
                    <ul style="margin-top: 0;">
                      <li><b>Substring</b> - Finds any occurrence of the term</li>
                      <li><b>DM</b> - Searches a field phonetically (Daitch-Mokotoff Soundex)</li>
                      <li><b>Case Insensitive</b> - Looks for only the term and ignores case</li>
                    </ul>
                  </div>
                </span>
              </p>
            </div>
          </div>
        </div>


      </div>
    </div>
  </aside>


  <div v-if="isClosed">
    <div class="magnifying-glass-container" @click="togglePanel">
      <font-awesome-icon class="search-side-icon" v-if="isClosed" :icon="['fas', 'fa-magnifying-glass']" />
      <font-awesome-icon class="search-side-icon" v-else :icon="['fas', 'fa-times']" />
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick, PropType } from 'vue';
import { topMenuOffset, leftMarginWidth, updateMarginTop, updateAppWidth } from '../../utilities/spacing';

const DEFAULT_SORT_ORDER = 'ASC';

const isBottom = ref(false)
const footerSize = ref('0px')

// Function to check if the user has scrolled to the bottom
const checkScroll = () => {
  const scrollPosition = window.innerHeight + window.scrollY;
  const pageHeight = document.documentElement.scrollHeight;
  
  isBottom.value = scrollPosition >= pageHeight - 136; // Check if scrolled to bottom
  footerSize.value = `${scrollPosition - pageHeight + 166}px`;
};

const props = defineProps({
  searchFields: {
    type: Object as PropType<{ [key: string]: string }>,
    required: true
  },
  fieldLabelMap: {
    type: Object as PropType<{ [key: string]: string }>,
    default: () => ({})
  }
});

export interface Dropdown {
  isOpen: boolean;
}

const allEmpty = computed(() => 
  Object.values(props.searchFields).every(field => field === '')
);

// Help Section
const isSectionMinimized = ref(false);
const expand2Hovered = ref(false);
const isFaqCollapsed = ref(true);
// Search Terms
const isSlotMinimized = ref(false);
const expandHovered = ref(false);
// Sorting
const isSortingMinimized = ref(false);
const expandSortHovered = ref(false);

const sortOrders = ref([DEFAULT_SORT_ORDER]);

// Array to manage the selected field keys in the dropdowns
const selectedFields = ref<string[]>(['']);

// Function to add a new dropdown option
const addSortOption = () => {
  selectedFields.value.push(''); // Add a new empty string for a new dropdown
  sortOrders.value.push(DEFAULT_SORT_ORDER); // Default sort order for new field
};

const resetSelectedFields = () => {
  selectedFields.value = ['']; // Reset to a single empty string
  sortOrders.value = [DEFAULT_SORT_ORDER];  // Reset sortOrders to match
};

// Function to remove a dropdown option by index
const removeSortOption = (index: number) => {
  if (selectedFields.value.length > 1) {
    selectedFields.value.splice(index, 1); // Remove the selected dropdown
    sortOrders.value.splice(index, 1); // Remove corresponding sort order
  }
};

const toggleSortOrder = (index: number) => {
  sortOrders.value[index] = sortOrders.value[index] === 'ASC' ? 'DESC' : 'ASC'; // Toggle the sort order
};

const availableFields = (index: number) => {
  const usedFields = selectedFields.value.filter((_, i) => i !== index); // Exclude the current field
  
  const filteredFields = Object.entries(props.searchFields)
    .filter(([key]) => !usedFields.includes(key) && key !== 'individualId'); // Exclude already selected fields and 'individualId'

  // Return the original field key with the mapped readable name
  return Object.fromEntries(
    filteredFields.map(([key, value]) => [key, props.fieldLabelMap[key] || key])
  );
};

// Clear specific search field
const clearField = (field: keyof typeof props.searchFields) => {
  props.searchFields[field] = '';
};

const isClosed = ref(false);
const leftValue = ref('0');
const searchButton = ref<HTMLButtonElement | null>(null);
const resetButton = ref<HTMLButtonElement | null>(null);
const showTooltip = ref(false);

const checkNarrow = () => {
  const widthThreshold = 1755;
  return window.innerWidth <= widthThreshold;
};

const togglePanel = () => {
  isClosed.value = !isClosed.value;
};

const handleSearchClicked = () => {
  if (checkNarrow()) {
    togglePanel();
  }
  searchFlag.value = !searchFlag.value;
};

const isMobile = (): boolean => {
  const mobileRegex = /Mobi|Android/i;
  return mobileRegex.test(navigator.userAgent);
};

const togglePanelOnWidth = () => {
  if (!isMobile()) {
    if (!isClosed.value && checkNarrow()) {
    togglePanel();
    }
    if (isClosed.value && !checkNarrow()) {
      togglePanel();
    }
  } 
};

const calcLeft = () => {
  const leftMarginWidthThreshold = 1920;
  leftValue.value = '0';
  if (window.innerWidth > leftMarginWidthThreshold) {
    leftValue.value = `calc(${leftMarginWidth.value} - ${leftMarginWidthThreshold / 8}px - 10px)`;
  }
};

const handleGlobalKeys = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    if (isClosed.value) {
      isClosed.value = false;
    } else {
      searchButton.value?.click();
    }
  }
};

const resizeEventListener = () => {
  updateMarginTop();
  updateAppWidth();
  calcLeft();
  togglePanelOnWidth();
};

onMounted(() => {
  nextTick(() => {
    resizeEventListener();
    checkScroll();
  });
  window.addEventListener('resize', resizeEventListener);
  document.addEventListener('keydown', handleGlobalKeys);
  window.addEventListener('scroll', checkScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeEventListener);
  document.removeEventListener('keydown', handleGlobalKeys);
  window.removeEventListener('scroll', checkScroll);
});

const searchFlag = ref(false);
const resetFlag = ref(false);

defineExpose({
  searchFlag,
  resetFlag,
  isClosed,
  showTooltip,
  selectedFields,
  sortOrders,
  resetSelectedFields
});
</script>

<style scoped lang="scss">
@import '../../scss/search.scss';

.search-button {
  width: 122px;
  padding: 5px;
  margin-left: 30px;
  margin-right: 16px;
  user-select: none;
}

.reset-button {
  width: 122px;
  padding: 5px;
  margin-bottom: 10px;
  user-select: none;
}

.search-bubbles-section {
  margin-left: 8px;
  margin-bottom: -2px;
}

.search-bubble button {
  padding: 3px;
  margin-top: -10px;
  margin-bottom: 10px;
  margin-inline: 2px;
  cursor: pointer;
}

.help-section {
  width: 310px;
  margin-top: 20px;
  margin-bottom: 20px;

  h3 {
    margin: 0;
  }
}

.underline {
  text-decoration: underline;
  cursor: default;
  position: relative;
}

.tooltip {
  position: absolute;
  z-index: 1;
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 2px;
  padding-inline: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  white-space: normal; /* Allow multiline text */
  background-color: $menu-bar-light;
}

.underline:hover .tooltip {
  opacity: 1;
}
</style>
