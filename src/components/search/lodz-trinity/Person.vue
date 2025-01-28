<script setup lang="ts">
import { ref } from 'vue';
import { removeNullAndEmptyArrays, truncateText } from '../../../utilities/parsing';

const missingPlaceholdlerText = 'No Data';
const truncateChars = 65;

const showFullBirthInfo = ref(false);
const showFullDeathInfo = ref(false);
const showFullFatherInfo = ref(false);
const showFullMotherInfo = ref(false);

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

const showTip = ref(false);
const tooltipText = ref('');

const showTooltip = (text: string) => {
  tooltipText.value = text;
  showTip.value = true;
};

const hideTooltip = () => {
  showTip.value = false;
};

const individualData = ref(removeNullAndEmptyArrays(props.individual));

const father_id = ref('');
const mother_id = ref('');

if (individualData.value.parents) {
  for (let parent of individualData.value.parents) {
    if (parent.sex == 'M') {
      individualData.value.father = parent.givenname + ' ' + parent.surname
      father_id.value = parent.id
    } else {
      individualData.value.mother = parent.givenname + ' ' + parent.surname
      mother_id.value = parent.id
    }
  }
}

</script>

<template>
  <div class="person-card">
    <div class="name">
      <div class="name-container">
        <div>
          <img v-if="individualData.sex === 'M'" src="../../../../public/icons/Male.svg" alt="Male Icon" class="sex-icon" @mouseenter="showTooltip('Male')" @mouseleave="hideTooltip"/>
          <img v-else-if="individualData.sex === 'F'" src="../../../../public/icons/Female.svg" alt="Female Icon" class="sex-icon" @mouseenter="showTooltip('Female')" @mouseleave="hideTooltip"/>
          <img v-else src="../../../../public/icons/Unknown.svg" alt="Unknown Icon" class="sex-icon" @mouseenter="showTooltip('Unknown')" @mouseleave="hideTooltip"/>
          <div v-if="showTip" class="tooltip">{{ tooltipText }}</div>
        </div>
        <template v-if="individualData.givenname">
          {{ individualData.givenname + ' ' }}
        </template>
        <template v-if="individualData.surname">
          {{ individualData.surname }}
        </template>
      </div>
    </div>
    
    <div class="info">

      <div @mouseover="showFullBirthInfo = true" @mouseleave="showFullBirthInfo = false">
        <!-- Full Details -->
        <template v-if="moreDetails[index]">
          <strong>Birth: </strong>
          <template v-if="individualData.birthdt">
            {{ individualData.birthdt + ' ' }}
          </template>
          <template v-if="individualData.birthpl">
            {{ individualData.birthpl }}
          </template>
          <template v-if="!individualData.birthdt && !individualData.birthpl">
            <span class="missing-text">{{ missingPlaceholdlerText }}</span>
          </template>
        </template>
        <!-- Truncated -->
        <template v-else>
          <strong>Birth: </strong>
          <template v-if="individualData.birthdt && individualData.birthpl">
            {{ truncateText(individualData.birthdt + ' ' + individualData.birthpl, truncateChars, '...') }}
          </template>
          <template v-else-if="individualData.birthdt && !individualData.birthpl">
            {{ truncateText(individualData.birthdt, truncateChars, '...') }}
          </template>
          <template v-else-if="!individualData.birthdt && individualData.birthpl">
            {{ truncateText(individualData.birthpl, truncateChars, '...') }}
          </template>
          <template v-else-if="!individualData.birthdt && !individualData.birthpl">
            <span class="missing-text">{{ missingPlaceholdlerText }}</span>
          </template>
          <!-- Tooltips -->
          <div v-if="showFullBirthInfo && (individualData.birthdt || individualData.birthpl)" class="tooltip">
            <strong>Birth: </strong>
            <template v-if="individualData.birthdt">
              {{ individualData.birthdt + ' ' }}
            </template>
            <template v-if="individualData.birthpl">
              {{ individualData.birthpl }}
            </template>
            <template v-if="!individualData.birthdt && !individualData.birthpl">
              <span class="missing-text">{{ missingPlaceholdlerText }}</span>
            </template>
          </div>
        </template>
      </div>

      <div @mouseover="showFullDeathInfo = true" @mouseleave="showFullDeathInfo = false">
        <!-- Full Details -->
        <template v-if="moreDetails[index]">
          <strong>Death: </strong>
          <template v-if="individualData.deathdt">
              {{ individualData.deathdt + ' ' }}
          </template>
          <template v-if="individualData.deathpl">
            {{ individualData.deathpl }}
          </template>
          <template v-if="!individualData.deathdt && !individualData.deathpl">
            <span class="missing-text">{{ missingPlaceholdlerText }}</span>
          </template>
        </template>
        <!-- Truncated -->
        <template v-else>
          <strong>Death: </strong>
          <template v-if="individualData.deathdt && individualData.deathpl">
            {{ truncateText(individualData.deathdt + ' ' + individualData.deathpl, truncateChars, '...') }}
          </template>
          <template v-else-if="individualData.deathdt && !individualData.deathpl">
            {{ truncateText(individualData.deathdt, truncateChars, '...') }}
          </template>
          <template v-else-if="!individualData.deathdt && individualData.deathpl">
            {{ truncateText(individualData.deathpl, truncateChars, '...') }}
          </template>
          <template v-else-if="!individualData.deathdt && !individualData.deathpl">
            <span class="missing-text">{{ missingPlaceholdlerText }}</span>
          </template>
          <!-- Tooltips -->
          <div v-if="showFullDeathInfo && (individualData.deathdt || individualData.deathpl)" class="tooltip">
            <strong>Death: </strong>
            <template v-if="individualData.deathdt">
              {{ individualData.deathdt + ' ' }}
            </template>
            <template v-if="individualData.deathpl">
              {{ individualData.deathpl }}
            </template>
            <template v-if="!individualData.deathdt && !individualData.deathpl">
              <span class="missing-text">{{ missingPlaceholdlerText }}</span>
            </template>
          </div>
        </template>
      </div>
    </div>

    <div class="parents">
      <!-- Full Details -->
      <template v-if="moreDetails[index]">
        <div>
          <strong>Father: </strong>
          <template v-if="individualData.father">
            <router-link :to="'search?id=' + father_id + '&pageNum=1&perPage=10'">{{ individualData.father }}</router-link>
          </template>
          <template v-else>
            <span class="missing-text">{{ missingPlaceholdlerText }}</span>
          </template>
        </div>
        <div>
          <strong>Mother: </strong>
          <template v-if="individualData.mother">
            <router-link :to="'search?id=' + mother_id + '&pageNum=1&perPage=10'">{{ individualData.mother }}</router-link>
          </template>
          <template v-else>
            <span class="missing-text">{{ missingPlaceholdlerText }}</span>
          </template>
        </div>
      </template>
      
      <template v-else>
        <!-- Father information -->
        <div @mouseover="showFullFatherInfo = true" @mouseleave="showFullFatherInfo = false">
          <!-- Truncated text -->
          <strong>Father: </strong>
          <template v-if="individualData.father">
            <router-link :to="'search?id=' + father_id + '&pageNum=1&perPage=10'">{{ individualData.father }}</router-link>
          </template>
          <template v-else>
            <span class="missing-text">{{ missingPlaceholdlerText }}</span>
          </template>
          <!-- Tooltip (father) -->
          <!--div v-if="showFullFatherInfo" class="tooltip">
            <strong>Father: </strong>
            <template v-if="individualData.father">
              {{ individualData.father}}
            </template>
            <template v-if="!individualData.father">
              <span class="missing-text">{{ missingPlaceholdlerText }}</span>
            </template>
          </div-->
        </div>
        <!-- Mother information -->
        <div @mouseover="showFullMotherInfo = true" @mouseleave="showFullMotherInfo = false">
          <strong>Mother: </strong>
          <template v-if="individualData.mother">
            <router-link :to="'search?id=' + mother_id + '&pageNum=1&perPage=10'">{{ individualData.mother }}</router-link>
          </template>
          <template v-else>
            <span class="missing-text">{{ missingPlaceholdlerText }}</span>
          </template>
          <!-- Tooltip (mother) -->
          <!--div v-if="showFullMotherInfo" class="tooltip">
            <strong>Mother: </strong>
            <template v-if="individualData.mother">
              {{ individualData.mother}}
            </template>
            <template v-if="!individualData.mother">
              <span class="missing-text">{{ missingPlaceholdlerText }}</span>
            </template>
          </div-->
        </div>
      </template>
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
	width: 350px;
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
	width: 500px;

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
