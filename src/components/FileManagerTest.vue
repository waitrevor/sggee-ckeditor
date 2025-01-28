<template>

  <select v-model="selectedBranch" @change="handleOptionSelection(selectedBranch)">
    <option v-for="(option, index) in branches" :key="index" :value="option">
      {{ option }}
    </option>
  </select>

  <input type="file" @change="handleFileUpload" />
  <p v-if="fileName">Selected File: {{ fileName }}</p>

  <button @click="submitFile" :disabled="!file || loading">Upload</button>

  <Finder :tree="tree" @expand="onExpand"/>

</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
// @ts-ignore
import { Finder } from "@jledentu/vue-finder";
import apiClient from "../utilities/githubUtil"

let tree = ref({})
let path = ref('')
let selectedBranch = ref('main')
let branches = ref([])
const file = ref(null);
const fileName = ref("");
let loading = ref(false)

async function handleOptionSelection(option: string) {
    selectedBranch.value = option
    loadData()
	}

function onExpand({ expandedItems }: { expandedItems: any[] }): void {
  path.value = expandedItems[expandedItems.length - 1].id
}


const handleFileUpload = (event: any) => {
  const selectedFile = event.target.files[0]
  if (selectedFile) {
    file.value = selectedFile
    fileName.value = selectedFile.name
  }
};

const submitFile = async () => {
  if (!file.value) return

  loading.value = true
  const formData = new FormData()
  formData.append('file', file.value)
  formData.append('path', path.value+'/'+fileName.value)
  formData.append('branch', selectedBranch.value)

  try {
    const response = await apiClient.post("/github/v1/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.status === 201) {
      alert("File uploaded successfully!")
      window.location.reload()
    } else {
      alert("File upload failed.")
    }
  } catch (error) {
    console.error("Error uploading file:", error)
    alert("There was an error uploading the file.")
  } finally {
    loading.value = false
  }
};

const loadData = async () => {
  let response = await apiClient.get(`/github/v1/content?branch=${selectedBranch.value}`)
  
  let files = response.data.tree.filter((item: any) => item.type === 'blob')
  
  let filePaths = files.map((item: any) => (item.path))

    interface DirectoryObject {
      id: string;
      label: string;
      children?: DirectoryObject[];
      selectable: boolean;
  }

  const result: DirectoryObject = {
      id: "root",
      label: "root",
      children: [],
      selectable: false,
  }

  for (const file of filePaths) {

      const pieces = file.split("/");

      let pointer = result;

      for (let level = 0; level < pieces.length; level++) {

          if (level == pieces.length - 1) {

              if (!pointer.children) pointer.children = [];
              let temp = {id: file, label: pieces[level], selectable: false}
              pointer.children.push(temp);

          } else {

              if (!pointer.children?.find(entry => entry.label == pieces[level])) {

                  if (!pointer.children) {

                      pointer.children = [];

                  }
                  // id will be the file path
                  let id = pieces.slice(0,level+1).join('/')
                  pointer.children.push({
                      // Each id needs to be unique
                      id: id,
                      label: pieces[level],
                      selectable: true
                  })

              }
              // @ts-ignore
              pointer = pointer.children.find(entry => entry.label  == pieces[level]);
          }
      }
  }
  tree.value = result

}

onMounted(async () => {
  let resp = await apiClient.get('/github/v1/branches')
	branches.value = resp.data.map((branch: any) => branch.name)
  loadData()
})
</script>

  
<style src="@jledentu/vue-finder/dist/vue-finder.css" />