<script setup lang="ts">
import { ref } from 'vue';
import { removeNullAndEmptyArrays, checkUrlForLabel } from '../../../utilities/parsing';

const missingPlaceholdlerText = 'No Data';

// Extract the props with inline type annotations
const props = defineProps<{
  individual: any;
  moreDetails: unknown[];
  toggleDetails: (index: number, id: string) => void;
	index: number;
}>();

const showExpand = ref(false);
const expandTooltipText = ref('');

const showExpandTooltip = (text: string) => {
  const mobileRegex = /Mobi|Android/i;
  if (!mobileRegex.test(navigator.userAgent)) {
    expandTooltipText.value = text;
    showExpand.value = true;
  }
};

const hideExpandTooltip = () => {
  showExpand.value = false;
};

const individualData = ref(removeNullAndEmptyArrays(props.individual));
</script>

<template>

  <div class="person-card">
    <div class="name">
      <div>
        <strong>Name: </strong>
        <template v-if="individualData.given_name">
          {{ individualData.given_name + ' ' }}
        </template>
        <template v-if="individualData.surname">
          {{ individualData.surname }}
        </template>
      </div>
      
      <div>
        <strong>Name (Polish): </strong>
        <template v-if="individualData.given_name_polish">
          {{ individualData.given_name + ' ' }}
        </template>
        <template v-if="individualData.surname_polish">
          {{ individualData.surname }}
        </template>
        <template v-if="!individualData.given_name_polish && !individualData.surname_polish">
          <span class="missing-text">{{ missingPlaceholdlerText }}</span>
        </template>
      </div>
    </div>
    
    <div class="info">

      <div>
        <!-- Full Details -->
        <strong>{{ checkUrlForLabel(' Place') }}: </strong>
        <template v-if="individualData.village">
          {{ individualData.village + ' ' }}
        </template>
        <template v-else>
          <span class="missing-text">{{ missingPlaceholdlerText }}</span>
        </template>

        <div>
          <strong>{{ checkUrlForLabel(' Date') }}: </strong>
          <template v-if="individualData.event_month">
            {{ individualData.event_month + ' ' }}
          </template>
          <template v-if="individualData.event_year">
            {{ individualData.event_year }}
          </template>
          <template v-if="!individualData.event_month && !individualData.event_year">
            <span class="missing-text">{{ missingPlaceholdlerText }}</span>
          </template>
        </div>
      </div>

    </div>

    <div class="parents">
      <div>
        <strong>Father: </strong>
        <template v-if="individualData.father_or_spouse">
          {{ individualData.father_or_spouse }}
        </template>
        <template v-else>
          <span class="missing-text">{{ missingPlaceholdlerText }}</span>
        </template>
      </div>
      <div>
        <strong>Mother: </strong>
        <template v-if="individualData.mother_or_spouse">
          {{ individualData.mother_or_spouse }}
        </template>
        <template v-else>
          <span class="missing-text">{{ missingPlaceholdlerText }}</span>
        </template>
      </div>
    </div>

		<div class="details">
			<div @click="toggleDetails(index, individual.id)" class="details-button" @mouseenter="showExpandTooltip(moreDetails[index] ? 'Collapse': 'Expand')" @mouseleave="hideExpandTooltip">
				<div v-if="moreDetails[index]">
					<font-awesome-icon :icon="['fa', 'square-caret-up']" class="details-icon up-caret-offset" />
				</div>
				<div v-else>
					<font-awesome-icon :icon="['fa', 'square-caret-down']" class="details-icon down-caret-offset"/>
				</div>
        <div v-if="showExpand" class="tooltip-expand" style="user-select: none;">{{ expandTooltipText }}</div>
			</div>
		</div>
	
  </div>
</template>

<style scoped lang="scss">
@import "../../../scss/variables";

.missing-text {
  color: lightgray;
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
	width: 400px;
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
	width: 400px;

  @media (max-width: 1411px) {
    width: 200px;
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
	width: 400px;
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
