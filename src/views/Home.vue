
<template>
	<ImageCarousel />
	<!-- <LeftSideArea :contentComponent="homeLeftContent" :buttonLabel="'HELP CENTER'"/> -->
	<editor :route="path"></editor>
</template>

<script setup lang="ts">
  	import { defineComponent } from 'vue'
  	import ImageCarousel from '../components/ImageCarousel.vue';
  	import LeftSideArea from '../components/LeftSideArea.vue';
  	import leftSideContent from '../../public/home_left_content.html?raw';
  	import editor from "../components/Editor.vue"
	let path = "./main.html"

	const homeLeftContent = defineComponent({ 
  template: leftSideContent 
});
</script>
