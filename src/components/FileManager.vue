<template>
  	<select v-model="selectedBranch" @change="handleOptionSelection(selectedBranch)">
		<option v-for="(option, index) in branches" :key="index" :value="option">
			{{ option }}
		</option>
	</select>
  <div class="grid sm:grid-cols-6 grid-cols-1 gap-4">
      <div class="col-span-4">
          <div class=" dark:text-white">
              <vue-finder id="vf" :key="componentKey" :request="request" :features="ENABLED_FEATURES" theme="light"></vue-finder>
          </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import apiClient from "../utilities/githubUtil";
// @ts-ignore
import {FEATURES} from "vuefinder/dist/features.js";
import { AccessTokenManager } from '../utilities/auth';

const accessTokenManager = AccessTokenManager.getInstance();
const token = accessTokenManager.getAccessToken();

const ENABLED_FEATURES = [
   FEATURES.NEW_FOLDER,
   FEATURES.RENAME,
   FEATURES.DELETE,
   FEATURES.UPLOAD,
   FEATURES.PREVIEW,
   FEATURES.SEARCH,
]
let branches = ref([])
const selectedBranch = ref('main')
const componentKey = ref(0);

onMounted( async () => {
  let response = await apiClient.get('/github/v1/branches')
  branches.value = response.data.map((branch: any) => branch.name)
} 
)

async function handleOptionSelection(option: string) {
		console.log(`Selected option: ${option}`)
    selectedBranch.value = option
    componentKey.value += 1;
	}

const request = computed(() => ({
    baseUrl: import.meta.env.VITE_GITHUB_FILEURL,
    headers: { Authorization: `Bearer ${token}` },
     params: { branch: selectedBranch }
  }))
</script>