<template>
    <div v-for="(entry, index) in props.searchResults.data" :key="entry.id" class="card">

      <Person
        :individual="entry"
        :moreDetails="searchResults.moreDetails"
        :toggleDetails="toggleDetails"
        :index="index"
      />
        
      <div v-if="searchResults.moreDetails[index]" class="details-container">
        <div style="margin-left: 10px; margin-bottom: 10px;">

          <LabeledItem :entry="entry" :label="'Parish'" :field="'parish'"/>
          <LabeledItem :entry="entry" :label="'Churchbook'" :field="'church_book'"/>
  
          <div>
            <strong>Register: </strong>
            <template v-if="entry.regnum">
              {{ entry.regnum }}
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
          
        </div>
  
        <div class="offset-section" style="margin-bottom: 10px;">
          <LabeledItem :entry="entry" :label="'Age'" :field="'age'"/>
          <LabeledItem :entry="entry" :label="'Place of Birth'" :field="'place_of_birth'"/>
          <LabeledItem :entry="entry" :label="'Status'" :field="'status'"/>
          <LabeledItem :entry="entry" :label="'Spouse'" :field="'spouse'"/>
        </div>
  
        <div class="offset-section">
          <LabeledItem :entry="entry" :label="'Remarks'" :field="'remarks'"/>
        </div>
  
      </div>
  
    </div>
  </template>
  
  <script setup lang="ts">
  import LabeledItem from '../LabeledItem.vue';
  import Person from './PersonDeath.vue';
  
  const props = defineProps<{
    searchResults: any;
  }>();
  
  const missingPlaceholdlerText = 'No Data';
  
  const toggleDetails = async (index: number) => {
    props.searchResults.moreDetails[index] = !props.searchResults.moreDetails[index];
  };
  </script>
  
  
  <style scoped lang="scss">
  @import "../../../scss/variables";
  
  .offset-section {
    margin-left: 60px;
    @media (max-width: 1150px) {
      margin-left: 10px;
    }
  }
  
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
  