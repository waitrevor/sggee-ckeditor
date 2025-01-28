<template>
	<div>
		<RightSideArea v-if="extractedIds.length > 0" :sections="extractedIds" />
		<editor :route="route.fullPath" />
	</div>
</template>

<script setup lang="ts">
	import { ref } from "vue"
	import { useRoute } from "vue-router"
	import RightSideArea from "../components/RightSideArea.vue"
	import editor from "../components/Editor.vue"

	const route = useRoute() // Renamed $route to route
	const extractedIds = ref<string[]>([])
</script>