<template>
  <div v-for="(entry, index) in props.searchResults.data" :key="entry.id" class="card">

    <template v-if="isMarriageResults()">
      <MarriageResult
        :individual="entry"
        :moreDetails="searchResults.moreDetails"
        :toggleDetails="toggleDetails"
        :index="index"
      />
    </template>
    <template v-else>
      <Person
        :individual="entry"
        :moreDetails="searchResults.moreDetails"
        :toggleDetails="toggleDetails"
        :index="index"
      />
    </template>

    <div v-if="searchResults.moreDetails[index]" class="details-container">
      <div style="margin-left: 10px; margin-bottom: 10px;">
        <div>
          <strong>Parish: </strong>
          <template v-if="entry.parish">
            {{ entry.parish }}
          </template>
          <template v-else>
            <span class="missing-text">{{ missingPlaceholdlerText }}</span>
          </template>
        </div>

        <div>
          <strong>Film/Item Number: </strong>
          <template v-if="entry.film_or_item">
            {{ entry.film_or_item }}
          </template>
          <template v-else>
            <span class="missing-text">{{ missingPlaceholdlerText }}</span>
          </template>
        </div>

        <div>
          <strong>Register: </strong>
          <template v-if="entry.register">
            {{ entry.register }}
          </template>
          <template v-else>
            <span class="missing-text">{{ missingPlaceholdlerText }}</span>
          </template>
          
          <strong style="margin-left: 10px;">Page Number: </strong>
          <template v-if="entry.pagenum">
            {{ entry.pagenum }}
          </template>
          <template v-else>
            <span class="missing-text">{{ missingPlaceholdlerText }}</span>
          </template>
        </div>
        
        <div>
          <template v-if="entry.hyperlink">
            <a :href="extractHref(entry.hyperlink)" target="_blank">
              Link to Original Record 
              <font-awesome-icon :icon="['fa', 'up-right-from-square']" class="link-icon"/> 
            </a>
          </template>
        </div>

      </div>

      <div style="margin-left: 30px;">
        <strong>Remarks: </strong>
          <template v-if="entry.remarks">
            {{ entry.remarks }}
          </template>
          <template v-else>
            <span class="missing-text">{{ missingPlaceholdlerText }}</span>
        </template>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import Person from './Person.vue';
import MarriageResult from './MarriageResult.vue'

const props = defineProps<{
  searchResults: any;
}>();

const missingPlaceholdlerText = 'No Data';

const toggleDetails = async (index: number) => {
  props.searchResults.moreDetails[index] = !props.searchResults.moreDetails[index];
};

function extractHref(htmlString: string): string {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlString;
  const anchor = tempDiv.querySelector('a');
  const href = anchor?.getAttribute('href');
  return href ? href : '';
}

const isMarriageResults = () => {
  return window.location.href.includes('marriage');
}
</script>


<style scoped lang="scss">
@import "../../../scss/variables";

.missing-text {
  color: lightgray;
}

.info_container {
  display: flex;
  flex-direction: column;
	width: 300px;
}

.person-card {
	position: relative;
  display: flex;
  flex-direction: row;
  padding: 16px;
  margin: 0 auto;
  padding-left: 8px;
	padding-right: 45px;
  min-width: 300px;

  @media (max-width: 1150px) {
    flex-direction: column;
  }

  @media (max-width: 300px) {
    min-width: 0px;
  }
}

.name {
  display: flex;
  flex-direction: column;
	width: 300px;
  @media (max-width: 1150px) {
    width: 100%;
  }
}

.name-container {
  display: flex;
  align-items: center;
}

.info {
  display: flex;
  flex-direction: column;
	width: 600px;

  @media (max-width: 1411px) {
    width: 300px;
    //width: 750px;
  }

  @media (max-width: 1150px) {
    width: 100%;
    //width: 750px;
  }
}

.parents {
  display: flex;
  flex-direction: column;
	width: 350px;
  @media (max-width: 1150px) {
    width: 100%;
    //width: 750px;
  }
}

.name div,
.info div,
.parents div {
  margin-right: 8px;
}

.info div,
.parents div {
  margin-bottom: 0px;
}

.details {
  position: absolute;
	right: 5px;
	top: 5px;
}

.details-button {
  //background-color: white;
  width: 45px;
  height: 45px;
  cursor: pointer;
	align-items: center; //vertically center
	text-align: center;

  &:hover {
    background-color: #eee;
    .details-icon {
      width: 32px;
      height: 32px;
    }
  }
}

.up-caret-offset {
	margin-top: 6px;
}

.down-caret-offset {
	margin-top: 6px;
}

.details-icon {
  width: 26px;
  height: 26px;
  color: $menu-bar-bg;
}

.link-icon {
  width: $font-size;
  height: $font-size;
  color: $link-color;
  &:hover { 
    color: $link-hover-color;
  }
}

.details-icon:hover {
  width: 30px;
  height: 30px;
}

.sex-icon {
  /* Assuming the icons have fixed width */
  width: 30px; /* Adjust according to your icon size */
  height: auto;
  display: flex;
  align-items: center;
}

/* Tooltip styling */
.sex-icon:hover {
  position: relative;
}

.sex-icon:hover::after {
  content: attr(title);
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: $menu-bar-light;
  color: purple;
  padding: 5px;
  border-radius: 5px;
  white-space: nowrap;
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
</style>
